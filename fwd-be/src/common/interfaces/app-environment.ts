/**
 * @author LocNT
 * @interface AppEnvironment
 * @since 2018/03/21
 */

export interface AppEnvironment {
  NAME: string;
  APP: {
    METHOD: string;
    HOST: string;
    PORT: number;
    IP: string;
  };
  SECURE: {
    JWT: {
      JWT_SECRET: string;
      TOKEN_EXPIRE: number;
    };
  };
  DATABASE: {
    MONGODB: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number;
      NAME: string;
    }
  };
  NOTIFICATION: {
    MAIL_CONFIG: {
      API_KEY: string;
      TIME_EXPIRE: number;
      FROM: string;
      WEB_URL: string;
      SMTP_CONFIG: {
        host: string;
        port: number;
        secure: boolean;
        auth?: any;
      };
    },
    SMS: {
      FROM: '';
    }
  };
  IMAGE_STORE: {
    HOST: string;
    ROOT: string;
    BUCKET: string;
  };
}
