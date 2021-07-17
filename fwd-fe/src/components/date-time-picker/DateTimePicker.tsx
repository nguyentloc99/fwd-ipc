import React, { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker as BaseDateTimePicker,
  DateTimePickerProps,
} from '@material-ui/pickers';

import Input from 'components/input/Input';

export interface Props extends DateTimePickerProps {
  isError?: boolean;
}

const DateTimePicker: FC<Props> = ({
  isError = false,
  variant = 'inline',
  format = 'MM/dd/yyyy HH:mm',
  ...props
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BaseDateTimePicker
        variant={variant}
        format={format}
        {...props}
        TextFieldComponent={(_props) => (
          <Input isError={isError && !props.disabled} {..._props} />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
