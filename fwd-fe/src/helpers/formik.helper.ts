// eslint-disable-next-line max-classes-per-file
import React, { FC, ChangeEvent, useEffect, useRef } from 'react';
import { get } from 'lodash';
import { shallowEqual } from 'react-redux';
import {
  FastFieldProps,
  FastFieldAttributes,
  FormikContextType,
  connect,
  useFormikContext,
} from 'formik';

/** @private is the given object a Function? */
export const isFunction = (obj: any): obj is Function =>
  typeof obj === 'function';

type FastFieldInnerProps<
  Values = {},
  Props = {},
> = FastFieldAttributes<Props> & { formik: FormikContextType<Values> };

class FastFieldInner<Values = {}, Props = {}> extends React.Component<
  FastFieldInnerProps<Values, Props>,
  {}
> {
  componentDidMount() {
    // Register the Field with the parent Formik. Parent will cycle through
    // registered Field's validate fns right prior to submit
    this.props.formik.registerField(this.props.name, {
      validate: this.props.validate,
    });
  }

  shouldComponentUpdate(props: FastFieldInnerProps<Values, Props>) {
    const { name: prevName, formik: prevFormik, ...prevOther } = props;
    const { name, formik, ...other } = this.props;
    if (
      prevName !== name ||
      get(prevFormik.values, name) !== get(formik.values, name) ||
      get(prevFormik.errors, name) !== get(formik.errors, name) ||
      get(prevFormik.touched, name) !== get(formik.touched, name) ||
      !shallowEqual(prevOther, other) ||
      prevFormik.isSubmitting !== formik.isSubmitting
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps: FastFieldAttributes<Props>) {
    if (this.props.name !== prevProps.name) {
      this.props.formik.unregisterField(prevProps.name);
      this.props.formik.registerField(this.props.name, {
        validate: this.props.validate,
      });
    }

    if (this.props.validate !== prevProps.validate) {
      this.props.formik.registerField(this.props.name, {
        validate: this.props.validate,
      });
    }
  }

  componentWillUnmount() {
    this.props.formik.unregisterField(this.props.name);
  }

  render() {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validate,
      name,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      as: is,
      children,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      component,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      shouldUpdate,
      formik,
      ...other
    } = this.props as FastFieldInnerProps<Values, Props>;

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validate: _validate,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validationSchema: _validationSchema,
      ...restOfFormik
    } = formik;
    const field = formik.getFieldProps({ name, ...other });
    const meta = {
      value: get(formik.values, name),
      error: get(formik.errors, name),
      touched: !!get(formik.touched, name),
      initialValue: get(formik.initialValues, name),
      initialTouched: !!get(formik.initialTouched, name),
      initialError: get(formik.initialErrors, name),
    };

    const bag = { field, meta, form: restOfFormik };

    if (isFunction(children)) {
      return (children as (props: FastFieldProps<any>) => React.ReactNode)(bag);
    }
    return null;
  }
}

export const FastField = connect<FastFieldAttributes<any>, any>(FastFieldInner);

export const ErrorFocus: FC = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();
  const timer = useRef<NodeJS.Timeout | null>();

  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[data-error-key="${keys[0]}"]`;
      const fallbackSelector = `[name="${keys[0]}"]`;
      const errorElement: HTMLElement =
        document.querySelector(selector) ||
        document.querySelector(fallbackSelector);
      if (errorElement) {
        timer.current = setTimeout(() => {
          errorElement?.focus();
        }, 500);
      }
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [errors, isSubmitting, isValidating]);

  return null;
};

export function convertValueToEventChange(
  value: any,
  event?: ChangeEvent<any>,
): ChangeEvent<any> {
  let e = {
    target: { value },
  } as ChangeEvent<any>;
  if (event) {
    e = { ...event, target: { ...event.target, value } };
  }
  return e;
}
