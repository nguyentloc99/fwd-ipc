'use strict';

import * as path from 'path';
import {AppEnvironment} from '../../common/interfaces';

export const ENV: AppEnvironment = {
  NAME: 'production',
  APP: {
    METHOD: 'http',
    HOST: '',
    PORT: 8080,
    IP: process.env['IP'] || '0.0.0.0'
  },
  SECURE: {
    JWT: {
      JWT_SECRET: `work24h-productionjwtauthenticate-#2019`,
      /*time expire token*/
      TOKEN_EXPIRE: 24 * 60 * 60, // 1 days
    }
  },
  DATABASE: {
    MONGODB: {
      USERNAME: '',
      PASSWORD: '',
      HOST: 'localhost',
      PORT: 27017,
      NAME: 'housework-production',
    },
  },
  NOTIFICATION: {
    MAIL_CONFIG: {
      API_KEY: '',
      TIME_EXPIRE: 24 * 60 * 60 * 3, // 3 DAY
      FROM: '',
      WEB_URL: '',
      SMTP_CONFIG: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: '',
          pass: ''
        }
      }
    },
    SMS: {
      FROM: ''
    }
  },
  IMAGE_STORE: {
    HOST: 'http://api.housework.viecnha24h.com',
    ROOT: path.join(__dirname, '../../../../', 'public/buckets'),
    BUCKET: 'housework-production'
  }
};
