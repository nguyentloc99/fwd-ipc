import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import classes from './avatar.module.scss';

interface Props {
  url?: string;
  alt?: string;
  [key: string]: any;
}

const Avatar: FC<Props> = (props) => {
  const { url, alt, className, ...otherProps } = props;
  const renderAvatar = useCallback(() => {
    if (url && url.length) {
      return <img src={url} alt={''} />;
    }
    if (alt && alt.length) {
      return `${alt[0]}`.toUpperCase();
    }
    return null;
  }, [alt, url]);
  return (
    <div {...otherProps} className={cn(className, classes.container)}>
      {renderAvatar()}
    </div>
  );
};

export default Avatar;
