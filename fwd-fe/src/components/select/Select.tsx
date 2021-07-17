import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { get } from 'lodash';
import cx from 'classnames';
import { shallowEqual } from 'react-redux';
import BaseSelect, {
  components,
  Props as SelectProps,
  StylesConfig,
} from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import BaseVirtualizedSelect from 'react-virtualized-select';
import CreatableSelect from 'react-select/creatable';
import { StylesConfigFunction } from 'react-select/src/styles';
import CheckIcon from '@material-ui/icons/Check';
import { invariant, pxToRem } from 'helpers/common.helper';

export type Props<P = any> = SelectProps<P, boolean> & {
  selectType?: 'normal' | 'creatable' | SelectType;
  selectSize?: 'l' | 'm' | 's' | 'xl' | SelectSize;
  isError?: boolean;
  selectStyles?: {
    [T in keyof StylesConfig]:
      | CSSProperties
      | { [key: string]: CSSProperties }
      | StylesConfigFunction;
  };
  inputId: string;
  value?: string | P;
  label?: any;
  disabled?: boolean;
  required?: boolean;
} & Partial<AsyncProps<P>>;

export enum SelectType {
  NORMAL = 'normal',
  CREATABLE = 'creatable',
  ASYNC = 'async',
}

export enum SelectSize {
  Large = 'l',
  Medium = 'm',
  Small = 's',
  ExtraLarge = 'xl',
}

function sizeToPixel(size: any) {
  switch (size) {
    case SelectSize.Large:
      return 65;

    case SelectSize.Medium:
      return 55;

    case SelectSize.Small:
      return 45;

    default:
      return 55;
  }
}

const controlStyles = {
  boxShadow: 'none',
  backgroundColor: '#f5f7fa',
  paddingLeft: '10px',
};

const Select: FC<Props> = (props) => {
  const {
    disabled,
    label,
    value = '',
    isError = false,
    selectType = SelectType.NORMAL,
    selectSize = 'm',
    selectStyles = {},
    placeholder,
    options = [],
    isDisabled = disabled,
    required,
    components: customComponents,
    isSearchable = true,
    ...other
  } = props;

  useEffect(() => {
    invariant(
      !!other.inputId,
      'Please add input id to Select component for correctly server side rendering',
    );
  }, [other.inputId]);

  const selectedValue = useMemo(() => {
    return (
      Array.isArray(options) &&
      options.filter((i) => {
        return (
          value === i.value ||
          shallowEqual(value, i) ||
          (Array.isArray(value) &&
            value.find((item) => item === i.value || shallowEqual(item, i)))
        );
      })
    );
  }, [options, value]);

  const creatableValue = useMemo(() => {
    if (!value || !value?.length) return null;
    const selected =
      Array.isArray(options) && Array.isArray(value)
        ? value.map((item: string | { label: string; value: string }) => {
            return (
              options.find(
                (i) => i.value === item || shallowEqual(i, item),
              ) || {
                value: typeof item === 'string' ? item : item.value,
                label: typeof item === 'string' ? item : item.value,
              }
            );
          })
        : options.filter((i) => value === i.value || shallowEqual(value, i));

    return get(selected, 'length', 0) > 0 ? selected : { value, label: value };
  }, [options, value]);

  const customStyles: StylesConfig = useMemo(
    () => ({
      container:
        typeof selectStyles.container === 'function'
          ? selectStyles.container
          : (base: CSSProperties) => {
              return { ...base, width: '100%', ...selectStyles.container };
            },
      placeholder:
        typeof selectStyles.placeholder === 'function'
          ? selectStyles.placeholder
          : (base: CSSProperties) => {
              return {
                ...base,
                color: '#babdbf',
                fontFamily: 'Helvetica',
                fontStyle: 'normal',
                fontSize: pxToRem(16),
                fontWeight: 500,
                width: '100%',
                ...selectStyles.placeholder,
              };
            },
      singleValue:
        typeof selectStyles.singleValue === 'function'
          ? selectStyles.singleValue
          : (base: CSSProperties) => ({
              ...base,
              fontSize: pxToRem(16),
              color: '#414a59',
              ...selectStyles.singleValue,
            }),
      multiValue:
        typeof selectStyles.multiValue === 'function'
          ? selectStyles.multiValue
          : (base: CSSProperties) => ({
              ...base,
              backgroundColor: '#c6feee',
              ...selectStyles.multiValue,
            }),
      multiValueLabel:
        typeof selectStyles.multiValueLabel === 'function'
          ? selectStyles.multiValueLabel
          : (base: CSSProperties) => ({
              ...base,
              fontSize: pxToRem(16),
              color: '#414a59',
              ...selectStyles.multiValueLabel,
            }),
      multiValueRemove:
        typeof selectStyles.multiValueRemove === 'function'
          ? selectStyles.multiValueRemove
          : (base: CSSProperties) => ({
              ...base,
              color: '#babdbf',
              ':hover': {
                cursor: 'pointer',
                backgroundColor: ' #eaeae9',
              },
              ...selectStyles.multiValueRemove,
            }),
      input:
        typeof selectStyles.input === 'function'
          ? selectStyles.input
          : (base: CSSProperties) => ({
              ...base,
              fontSize: pxToRem(16),
              ...selectStyles.input,
            }),
      menu:
        typeof selectStyles.menu === 'function'
          ? selectStyles.menu
          : (base: CSSProperties) => ({
              ...base,
              boxShadow: '0px 34px 94px rgba(0, 0, 0, 0.15)',
              borderRadius: 7,
              zIndex: 9999,
              ...selectStyles.menu,
            }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      menuList:
        typeof selectStyles.menuList === 'function'
          ? selectStyles.menuList
          : (base: CSSProperties) => ({
              ...base,
              padding: 10,
              ...selectStyles.menuList,
            }),
      valueContainer:
        typeof selectStyles.valueContainer === 'function'
          ? selectStyles.valueContainer
          : (base: CSSProperties) => ({
              ...base,
              padding: 0,
              ...selectStyles.control,
            }),
      indicatorsContainer:
        typeof selectStyles.indicatorsContainer === 'function'
          ? selectStyles.indicatorsContainer
          : (base) => ({
              ...base,
              padding: '0 0 0 20px',
              ...selectStyles.indicatorsContainer,
            }),
      dropdownIndicator:
        typeof selectStyles.dropdownIndicator === 'function'
          ? selectStyles.dropdownIndicator
          : (base) => ({
              ...base,
              padding: '0 !important',
            }),
      control:
        typeof selectStyles.control === 'function'
          ? selectStyles.control
          : (base: any, { isDisabled: _disabled, isFocused: _focused }) => ({
              ...base,
              ...controlStyles,
              backgroundColor: 'transparent',
              border: (() => {
                if (label) {
                  return 'none';
                }
                if (isError) {
                  return '1px solid #de1118';
                }
                if (!label && _disabled) {
                  return '1px solid #c8cacd';
                }
                if (!label && _focused) {
                  return '1px solid #00ca92';
                }
                return '1px solid #babdbf';
              })(),
              opacity: (() => {
                if (disabled) {
                  return 0.6;
                }
                return null;
              })(),
              minHeight: label
                ? sizeToPixel(selectSize) - 25
                : sizeToPixel(selectSize),
              marginTop: -3,
              padding: '0 20px',
              borderRadius: 7,
              '&:hover': {
                border: (() => {
                  if (!label) {
                    return '1px solid #00ca92';
                  }
                  return 'none';
                })(),
              },
              ...selectStyles.control,
            }),
      option:
        typeof selectStyles.option === 'function'
          ? selectStyles.option
          : (base: any, { data, isDisabled: _disabled, isFocused }) => ({
              ...base,
              display: data.isHidden ? 'none' : base.display,
              borderRadius: 7,
              padding: 15,
              color: (() => {
                if (_disabled) {
                  return '#babdbf';
                }
                if (isFocused) {
                  return '#fff';
                }
                return '#414a59';
              })(),
              fontSize: pxToRem(16),
              backgroundColor: (() => {
                if (_disabled) {
                  return '#babdbf';
                }
                if (isFocused) {
                  return '#414a59';
                }
                return '#fff';
              })(),
              ':active': {
                ...base[':active'],
                color: '#414a59',
                backgroundColor: '#fff',
              },
              ':hover': {
                ...base[':hover'],
                color: '#fff',
                backgroundColor: '#414a59',
              },
              ...selectStyles.option,
            }),
    }),
    [
      selectStyles.container,
      selectStyles.placeholder,
      selectStyles.singleValue,
      selectStyles.multiValue,
      selectStyles.multiValueLabel,
      selectStyles.multiValueRemove,
      selectStyles.input,
      selectStyles.menu,
      selectStyles.menuList,
      selectStyles.valueContainer,
      selectStyles.indicatorsContainer,
      selectStyles.dropdownIndicator,
      selectStyles.control,
      selectStyles.option,
      label,
      selectSize,
      isError,
      disabled,
    ],
  );

  const renderInput = useCallback(
    (innerProps) => {
      return (
        <components.Input
          {...innerProps}
          autoComplete={'none'}
          name={props.name}
        />
      );
    },
    [props.name],
  );

  const renderControl = useCallback(
    (innerProps) => {
      return (
        <div
          className={cx('controlContainer', {
            focused: innerProps.isFocused,
            hasLabel: label,
            hasLabelError: label && isError,
            hasLabelDisabled: label && (isDisabled || disabled),
          })}
        >
          {label && (
            <div className={'label'}>
              {label}
              {required && <span className={'asteriskRequired'}>*</span>}
            </div>
          )}
          <components.Control {...innerProps} />
        </div>
      );
    },
    [label, isError, isDisabled, disabled, required],
  );

  const renderOption = useCallback(
    (innerProps) => {
      return (
        <components.Option {...innerProps}>
          <div className={'optionContainer'}>
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label style={{ margin: 0 }}>{innerProps.label}</label>
            {innerProps.isSelected && props.isMulti ? (
              <CheckIcon className={'selectChecked'} />
            ) : (
              <div />
            )}
          </div>
        </components.Option>
      );
    },
    [props.isMulti],
  );
  switch (selectType) {
    case SelectType.NORMAL:
      return (
        <BaseSelect
          menuPortalTarget={document.body}
          {...other}
          className={cx(props.className)}
          options={options}
          components={{
            Input: renderInput,
            Control: renderControl,
            Option: renderOption,
            IndicatorSeparator: () => null,
            ...(customComponents || {}),
          }}
          isDisabled={isDisabled || disabled}
          classNamePrefix="select"
          isSearchable={isSearchable}
          styles={customStyles}
          placeholder={placeholder || ''}
          value={selectedValue}
        />
      );

    case SelectType.CREATABLE:
      return (
        <CreatableSelect
          menuPortalTarget={document.body}
          {...other}
          className={cx(props.className)}
          name={props.name}
          options={options}
          components={{
            Input: renderInput,
            Control: renderControl,
            Option: renderOption,
            IndicatorSeparator: () => null,
            ...(customComponents || {}),
          }}
          isSearchable={isSearchable}
          isDisabled={isDisabled || disabled}
          classNamePrefix="select"
          styles={customStyles}
          placeholder={placeholder || ''}
          value={creatableValue}
        />
      );

    case SelectType.ASYNC:
      return (
        <AsyncSelect
          className={cx(props.className)}
          menuPortalTarget={document.body}
          {...other}
          name={props.name}
          components={{
            Input: renderInput,
            Control: renderControl,
            Option: renderOption,
            IndicatorSeparator: () => null,
            ...(customComponents || {}),
          }}
          isSearchable={isSearchable}
          isDisabled={isDisabled || disabled}
          classNamePrefix="select"
          styles={customStyles}
          placeholder={placeholder || ''}
          cacheOptions
          defaultOptions
          loadOptions={props?.loadOptions}
          value={creatableValue}
        />
      );
    default:
      return null;
  }
};

const VirtualizedSelect: FC<Props> = (props) => {
  return (
    <BaseVirtualizedSelect selectComponent={() => <Select {...props} />} />
  );
};

export default VirtualizedSelect;
