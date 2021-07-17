import React, { ReactElement, FC } from 'react';
import cx from 'classnames';
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import RadioButtonUncheckedRounded from '@material-ui/icons/RadioButtonUncheckedRounded';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckCircle from '@material-ui/icons/CheckCircle';

import useStyles from './checkbox.styles';

export interface Props extends CheckboxProps {
  circle?: boolean;
  label?: string | ReactElement;
  labelClassName?: string;
  isError?: boolean;
}

const Checkbox: FC<Props> = ({
  className,
  size = 'medium',
  label,
  labelClassName,
  disabled = false,
  circle = false,
  isError = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div>
      <MuiCheckbox
        icon={
          circle ? (
            <RadioButtonUncheckedRounded
              className={cx(classes.icon, {
                [classes.iconError]: isError,
              })}
            />
          ) : (
            <CheckBoxOutlineBlank
              className={cx(classes.icon, { [classes.iconError]: isError })}
            />
          )
        }
        checkedIcon={
          circle ? (
            <CheckCircle className={classes.icon} />
          ) : (
            <CheckBoxIcon className={classes.icon} />
          )
        }
        {...props}
        className={className}
        size={size}
        disabled={disabled}
        classes={{
          ...props.classes,
          root: cx(
            label ? classes.checkboxHasLabel : undefined,
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

export default Checkbox;
