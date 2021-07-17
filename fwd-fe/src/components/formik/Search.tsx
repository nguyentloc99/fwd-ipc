import Search from 'components/search/Search';
import { useField } from 'formik';
import React, { ChangeEvent, FC, useCallback } from 'react';

interface Props {
  name: string;
  onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onSearchClick?: () => void;
}

const FormikSearch: FC<Props> = (props) => {
  const { name, onChangeValue, onSearchClick, ...other } = props;
  const [field] = useField({ name });
  const handleChangeValue = useCallback(
    (e) => {
      field.onChange(field.name)(e.target.value);
      onChangeValue?.(e);
    },
    [field, onChangeValue],
  );
  return (
    <Search
      value={field.value}
      buttonType={'submit'}
      {...other}
      onChangeValue={handleChangeValue}
      onSearchClick={onSearchClick}
    />
  );
};

export default FormikSearch;
