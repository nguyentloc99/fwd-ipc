import {Environment} from './common.model';
import APP_CONFIG from '../../../configs/app.config';
import * as session from '../../another/types/express-session-multiple';

export interface ConfigLibModel {
  ENVIRONMENT: string;

  // [SECURE-CONFIG] Security configuration ========================================================
  SECURE?: {
    JWT: {
      TOKEN_EXPIRE: number;
      JWT_SECRET: string;
      FIELD: string[]
    };
  };
  SOCIAL?: {
    FACEBOOK?: {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
    };
    GOOGLE?: {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      GOOGLE_GEO_KEY: string;
    };
  };
  // config common ===================================================================================
  PAGE_SIZE: number;
}
