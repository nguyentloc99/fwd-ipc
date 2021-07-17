import React, { FC, memo } from 'react';
import { Option } from 'react-select/src/filters';
import { FieldProps, FieldValidator } from 'formik';

import { FastField } from 'helpers/formik.helper';
import Select, { Props as SelectProps } from '../select/Select';

interface Props {
  name: string;
  validate?: FieldValidator;
  onChangeValue?: (option: Option) => void;
}

const FormikSelect: FC<Props & SelectProps> = (props) => {
  const { name, validate, options, onChangeValue, ...other } = props;

  return (
    <FastField name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        const isError = !!meta.error && !!meta.touched;
        return (
          <>
            <Select
              {...other}
              {...field}
              options={options}
              onChange={(option: Option) => {
                field.onChange(name)(option.value);
                onChangeValue?.(option);
              }}
              onBlur={(e) => {
                field.onBlur(name)(e);
              }}
              isError={isError || other.isError}
            />
            {isError && <p className={'error-text'}>{meta.error}</p>}
          </>
        );
      }}
    </FastField>
  );
};

export default memo(FormikSelect);
