/**
 * @module auth
 * @author LocNT
 * @description basic authenticate library
 * @version 1.0.0
 */

import * as jwt from 'jsonwebtoken';
import {pick, omitBy, isNil} from 'lodash';
import {Request, Response, NextFunction, RequestHandler} from 'express';

import {AuthConfig} from './auth.config';
import {expressJwt, GrantPermission} from './index';
import {ForbiddenError} from '../standard';

import {ConfigLib} from '../config.lib';
import {ConstLib} from '../common/consts';

export default class BasicAuthLib {
  /**
   * @method verifyToken
   * @description Check if token is valid
   * @param options
   * @return {e.RequestHandler}
   */
  public static verifyToken(options?: any): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      return expressJwt.handler(Object.assign({}, options, {
        secret: ConfigLib.SECURE.JWT.JWT_SECRET
      }))(req, res, next);
    };
  }

  /**
   * @method verifyEnvironment
   * @description verify environment access resource
   * @param {string[]} env
   * @return {e.RequestHandler}
   */
  public static verifyEnvironment(env: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      if (env.indexOf(ConfigLib.ENVIRONMENT) === -1)
        return res.bad(new ForbiddenError({error: {message: ConstLib.ENVIRONMENT_NOT_SUPPORT}}));
      return next();
    };
  }

  /**
   * @method verifyTokenBase
   * @description same as verifyToken. But function not attach response failed when token not invalid
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @return {e.RequestHandler}
   */
  public static verifyTokenBase(req: Request, res: Response, next: NextFunction): void {
    let token: string = <string>req.headers.authorization;
    jwt.verify(token ? token.substring(7) : '', ConfigLib.SECURE.JWT.JWT_SECRET,
      {algorithms: ['HS512']}, function (err, decoded) {
        if (err) return next();
        req.user = decoded as any;
        return next();
      });
  }

  /**
   * @method decodeToken
   * @description decode token and attach token to user
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   */
  public static decodeToken(req: Request, res: Response, next: NextFunction): void {
    let token: string = <string>req.headers.authorization;
    if (token) {
      req.user = jwt.decode(token.substring(7)) as any;
    }
    next();
  }

  /**
   * @method verifyRoleApply
   * @description check role user
   * @param {string | string[]} roles
   * @return {e.RequestHandler}
   */
  public static verifyRoleApply(roles: string | string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      if ('string' === typeof roles) {
        roles = (roles as string).split(' ');
      }
      // check permission in roles
      if (!roles.includes(req.user.role)
        && !(req.user.roles && req.user.roles.length > 0 && roles.find(role => req.user.roles.includes(role)))
      )
        return res.bad(new ForbiddenError());
      next();
    };
  }

  /**
   * @method verifyRolePrevent
   * @description check role user
   * @param {string | string[]} prevent_roles
   * @return {e.RequestHandler}
   */
  public static verifyRolePrevent(prevent_roles: string | string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      if (prevent_roles.indexOf(req.user.role) > -1) return res.bad(new ForbiddenError());
      next();
    };
  }

  /**
   * @method signToken
   * @description create new token
   * @param {object} user
   * @param {string[]} fields
   * @param {number} expiresIn
   * @return {string}
   */
  public static signToken(
    user: any
    , fields: string[] = [
      ...AuthConfig.JWT.FIELD,
      ...Object.values<string>(GrantPermission.ROLES)
    ]
    , expiresIn: number = ConfigLib.SECURE.JWT.TOKEN_EXPIRE) {
    user = omitBy(user, isNil);
       
    return jwt.sign(
      pick(user, fields),
      ConfigLib.SECURE.JWT.JWT_SECRET,
      {
        algorithm: 'HS512',
        expiresIn: expiresIn
      }
    );
  }
}
