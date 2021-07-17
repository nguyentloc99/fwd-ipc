import { AppRouteConst } from 'constants/route.const';
import ProductPage from 'containers/app/product/ProductPage';
import { CustomRouteProps } from 'models/common/custom-route-props.model';

const routes: CustomRouteProps[] = [
  {
    path: AppRouteConst.PRODUCT,
    component: ProductPage,
  },
];

export default routes;
