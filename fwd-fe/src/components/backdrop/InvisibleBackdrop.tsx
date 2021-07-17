import React from 'react';
import { findDOMNode } from 'react-dom';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

class InvisibleBackdrop extends React.PureComponent<Props> {
  componentDidMount() {
    if (!this.props.disabled) {
      window.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    if (prevProps.disabled !== this.props.disabled) {
      if (!this.props.disabled) {
        window.addEventListener('mousedown', this.handleClickOutside);
      } else {
        window.removeEventListener('mousedown', this.handleClickOutside);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    // eslint-disable-next-line react/no-find-dom-node
    const ref = findDOMNode(this);
    const { target } = e;
    if (ref && !ref.contains(target as any)) {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  };

  render() {
    const { children } = this.props;
    return children || null;
  }
}

export default InvisibleBackdrop;
