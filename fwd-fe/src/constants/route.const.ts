export const MainRouteConst = {
  AUTH: 'auth',
  APP: '',
};

export const AuthRouteConst = {
  SIGN_IN: `${MainRouteConst.AUTH}/sign-in`,
};

export const AppRouteConst = {
  PRODUCT: `${MainRouteConst.APP}/product`,
};

export const ProductRouteConst = {
  GET_PRODUCT: `${AppRouteConst.PRODUCT}/getProduct`,
  VIEW_PRODUCT: `${AppRouteConst.PRODUCT}/viewProduct`,
};
