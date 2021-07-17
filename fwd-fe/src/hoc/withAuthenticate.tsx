import { MainRouteConst, AuthRouteConst } from 'constants/route.const';
import React, { ComponentClass, FC } from 'react';
// import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

interface WithAuthenticateOption {
  needAuthenticated?: boolean;
  unMatchingRedirect?: string;
}

export default function withAuthenticate(
  InnerComponent: ComponentClass<any> | FC,
  customOptions?: WithAuthenticateOption,
): FC {
  const options = {
    needAuthenticated: true,
    ...customOptions,
  };
  if (!options.unMatchingRedirect) {
    options.unMatchingRedirect = options.needAuthenticated
      ? AuthRouteConst.SIGN_IN
      : MainRouteConst.APP;
  }
  const WithAuthenticate: FC = (props: any) => {
    // const isAuthenticate = useSelector((state) => !!state.authenticate.token);
    const isAuthenticate = false;
    const { ...otherProps } = props;
    if (options.needAuthenticated !== isAuthenticate) {
      return (
        <Redirect
          to={{
            pathname: options.unMatchingRedirect,
          }}
          push={true}
        />
      );
    }
    return <InnerComponent {...otherProps} />;
  };
  return WithAuthenticate;
}
