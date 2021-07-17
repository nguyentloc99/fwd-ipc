import React, { FC, memo, InputHTMLAttributes } from 'react';
import { FieldProps } from 'formik';

import { FastField, convertValueToEventChange } from 'helpers/formik.helper';
import Switch, { Props as SwitchProps } from '../switch/Switch';

interface Props {
  name: string;
}

const FormikSwitch: FC<
  Props & InputHTMLAttributes<HTMLInputElement> & SwitchProps
> = (props) => {
  const { name, onChange, ...other } = props;

  return (
    <FastField name={name}>
      {({ field }: FieldProps) => {
        return (
          <Switch
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

export default memo(FormikSwitch);
