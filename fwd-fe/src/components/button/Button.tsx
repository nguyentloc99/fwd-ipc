import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import cx from 'classnames';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';

import useStyles from './button.styles';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Grey = 'grey',
  Outline = 'outline',
  Transparent = 'transparent',
}

interface Props extends ButtonProps {
  buttonType?:
    | ButtonType
    | 'primary'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'grey'
    | 'transparent';
  rounded?: boolean;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = ({
  children,
  ref,
  className,
  buttonType = ButtonType.Primary,
  variant = 'contained',
  rounded = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      className={cx(
        classes.button,
        {
          [classes.rounded]: rounded,
          [classes.primaryContained]:
            buttonType === ButtonType.Primary && variant === 'contained',
          [classes.secondaryContained]:
            buttonType === ButtonType.Secondary && variant === 'contained',
          [classes.infoContained]:
            buttonType === ButtonType.Info && variant === 'contained',
          [classes.warningContained]:
            buttonType === ButtonType.Warning && variant === 'contained',
          [classes.dangerContained]:
            buttonType === ButtonType.Danger && variant === 'contained',
          [classes.greyContained]:
            buttonType === ButtonType.Grey && variant === 'contained',
          [classes.primaryOutlined]:
            buttonType === ButtonType.Primary && variant === 'outlined',
          [classes.secondaryOutlined]:
            buttonType === ButtonType.Secondary && variant === 'outlined',
          [classes.infoOutlined]:
            buttonType === ButtonType.Info && variant === 'outlined',
          [classes.warningOutlined]:
            buttonType === ButtonType.Warning && variant === 'outlined',
          [classes.dangerOutlined]:
            buttonType === ButtonType.Danger && variant === 'outlined',
          [classes.greyOutlined]:
            buttonType === ButtonType.Grey && variant === 'outlined',
          [classes.primaryText]:
            buttonType === ButtonType.Primary && variant === 'text',
          [classes.secondaryText]:
            buttonType === ButtonType.Secondary && variant === 'text',
          [classes.infoText]:
            buttonType === ButtonType.Info && variant === 'text',
          [classes.warningText]:
            buttonType === ButtonType.Warning && variant === 'text',
          [classes.dangerText]:
            buttonType === ButtonType.Danger && variant === 'text',
          [classes.greyText]:
            buttonType === ButtonType.Grey && variant === 'text',
        },
        className,
      )}
      ref={ref}
      variant={variant}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default forwardRef<HTMLButtonElement, Props>(Button);
