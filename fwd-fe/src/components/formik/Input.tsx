import React, { FC, memo } from 'react';
import { FieldProps, FieldValidator } from 'formik';

import { FastField } from 'helpers/formik.helper';
import Input, { Props as InputProps } from '../input/Input';

interface Props {
  name: string;
  validate?: FieldValidator;
}

const FormikInput: FC<Props & InputProps> = (props) => {
  const { name, validate, onChange, ...other } = props;

  return (
    <FastField name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        const isError = !!meta.error && !!meta.touched;
        return (
          <>
            <Input
              type="text"
              {...other}
              {...field}
              onChange={(e) => {
                field.onChange(name)(e);
                onChange?.(e);
              }}
              onBlur={(e) => {
                field.onBlur(name)(e);
              }}
              isError={isError || other.isError}
            />
            {(other.isError === undefined ? isError : other.isError) && (
              <p className={'error-text'}>{meta.error}</p>
            )}
          </>
        );
      }}
    </FastField>
  );
};

export default memo(FormikInput);
