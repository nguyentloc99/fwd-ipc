import React, { ReactElement, FC } from 'react';
import cx from 'classnames';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import useStyles from './textarea.styles';

interface InputProps {
  isError?: boolean;
  renderPrefix?: (() => ReactElement) | ReactElement;
  renderSuffix?: (() => ReactElement) | ReactElement;
}

export type Props = InputProps & TextFieldProps;

const Textarea: FC<Props> = ({
  children,
  isError = false,
  error,
  variant = 'filled',
  renderPrefix,
  renderSuffix,
  fullWidth = true,
  required,
  ...props
}) => {
  const classes = useStyles();

  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      error={error || isError}
      {...props}
      InputProps={
        {
          startAdornment: renderPrefix ? (
            <InputAdornment
              style={{ width: 48, height: 48, marginTop: 0 }}
              position="end"
            >
              {renderPrefix}
            </InputAdornment>
          ) : undefined,
          endAdornment: renderSuffix ? (
            <InputAdornment
              style={{ width: 48, height: 48, marginTop: 0 }}
              position="end"
            >
              {renderSuffix}
            </InputAdornment>
          ) : undefined,
          ...props.InputProps,
          classes: {
            root: cx(classes.textarea, props.InputProps?.classes?.root),
            focused: cx(
              classes.textareaFocused,
              props.InputProps?.classes?.focused,
            ),
            multiline: cx(
              {
                [classes.textareaHasLabel]: !!props.label,
                [classes.textareaHasNotLabel]: !props.label,
              },
              props.InputProps?.classes?.multiline,
            ),
            inputAdornedEnd: cx(
              classes.textareaHasSuffix,
              (props.InputProps?.classes as any)?.inputAdornedEnd,
            ),
            adornedStart: cx(
              classes.textareaHasPrefix,
              (props.InputProps?.classes as any)?.adornedStart,
            ),
            adornedEnd: cx(
              classes.textareaHasSuffix,
              (props.InputProps?.classes as any)?.adornedEnd,
            ),
            error: cx(classes.textareaError, props.InputProps?.classes?.error),
            disabled: cx(
              classes.textareaDisabled,
              props.InputProps?.classes?.disabled,
            ),
          },
        } as any
      }
      label={
        required ? (
          <>
            {props.label} <span className={classes.asterisk}>*</span>
          </>
        ) : (
          props.label
        )
      }
      InputLabelProps={{
        ...props.InputLabelProps,
        shrink:
          !!props.value || props?.value === 0 || props.InputLabelProps?.shrink,
        classes: {
          ...props.InputLabelProps?.classes,
          root: cx(
            renderPrefix
              ? classes.labelTextareaHasPrefix
              : classes.labelTextarea,
            props.InputLabelProps?.classes?.root,
          ),
          focused: cx(
            classes.labelTextareaFocused,
            props.InputLabelProps?.classes?.focused,
          ),
          error: cx(
            classes.labelTextareaError,
            props.InputLabelProps?.classes?.error,
          ),
          disabled: cx(
            classes.labelTextareaDisabled,
            props.InputLabelProps?.classes?.disabled,
          ),
        },
      }}
      multiline={true}
    />
  );
};

export default Textarea;
