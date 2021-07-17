import { CustomRouteProps } from 'models/common/custom-route-props.model';
import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const NotFound = lazy(() => import('containers/404'));

export interface CustomSwitchProps {
  routes: CustomRouteProps[];
}

const CustomSwitch: FC<CustomSwitchProps> = ({ routes }) => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map((i) => (
          <Route
            key={i.path}
            exact={i.exact}
            path={i.path}
            component={i.component}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default CustomSwitch;
