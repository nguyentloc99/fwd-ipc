/**
 * @author LocNT
 * @description custom config express json web-token
 * @version 2.0
 */

import {set} from 'lodash';
import * as async from 'async';
import * as jwt from 'jsonwebtoken';
import * as unless from 'express-unless';
import {NextFunction, Request, Response} from 'express';

import {ConfigLib} from '../../config.lib';
import {Options} from './express-jwt.model';
import {Strategy} from '../../common/models';
import {UnauthorizedError} from '../../standard';
import {GrantPermission} from '../grant-permission';

export class ExpressJwt {
  public static DEFAULT_REVOKED_FUNCTION = function (_: any, __: any, cb: Function) {
    return cb(undefined, false);
  };

  static isFunction(object: any) {
    return Object.prototype.toString.call(object) === '[object Function]';
  }

  public static wrapStaticSecretInCallback(secret: string) {
    return function (_: any, __: any, cb: Function) {
      return cb(undefined, secret);
    };
  }

  public static handler(options: Options) {
    if (!options || !options.secret) throw new Error('secret should be set');

    let secretCallback: any = options.secret;

    if (!ExpressJwt.isFunction(secretCallback) && typeof secretCallback === 'string') {
      secretCallback = ExpressJwt.wrapStaticSecretInCallback(secretCallback);
    }

    let isRevokedCallback = options.isRevoked || this.DEFAULT_REVOKED_FUNCTION;

    let _requestProperty = options.userProperty || options.requestProperty || 'user';
    let _resultProperty = options.resultProperty;
    let credentialsRequired = typeof options.credentialsRequired === 'undefined' ?
      true : options.credentialsRequired;

    let middleware: any = function (req: Request, res: Response, next: NextFunction) {
      let token: any;

      if (req.method === 'OPTIONS' && req.headers
        .hasOwnProperty('access-control-request-headers')) {
        let hasAuthInAccessControl = !!~(req.headers['access-control-request-headers'] as string)
          .split(',').map(function (header: any) {
            return header.trim();
          }).indexOf('authorization');

        if (hasAuthInAccessControl) {
          return next();
        }
      }

      if (options.getToken && typeof options.getToken === 'function') {
        try {
          token = options.getToken(req);
        } catch (e) {
          return next(e);
        }
      } else if (req.headers && req.headers.authorization) {
        let parts = (req.headers.authorization as string).split(' ');
        if (parts.length == 2) {
          let scheme = parts[0];
          let credentials = parts[1];

          if (/^Bearer$/i.test(scheme)) {
            token = credentials;
          } else {
            if (credentialsRequired) {
              return next(new UnauthorizedError({
                name: 'credentials_bad_scheme',
                error: {message: 'Format is Authorization: Bearer [token]'}
              }));
            } else {
              return next();
            }
          }
        } else {
          return next(new UnauthorizedError({
            name: 'credentials_bad_format',
            error: {message: 'Format is Authorization: Bearer [token]'}
          }));
        }
      }

      if (!token) {
        if (credentialsRequired) {
          return next(new UnauthorizedError({
            name: 'credentials_required',
            error: {message: 'No authorization token was found'}
          }));
        } else {
          return next();
        }
      }

      let dtoken: any;

      try {
        dtoken = jwt.decode(token, {complete: true}) || {};
      } catch (err) {
        return next(new UnauthorizedError({
          name: 'invalid_token',
          error: err
        }));
      }

      async.waterfall([
        function getSecret(callback: Function) {
          let arity = secretCallback.length;
          if (arity == 4) {
            secretCallback(req, dtoken.header, dtoken.payload, callback);
          } else { // arity == 3
            secretCallback(req, dtoken.payload, callback);
          }
        },
        function verifyToken(secret: string, callback: Function) {
          jwt.verify(token, secret, options as any, function (err, decoded) {
            if (err) {
              callback(new UnauthorizedError({
                name: 'invalid_token',
                error: err
              }));
            } else {
              callback(undefined, decoded);
            }
          });
        },
        function checkRevoked(decoded: any, callback: Function) {
          isRevokedCallback(req, dtoken.payload, function (err: any, revoked: any) {
            if (err) {
              callback(err);
            } else if (revoked) {
              callback(new UnauthorizedError({
                name: 'revoked_token',
                error: {message: 'The token has been revoked.'}
              }));
            } else {
              callback(undefined, decoded);
            }
          });
        }

      ], function (err, result) {
        if (err) {
          return next(err);
        }
        if (_resultProperty) {
          set(res, _resultProperty, result);
        } else {
          set(req, _requestProperty, result);
        }
        next();
      });
    };

    middleware.unless = unless;
    middleware.UnauthorizedError = UnauthorizedError;

    return middleware;
  }
}
