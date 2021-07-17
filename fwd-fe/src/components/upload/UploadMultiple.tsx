import React, { FC, useRef, useCallback } from 'react';
import { toUpper } from 'lodash';

import { toastError } from 'helpers/toast.helper';
import classes from './upload.module.scss';

interface Props {
  id: string;
  accept?: string;
  onChange: (file: Array<File> | null, source?: Array<string> | null) => void;
  onValidate?: (file: Array<File>) => string | undefined;
  errorMessage?: string;
}

const UploadMultiple: FC<Props> = ({
  children,
  id,
  accept,
  onChange,
  onValidate = (file: Array<File> | null) => undefined,
  errorMessage,
}) => {
  const inputFile = useRef<HTMLInputElement>();

  const handleClear = useCallback(() => {
    onChange(null, null);
    if (inputFile) {
      inputFile.current.value = null;
    }
  }, [onChange]);

  const handleChange = useCallback(
    (e) => {
      const list: FileList = e.dataTransfer
        ? e.dataTransfer.files
        : e.target.files;
      const file: Array<File> = [];
      for (let i = 0; i < list.length; i++) {
        file.push(list[i]);
      }
      if (file && file.length) {
        if (accept && !accept.includes('*')) {
          const acceptTypes = accept.split(/\s*,\s*/).map((item) => {
            const index = item.lastIndexOf('/');
            if (index > 0) {
              const acceptType = item.slice(index).replace('/', '.');
              if (acceptType === '.*') {
                return item;
              }
              return acceptType;
            }
            return item;
          });
          const testReg = new RegExp(
            `^${acceptTypes
              .map((item) => `(${item.replace('+', '\\+').replace('*', '.+')})`)
              .join('|')}$`,
            'g',
          );
          const generateFileExtension = (name: string) => {
            const index = name.lastIndexOf('.');
            if (index > 0) {
              return name.slice(index);
            }
            return '';
          };

          for (let i = 0; i < file.length; i++) {
            const fileExtension = generateFileExtension(file[i].name);
            if (
              !testReg.test(file[i].type) &&
              !acceptTypes.find((type) =>
                toUpper(type).includes(toUpper(fileExtension)),
              )
            ) {
              toastError(errorMessage || 'File type is invalid');
              if (inputFile) {
                inputFile.current.value = null;
              }
              return;
            }
          }
        }
        const errors = onValidate(file);
        if (errors) {
          toastError(errors || '');
          if (inputFile) {
            inputFile.current.value = null;
          }
          return;
        }
        if (!file[0].type?.includes('image')) {
          onChange(file);
          if (inputFile) {
            inputFile.current.value = null;
          }
        } else {
          const loadImage = (image: File) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                resolve(event.target.result);
              };
              reader.readAsDataURL(image);
            });
          };
          Promise.all(file.map((item) => loadImage(item))).then(
            (data: Array<string>) => {
              onChange(file, data);
            },
          );
          if (inputFile) {
            inputFile.current.value = null;
          }
        }
      } else {
        handleClear();
      }
    },
    [accept, errorMessage, onValidate, onChange, handleClear],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      handleChange(e);
    },
    [handleChange],
  );

  return (
    <div className={classes.container}>
      <label htmlFor={id} className={classes.label}>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={classes.childrenContainer}
        >
          {children}
        </div>
        <input
          className={classes.inputFile}
          id={id}
          ref={inputFile}
          onChange={handleChange}
          type="file"
          placeholder={'Change photos'}
          accept={accept}
          multiple={true}
        />
      </label>
    </div>
  );
};

export default UploadMultiple;
