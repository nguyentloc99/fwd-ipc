import React, { ReactElement, FC, useCallback } from 'react';
import cx from 'classnames';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import useStyles from './input.styles';

interface InputProps {
  isError?: boolean;
  maskedInputProps?: MaskedInputProps;
  onlyInteger?: boolean;
  renderPrefix?: (() => ReactElement) | ReactElement;
  renderSuffix?: (() => ReactElement) | ReactElement;
}

export type Props = InputProps & TextFieldProps;

const Input: FC<Props> = ({
  children,
  isError = false,
  error,
  variant = 'filled',
  maskedInputProps,
  renderPrefix,
  renderSuffix,
  fullWidth = true,
  onlyInteger = false,
  required,
  ...props
}) => {
  const classes = useStyles();

  const handleKeyDown = useCallback(
    (e) => {
      if (
        props.type === 'number' &&
        (props.InputProps?.inputProps?.min >= 0 || props.inputProps?.min >= 0)
      ) {
        if (e.keyCode === 189 || e.keyCode === 69) {
          e.preventDefault();
        }
        props.onKeyDown?.(e);
      }
      if (
        props.type === 'number' &&
        onlyInteger &&
        (e.keyCode === 190 || e.keyCode === 188)
      ) {
        e.preventDefault();
      }
      props.onKeyDown?.(e);
    },
    [
      onlyInteger,
      props.type,
      props.InputProps,
      props.inputProps,
      props.onKeyDown,
    ],
  );

  return maskedInputProps ? (
    <MaskedInput
      {...maskedInputProps}
      onKeyDown={handleKeyDown}
      render={(_ref, _props) => (
        <TextField
          inputRef={_ref}
          variant={variant}
          fullWidth={fullWidth}
          error={error || isError}
          {..._props}
          {...props}
          select={false}
          InputProps={{
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
                style={{
                  width: 48,
                  height: 48,
                  marginTop: 0,
                  marginRight: '8px',
                }}
                position="end"
              >
                {renderSuffix}
              </InputAdornment>
            ) : undefined,
            ...props.InputProps,
            classes: {
              ...props.InputProps?.classes,
              root: cx(classes.input, props.InputProps?.classes?.root),
              focused: cx(
                classes.inputFocused,
                props.InputProps?.classes?.focused,
              ),
              input: cx(
                {
                  [classes.inputHasLabel]: !!props.label,
                  [classes.inputHasNotLabel]: !props.label,
                },
                props.InputProps?.classes?.input,
              ),
              inputAdornedStart: cx(
                classes.inputHasPrefix,
                (props.InputProps?.classes as any)?.inputAdornedStart,
              ),
              inputAdornedEnd: cx(
                classes.inputHasSuffix,
                (props.InputProps?.classes as any)?.inputAdornedEnd,
              ),
              adornedStart: cx(
                classes.inputHasPrefix,
                (props.InputProps?.classes as any)?.adornedStart,
              ),
              adornedEnd: cx(
                classes.inputHasSuffix,
                (props.InputProps?.classes as any)?.adornedEnd,
              ),
              error: cx(classes.inputError, props.InputProps?.classes?.error),
              disabled: cx(
                classes.inputDisabled,
                props.InputProps?.classes?.disabled,
              ),
            },
          }}
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
              !!props.value ||
              props?.value === 0 ||
              props.InputLabelProps?.shrink,
            classes: {
              ...props.InputLabelProps?.classes,
              root: cx(
                renderPrefix ? classes.labelInputHasPrefix : classes.labelInput,
                props.InputLabelProps?.classes?.root,
              ),
              focused: cx(
                classes.labelInputFocused,
                props.InputLabelProps?.classes?.focused,
              ),
              error: cx(
                classes.labelInputError,
                props.InputLabelProps?.classes?.error,
              ),
              disabled: cx(
                classes.labelInputDisabled,
                props.InputLabelProps?.classes?.disabled,
              ),
            },
          }}
        />
      )}
    />
  ) : (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      error={error || isError}
      {...props}
      onKeyDown={handleKeyDown}
      select={false}
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
              style={{
                width: 48,
                height: 48,
                marginTop: 0,
                marginRight: '8px',
              }}
              position="end"
            >
              {renderSuffix}
            </InputAdornment>
          ) : undefined,
          ...props.InputProps,
          classes: {
            ...props.InputProps?.classes,
            root: cx(classes.input, props.InputProps?.classes?.root),
            focused: cx(
              classes.inputFocused,
              props.InputProps?.classes?.focused,
            ),
            input: cx(
              {
                [classes.inputHasLabel]: !!props.label,
                [classes.inputHasNotLabel]: !props.label,
              },
              props.InputProps?.classes?.input,
            ),
            inputAdornedStart: cx(
              classes.inputHasPrefix,
              (props.InputProps?.classes as any)?.inputAdornedStart,
            ),
            inputAdornedEnd: cx(
              classes.inputHasSuffix,
              (props.InputProps?.classes as any)?.inputAdornedEnd,
            ),
            adornedStart: cx(
              classes.inputHasPrefix,
              (props.InputProps?.classes as any)?.adornedStart,
            ),
            adornedEnd: cx(
              classes.inputHasSuffix,
              (props.InputProps?.classes as any)?.adornedEnd,
            ),
            error: cx(classes.inputError, props.InputProps?.classes?.error),
            disabled: cx(
              classes.inputDisabled,
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
            renderPrefix ? classes.labelInputHasPrefix : classes.labelInput,
            props.InputLabelProps?.classes?.root,
          ),
          focused: cx(
            classes.labelInputFocused,
            props.InputLabelProps?.classes?.focused,
          ),
          error: cx(
            classes.labelInputError,
            props.InputLabelProps?.classes?.error,
          ),
          disabled: cx(
            classes.labelInputDisabled,
            props.InputLabelProps?.classes?.disabled,
          ),
        },
      }}
    />
  );
};

export const InputMask = {
  phone: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

export default Input;
