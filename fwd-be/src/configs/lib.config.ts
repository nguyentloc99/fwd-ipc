import APP_CONFIG from './app.config';

import {AppConst} from '../common/consts/app.const';
import {ConfigLibModel} from '../libs/common';

export const SetupConfigLib: ConfigLibModel = {
  ENVIRONMENT: APP_CONFIG.ENV.NAME,

  SECURE: {
    JWT: {
      TOKEN_EXPIRE: APP_CONFIG.ENV.SECURE.JWT.TOKEN_EXPIRE,
      JWT_SECRET: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
      FIELD: ['_id', 'role', 'email', 'display_name']
    }
  },

  // config common ===================================================================================
  PAGE_SIZE: AppConst.PAGE_SIZE,
};
