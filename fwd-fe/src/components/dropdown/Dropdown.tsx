import React, { FC, ReactElement, useCallback, useState } from 'react';
import InvisibleBackdrop from '../backdrop/InvisibleBackdrop';

interface RenderToggleProps {
  toggle: () => void;
  show: () => void;
  hide: () => void;
  open: boolean;
}

interface RenderMenuProps {
  open: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}

interface Props {
  renderToggle?: (props: RenderToggleProps) => ReactElement;
  children?: (props: RenderToggleProps) => ReactElement;
  renderMenu?: (props: RenderMenuProps) => ReactElement;
}

const Dropdown: FC<Props & React.HTMLAttributes<HTMLDivElement>> = (
  props: Props,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  const show = useCallback(() => {
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
  }, []);
  const {
    renderMenu,
    renderToggle: renderToggleProps,
    children,
    ...other
  } = props;
  const renderToggle = renderToggleProps || children;
  return (
    <InvisibleBackdrop disabled={!open} onClick={hide}>
      <div {...other}>
        {renderToggle && renderToggle({ toggle, show, hide, open })}
        {open && renderMenu && renderMenu({ toggle, show, hide, open })}
      </div>
    </InvisibleBackdrop>
  );
};

export default Dropdown;
