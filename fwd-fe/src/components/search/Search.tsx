import React, { ChangeEvent, FC } from 'react';
import cn from 'classnames';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import CommonImage from 'assets/images/common/ImageCommon';
import classes from './search.module.scss';

interface Props {
  onSearchClick?: () => void;
  className?: string;
  placeholder?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  value?: string;
  onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<Props> = (props) => {
  const {
    className,
    placeholder = '',
    onChangeValue,
    buttonType = 'button',
    value,
    onSearchClick,
    ...other
  } = props;
  return (
    <div className={cn(className, classes.container)} {...other}>
      <Input
        value={value}
        onChange={onChangeValue}
        placeholder={placeholder}
        className={classes.searchInput}
        InputProps={{
          classes: {
            root: classes.input,
          },
        }}
      />
      <Button type={buttonType} buttonType="primary" onClick={onSearchClick}>
        <img src={CommonImage.icSearchWhite} alt="search" />
      </Button>
    </div>
  );
};

export default Search;
