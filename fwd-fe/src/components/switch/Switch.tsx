import React, { FC } from 'react';
import cx from 'classnames';
import MuiSwitch, { SwitchProps } from '@material-ui/core/Switch';

import useStyles from './switch.styles';

export interface Props extends SwitchProps {}

const Switch: FC<Props> = ({
  className,
  style,
  size = 'medium',
  disabled = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={cx(classes.switchContainer, className)} style={style}>
      <MuiSwitch
        {...props}
        size={size}
        disabled={disabled}
        classes={{
          ...props.classes,
          root: cx(classes.root, props.classes?.root),
          switchBase: cx(classes.switchBase, props.classes?.switchBase),
          thumb: cx(classes.thumb, props.classes?.thumb),
          track: cx(classes.track, props.classes?.track),
          checked: cx(classes.checked, props.classes?.checked),
        }}
      />
    </div>
  );
};

export default Switch;
