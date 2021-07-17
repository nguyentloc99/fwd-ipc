import { createReducer } from 'typesafe-actions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthenticateStoreModel } from '../../models/store/authenticate/authenticate.model';
import {
  clearForgotPasswordAction,
  initSession,
  loginAction,
  logoutAction,
  requestForgotPasswordAction,
  updateUserInfo,
  verifyForgotPassCodeAction,
} from './authenticate.action';

const initialState: AuthenticateStoreModel = {
  token: undefined,
  userInfo: undefined,
};

const authenticateReducer = createReducer<AuthenticateStoreModel>(initialState)
  .handleAction(loginAction.request, (state) => {
    return {
      ...state,
      loading: true,
    };
  })
  .handleAction(loginAction.success, (state, action) => {
    return {
      ...state,
      token: action.payload.token,
      userInfo: action.payload.userInfo,
    };
  })
  .handleAction(initSession, (state, action) => {
    return {
      ...state,
      token: action.payload.token,
    };
  })
  .handleAction(logoutAction.request, (state) => {
    return {
      ...state,
      token: undefined,
    };
  })
  .handleAction(logoutAction.success, (state) => {
    return {
      ...state,
      token: undefined,
    };
  })
  .handleAction(requestForgotPasswordAction.success, (state, { payload }) => {
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        email: payload.email,
      },
    };
  })
  .handleAction(verifyForgotPassCodeAction.success, (state, { payload }) => {
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        forgotCode: payload.forgotCode,
      },
    };
  })
  .handleAction(clearForgotPasswordAction, (state) => {
    return {
      ...state,
      forgotPassword: null,
    };
  })
  .handleAction(updateUserInfo, (state, { payload }) => {
    return {
      ...state,
      userInfo: payload,
    };
  });

const persistConfig = {
  key: 'authenticate',
  whitelist: ['token', 'userInfo'],
  storage,
};

export default persistReducer(persistConfig, authenticateReducer);
