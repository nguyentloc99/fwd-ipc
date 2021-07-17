import React, { FC } from 'react';
import classNames from 'classnames';

import { useMatchMedia } from '../../hooks/useMediaQuery';
import classes from './hidden.module.scss';

type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface CssImplement {
  to?: BreakPoints;
  from?: BreakPoints;
  implement?: 'css';
}

interface JsImplement {
  to?: BreakPoints;
  from?: BreakPoints;
  implement?: 'js';
  initialHidden?: boolean;
}

type Props = CssImplement | JsImplement;

let warnAboutTextNodeCssImplement = false;
const mapBreakpointToQuery = {
  maxXs: 'max-width: 575.98px',
  maxSm: 'max-width: 767.98px',
  maxMd: 'max-width: 991.98px',
  maxLg: 'max-width: 1199.98px',
  maxXl: 'max-width: 1400px',
  minXs: 'min-width: 0',
  minSm: 'min-width: 576px',
  minMd: 'min-width: 768px',
  minLg: 'min-width: 992px',
  minXl: 'min-width: 1200px',
};

const JSHidden: FC<Omit<JsImplement, 'implement'>> = ({
  from,
  to,
  initialHidden,
  children,
}) => {
  const getMinQuery = () => {
    switch (to) {
      case 'lg': {
        return mapBreakpointToQuery.maxLg;
      }
      case 'md': {
        return mapBreakpointToQuery.maxMd;
      }
      case 'sm': {
        return mapBreakpointToQuery.maxSm;
      }
      case 'xl': {
        return mapBreakpointToQuery.maxXl;
      }
      default: {
        return mapBreakpointToQuery.maxXs;
      }
    }
  };
  const getMaxQuery = () => {
    switch (from) {
      case 'lg': {
        return mapBreakpointToQuery.minLg;
      }
      case 'md': {
        return mapBreakpointToQuery.minMd;
      }
      case 'sm': {
        return mapBreakpointToQuery.minSm;
      }
      case 'xl': {
        return mapBreakpointToQuery.minXl;
      }
      default: {
        return mapBreakpointToQuery.minSm;
      }
    }
  };
  const getQuery = () => {
    if (to && from) {
      return `(${getMinQuery()}) and (${getMaxQuery()})`;
    }
    return `(${to ? getMinQuery() : getMaxQuery()})`;
  };
  const match = useMatchMedia(getQuery(), initialHidden);
  if (match) {
    return null;
  }
  return <>{children}</>;
};
const CssHidden: FC<Omit<CssImplement, 'implement'>> = (props) => {
  if (
    typeof props.children === 'string' ||
    typeof props.children === 'number' ||
    typeof props.children === 'boolean'
  ) {
    if (!warnAboutTextNodeCssImplement) {
      warnAboutTextNodeCssImplement = true;
      // eslint-disable-next-line no-console
      console.warn(
        'Text node on css implement is not available, it will fallback to js implement',
      );
    }
    return <JSHidden {...props} />;
  }
  const getMinClassName = () => {
    switch (props.from) {
      case 'lg': {
        return 'minLg';
      }
      case 'md': {
        return 'minMd';
      }
      case 'sm': {
        return 'minSm';
      }
      case 'xl': {
        return 'minXl';
      }
      default: {
        return 'minXs';
      }
    }
  };
  const getMaxClassName = () => {
    switch (props.to) {
      case 'lg': {
        return 'maxLg';
      }
      case 'md': {
        return 'maxMd';
      }
      case 'sm': {
        return 'maxSm';
      }
      case 'xl': {
        return 'maxXl';
      }
      default: {
        return 'maxXs';
      }
    }
  };
  const getClassName = () => {
    if (props.to && props.from) {
      return classNames(classes[getMinClassName()], classes[getMaxClassName()]);
    }
    return classNames(
      classes[props.from ? getMinClassName() : getMaxClassName()],
      classes.only,
    );
  };
  if (React.isValidElement(props.children)) {
    return React.cloneElement(props.children, {
      className: classNames(props.children.props.className, getClassName()),
    });
  }
  return null;
};

const BreakPointOrder: BreakPoints[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const Hidden: FC<Props> = (props) => {
  if (
    props.from &&
    props.to &&
    BreakPointOrder.indexOf(props.to) <= BreakPointOrder.indexOf(props.from)
  ) {
    throw new Error(
      `Invalid break point, break point 'from':${props.to} is less than or equal 'to':${props.from} which is not valid`,
    );
  }
  if (props.implement === 'js') {
    return (
      <JSHidden
        to={props.to}
        from={props.from}
        initialHidden={props.initialHidden}
      >
        {props.children}
      </JSHidden>
    );
  }
  return (
    <CssHidden from={props.from} to={props.to}>
      {props.children}
    </CssHidden>
  );
};

export default Hidden;
