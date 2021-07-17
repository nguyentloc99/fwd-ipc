import React, { FC, memo, InputHTMLAttributes } from 'react';
import { FieldProps } from 'formik';

import { FastField, convertValueToEventChange } from 'helpers/formik.helper';
import Checkbox, { Props as CheckboxProps } from '../checkbox/Checkbox';

interface Props {
  name: string;
}

const FormikCheckbox: FC<
  Props & InputHTMLAttributes<HTMLInputElement> & CheckboxProps
> = (props) => {
  const { name, onChange, ...other } = props;

  return (
    <FastField name={name}>
      {({ field }: FieldProps) => {
        return (
          <Checkbox
            {...other}
            checked={field.value}
            onChange={(e) => {
              field.onChange(name)(
                convertValueToEventChange(e.target.checked, e),
              );
              onChange?.(e);
            }}
          />
        );
      }}
    </FastField>
  );
};

export default memo(FormikCheckbox);
