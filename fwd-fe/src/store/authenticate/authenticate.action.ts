import {
  AuthenticateStoreModel,
  UserInfoModel,
} from 'models/store/authenticate/authenticate.model';
import { createAction, createAsyncAction } from 'typesafe-actions';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginSuccessPayload {
  token: string;
  userInfo: AuthenticateStoreModel['userInfo'];
}

export const loginAction = createAsyncAction(
  'authenticate/LOGIN',
  'authenticate/LOGIN_SUCCESS',
  'authenticate/LOGIN_FAIL',
)<LoginPayload, LoginSuccessPayload, string>();

export const logoutAction = createAsyncAction(
  'authenticate/LOG_OUT',
  'authenticate/LOG_OUT_SUCCESS',
  'authenticate/LOG_OUT_FAIL',
)<void, void, void>();

interface RequestForgotPasswordPayload {
  email: string;
  recaptcha?: string;
}

interface RequestForgotPasswordSuccessPayload {
  email: string;
}

export const requestForgotPasswordAction = createAsyncAction(
  'authenticate/FORGOT_PASSWORD',
  'authenticate/FORGOT_PASSWORD_SUCCESS',
  'authenticate/FORGOT_PASSWORD_FAIL',
)<RequestForgotPasswordPayload, RequestForgotPasswordSuccessPayload, void>();

interface VerifyForgotPassCodePayload {
  email: string;
  forgotCode: string;
}

interface VerifyForgotPassCodeSuccessPayload {
  forgotCode: string;
}

export const verifyForgotPassCodeAction = createAsyncAction(
  'authenticate/VERIFY_FORGOT_CODE',
  'authenticate/VERIFY_FORGOT_CODE_SUCCESS',
  'authenticate/VERIFY_FORGOT_CODE_FAIL',
)<VerifyForgotPassCodePayload, VerifyForgotPassCodeSuccessPayload, void>();

interface PasswordRecoveryPayload {
  email: string;
  forgotCode: string;
  password: string;
  confirmPassword: string;
}

export const passwordRecoveryAction = createAsyncAction(
  'authenticate/PASSWORD_RECOVERY',
  'authenticate/PASSWORD_RECOVERY_SUCCESS',
  'authenticate/PASSWORD_RECOVERY_FAIL',
)<PasswordRecoveryPayload, void, void>();

export const clearForgotPasswordAction = createAction(
  'authenticate/CLEAR_FORGOT_PASSWORD',
)<void>();

export const updateUserInfo = createAction(
  'authenticate/UPDATE_USER_INFO',
)<UserInfoModel>();

export const initSession = createAction('authenticate/INIT_SESSION')<{
  token: string;
}>();
