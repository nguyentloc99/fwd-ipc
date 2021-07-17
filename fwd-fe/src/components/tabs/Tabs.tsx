import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import Card from 'components/card/Card';
import classes from './tabs.module.scss';

export interface TabOption {
  title: string;
  className?: string;
  value: string;
}

interface Props {
  options: TabOption[];
  className?: string;
  onTabChange?: (value: string) => void;
  defaultTab?: string;
  selected: string;
}

const Tabs: FC<Props> = (props) => {
  const {
    options,
    children,
    className,
    onTabChange,
    selected,
    ...other
  } = props;
  const handleTabClick = useCallback(
    (value) => {
      if (value) {
        onTabChange?.(value);
      }
    },
    [onTabChange],
  );
  return (
    <div className={cn(classes.container, className)} {...other}>
      <div className={classes.tabHeader}>
        {options.map((option) => (
          <button
            key={option.value}
            type={'button'}
            className={cn(
              classes.tabItem,
              'reset-button',
              {
                [classes.selected]: option.value === selected,
              },
              option.className,
            )}
            onClick={() => handleTabClick(option.value)}
          >
            {option.title}
          </button>
        ))}
      </div>
      <Card className={classes.tabMainContent}>{children}</Card>
    </div>
  );
};

export default Tabs;
