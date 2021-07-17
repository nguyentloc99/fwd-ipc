import React, { FC, useRef, useCallback } from 'react';
import { toUpper } from 'lodash';

import { toastError } from 'helpers/toast.helper';
import classes from './upload.module.scss';

interface Props {
  id: string;
  accept?: string;
  onChange: (file: File | null, source?: string) => void;
  onValidate?: (file: File | null) => string | undefined;
  errorMessage?: string;
}

const Upload: FC<Props> = ({
  children,
  id,
  accept,
  onChange,
  onValidate = (file: File | Array<File>) => undefined,
  errorMessage,
}) => {
  const inputFile = useRef<HTMLInputElement>();
  const handleClear = useCallback(() => {
    onChange(null, '');
    if (inputFile) {
      inputFile.current.value = null;
    }
  }, [onChange]);

  const handleChange = useCallback(
    (e) => {
      const file: File = e.dataTransfer
        ? e.dataTransfer.files[0]
        : e.target.files[0];
      if (file) {
        if (accept && accept !== '*') {
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
            '',
          );
          const fileExtension = ((name: string) => {
            const index = name.lastIndexOf('.');
            if (index > 0) {
              return name.slice(index);
            }
            return '';
          })(file.name);
          if (
            !testReg.test(file.type) &&
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
        const errors = onValidate(file);
        if (errors) {
          toastError(errors || '');
          if (inputFile) {
            inputFile.current.value = null;
          }
          return;
        }
        if (!file.type?.includes('image')) {
          onChange(file);
          if (inputFile) {
            inputFile.current.value = null;
          }
        } else {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            onChange(file, event.target.result);
          };
          reader.readAsDataURL(file);
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
          placeholder={'Change photo'}
          accept={accept}
        />
      </label>
    </div>
  );
};

export default Upload;
