import React, { FC, HtmlHTMLAttributes } from 'react';
import cx from 'classnames';

const Card: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={cx('btb-card', className)} {...props} />;
};

export default Card;
