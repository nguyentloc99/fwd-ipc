import React, { FC, memo, InputHTMLAttributes } from 'react';
import { FieldProps } from 'formik';

import { FastField } from 'helpers/formik.helper';
import Radio, { Props as RadioCheckbox } from '../radio/Radio';

interface Props {
  name: string;
}

const FormikRadio: FC<
  Props & InputHTMLAttributes<HTMLInputElement> & RadioCheckbox
> = (props) => {
  const { name, value, onChange, ...other } = props;

  return (
    <FastField name={name}>
      {({ field }: FieldProps) => {
        return (
          <Radio
            {...other}
            value={value}
            checked={field.value === value}
            onChange={(e) => {
              field.onChange(name)(e);
              onChange?.(e);
            }}
          />
        );
      }}
    </FastField>
  );
};

export default memo(FormikRadio);
