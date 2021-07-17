import React, { ReactElement, FC } from 'react';
import cx from 'classnames';
import MuiRadio, { RadioProps } from '@material-ui/core/Radio';
import RadioButtonUncheckedRounded from '@material-ui/icons/RadioButtonUncheckedRounded';
import RadioButtonCheckedRounded from '@material-ui/icons/RadioButtonCheckedRounded';

import useStyles from './radio.styles';

export interface Props extends RadioProps {
  label?: string | ReactElement;
  labelClassName?: string;
}
const Radio: FC<Props> = ({
  className,
  size = 'medium',
  label,
  labelClassName,
  disabled = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div>
      <MuiRadio
        icon={<RadioButtonUncheckedRounded className={classes.icon} />}
        checkedIcon={<RadioButtonCheckedRounded className={classes.icon} />}
        {...props}
        className={className}
        size={size}
        disabled={disabled}
        classes={{
          ...props.classes,
          root: cx(
            label ? classes.radioHasLabel : undefined,
            props.classes?.root,
          ),
          checked: cx(classes.checked, props.classes?.checked),
        }}
      />
      <span
        className={cx(
          classes.label,
          { [classes.disabledLabel]: disabled },
          labelClassName,
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default Radio;
