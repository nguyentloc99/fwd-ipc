import { ProductRouteConst } from 'constants/route.const';
import { CustomRouteProps } from 'models/common/custom-route-props.model';
import React, { FC } from 'react';
import CustomSwitch from 'routes/custom-switch/CustomSwitch';
import GetProductPage from './get-product/GetProductPage';

const routes: CustomRouteProps[] = [
  {
    path: ProductRouteConst.GET_PRODUCT,
    component: GetProductPage,
  },
];

const ProductPage: FC = () => {
  return <CustomSwitch routes={routes} />;
};

export default ProductPage;
