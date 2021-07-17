import React, { FC, HtmlHTMLAttributes } from 'react';
import classNames from 'classnames';

const Container: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...other
}) => {
  return (
    <div className={classNames('container-fluid', className)} {...other} />
  );
};

export default Container;
