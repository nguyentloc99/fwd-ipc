export const TOKEN_KEY = '__token';

export const CURRENCY_KEY = '__currency';

export const COOKIE_OPTION = { expires: 99999, path: '/' };

export const IMAGE_EXTENSIONS =
  'image/jpeg, image/png, image/bmp, image/tiff, image/svg+xml';

// eslint-disable-next-line
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()\\\-_=+|[\{\]};:'\",<\.>\/\?\s])[A-Za-z\d`~!@#$%^&*()\\\-_=+|[\{\]};:'\",<\.>\/\?\s]{8,20}$/;

// eslint-disable-next-line
export const URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
