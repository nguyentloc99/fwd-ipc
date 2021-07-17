export interface AuthenticateStoreModel {
  token?: string;
  userInfo?: UserInfoModel;
  forgotPassword?: {
    email?: string;
    forgotCode?: string;
  };
}

export interface UserInfoModel {
  id: string;
  firstName: string;
  lastName: string;
}
