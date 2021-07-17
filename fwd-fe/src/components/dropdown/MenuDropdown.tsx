import React, { FC, useCallback, MouseEvent, KeyboardEvent } from 'react';
import cx from 'classnames';

const MenuContext = React.createContext<{ onClose: () => void }>({
  onClose: () => null,
});

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  shadow?: boolean;
}

const MenuDropdown: FC<MenuProps> & { Item: typeof MenuDropDownItem } = (
  props,
) => {
  const { children, className, onClose, shadow, ...other } = props;
  return (
    <MenuContext.Provider value={{ onClose }}>
      <div
        className={cx('menuWrapper', className, { shadowMenu: shadow })}
        {...other}
      >
        <ul className={'menu'}>{children}</ul>
      </div>
    </MenuContext.Provider>
  );
};
const MenuDropDownItem: FC<React.HTMLAttributes<HTMLLIElement> & any> = (
  props,
) => {
  const { children, className, onClick, component: C = 'li', ...other } = props;
  const onKeyPress = useCallback(
    (e: React.KeyboardEvent, onClose?: () => void) => {
      switch (e.key) {
        case 'esc': {
          onClick && onClick(null);
          onClose && onClose();
          break;
        }
        default:
          break;
      }
    },
    [onClick],
  );
  return (
    <MenuContext.Consumer>
      {({ onClose }) => (
        <C
          className={cx('menuItem', className)}
          onClick={(e: MouseEvent<any>) => {
            onClick && onClick(e);
            onClose();
          }}
          role="menuitem"
          onKeyPress={(e: KeyboardEvent<any>) => onKeyPress(e, onClose)}
          {...other}
        >
          {children}
        </C>
      )}
    </MenuContext.Consumer>
  );
};

MenuDropdown.Item = MenuDropDownItem;

export default MenuDropdown;
