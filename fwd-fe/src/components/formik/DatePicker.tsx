import React, { FC, memo } from 'react';
import { FieldProps, FieldValidator } from 'formik';

import { FastField, convertValueToEventChange } from 'helpers/formik.helper';
import DatePicker, {
  Props as DatePickerProps,
} from '../date-picker/DatePicker';

interface Props {
  name: string;
  validate?: FieldValidator;
  onChangeValue?: (date: Date | null) => void;
}

const FormikDatePicker: FC<
  Props & Omit<DatePickerProps, 'onChange' | 'value'>
> = (props) => {
  const { name, validate, onChangeValue, ...other } = props;

  return (
    <FastField name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        const isError = !!meta.error && !!meta.touched;

        return (
          <>
            <DatePicker
              {...other}
              {...field}
              value={field.value}
              onChange={(date: Date | null) => {
                field.onChange(name)(convertValueToEventChange(date || null));
                onChangeValue?.(date);
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

export default memo(FormikDatePicker);
