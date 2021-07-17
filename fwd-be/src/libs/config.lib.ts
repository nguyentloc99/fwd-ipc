import {merge} from 'lodash';
import {ConfigLibModel, Environment} from './common/models';
import {SetupConfigLib} from '../configs/lib.config';

const defaultConfig: ConfigLibModel = {
  ENVIRONMENT: '',

  // [SECURE-CONFIG] Security configuration ========================================================
  SECURE: {
    JWT: {
      TOKEN_EXPIRE: 0,
      JWT_SECRET: '',
      FIELD: ['_id', 'role', 'email', 'display_name'],
    }
  },
  SOCIAL: {
    FACEBOOK: {
      CLIENT_ID: '',
      CLIENT_SECRET: '',
    },
    GOOGLE: {
      CLIENT_ID: '',
      CLIENT_SECRET: '',
      GOOGLE_GEO_KEY: ''
    }
  },
  // config common ===================================================================================
  PAGE_SIZE: 20,
};

export const ConfigLib: ConfigLibModel = merge(defaultConfig, SetupConfigLib);
