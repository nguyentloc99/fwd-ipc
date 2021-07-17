'use strict';

import * as path from 'path';
import {AppEnvironment} from '../../common/interfaces';

export const ENV: AppEnvironment = {
  NAME: 'staging',
  APP: {
    METHOD: 'http',
    HOST: '',
    PORT: 8080,
    IP: process.env['IP'] || '0.0.0.0'
  },
  SECURE: {
    JWT: {
      JWT_SECRET: `work24h-localjwtauthenticate-##2019`,
      /*time expire token*/
      TOKEN_EXPIRE: 7* 24 * 60 * 60, // 7 days
    }
  },
  DATABASE: {
    MONGODB: {
      USERNAME: 'housework-staging',
      PASSWORD: 'housework$!*@134',
      HOST: 'api.housework.vmodev.com',
      PORT: 27017,
      NAME: 'housework-staging',
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
    HOST: 'http://api.housework.vmodev.com',
    ROOT: path.join(__dirname, '../../../../', 'public/buckets'),
    BUCKET: 'housework-staging'
  }
};