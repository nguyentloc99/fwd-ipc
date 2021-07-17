import { MainRouteConst } from 'constants/route.const';
import AppLayout from 'layout/app/app.layout';
import { CustomRouteProps } from 'models/common/custom-route-props.model';

const routes: CustomRouteProps[] = [
  {
    path: MainRouteConst.APP,
    component: AppLayout,
  },
];

export default routes;
