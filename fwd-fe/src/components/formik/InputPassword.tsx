import React, { FC, useState } from 'react';
import images from 'assets/images/common/ImageCommon';
import FormikInput from 'components/formik/Input';
import { Props as InputProps } from 'components/input/Input';
import classes from './input-password.module.scss';

interface Props {
  name: string;
}

const FormikInputPassword: FC<Props & InputProps> = ({ name, ...props }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <FormikInput
      {...props}
      type={show ? 'text' : 'password'}
      name={name}
      renderSuffix={
        show ? (
          <button
            className={classes.resetButton}
            type="button"
            onClick={() => setShow(false)}
          >
            <img src={images.icVisibleEye} alt={''} />
          </button>
        ) : (
          <button
            className={classes.resetButton}
            type="button"
            onClick={() => setShow(true)}
          >
            <img src={images.icVisibleEyeActive} alt={''} />
          </button>
        )
      }
    />
  );
};

export default FormikInputPassword;
