import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker as BaseDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';

import Input from 'components/input/Input';
import moment from 'moment';

export interface Props extends DatePickerProps {
  isError?: boolean;
}

const DatePicker: FC<Props> = ({
  isError = false,
  variant = 'inline',
  format = 'MM/dd/yyyy',
  onChange,
  ...props
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BaseDatePicker
        variant={variant}
        format={format}
        onChange={(date) => {
          onChange?.(
            date
              ? moment(date)
                  .hour(0)
                  .second(0)
                  .minute(0)
                  .milliseconds(0)
                  .toDate()
              : date,
          );
        }}
        {...props}
        TextFieldComponent={(_props) => <Input isError={isError} {..._props} />}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
