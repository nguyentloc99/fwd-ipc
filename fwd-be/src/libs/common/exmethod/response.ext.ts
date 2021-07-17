/**
 * @author PhucNX, LocNT
 * @description customer extension response
 * @since 2018/03/20
 */

import * as express from 'express';
import * as chalk from 'chalk';

import {Environment} from '../../';
import {ConstLib} from '../consts';

import {Utils} from '../../index';
import {ErrorsConst} from '../../standard/error';
import {ResponseError} from '../../../common/interfaces';
import {ConfigLib} from '../../config.lib';

const exp: any = <any>express;

/**
 * @method ok
 * @description customer response success
 * @param data
 */
exp.response.ok = function (data?: any) {
  const _this: express.Response = this;
  if (_this.statusCode >= 400) throw new RangeError(ConstLib.STATUS_INVALID);
  _this.json(data);
};

/**
 * @method bad
 * @description customer response failed
 * @summary file attach is delete if response is failed
 * @param code
 * @param message
 * @param errors
 * @return {Response}
 */
exp.response.bad = function (code: any, message: any, errors: any) {
  const _this: express.Response = this;
  const status = (code ? code.status : undefined) || (_this.statusCode < 400 ? 400 : _this.statusCode);
  if (status < 400) throw new RangeError(ConstLib.STATUS_INVALID);
  if ('object' === typeof code) {
    if (ErrorsConst.SERVER_ERRORS.indexOf(code.name) > -1) {
      console.error(
        chalk.default.bgRed.white('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n',
          code.stack, '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      );
      return _this.status(500).json(mapError(code, _this));
    } else if (code.code && code.code === 'LIMIT_FILE_SIZE') {
      return _this.status(413).json(mapError(code, _this));
    }
    return _this.status(status).json(mapError(code, _this));
  }
  return _this.status(status).json(mapError({status, code, message, errors}, _this));
};

exp.response.badParam = function (errors: any) {
  return this.bad({
    code: ErrorsConst.REQUEST_ERRORS[422].code,
    status: 422,
    message: Object.values<{ msg: string }>(errors)[0].msg,
    errors: errors
  });
};

/**
 * @method maoError
 * @description map error data
 * @param error
 * @param _this -req, res global
 * @return {ResponseError}
 */
function mapError(error: any, _this: any): ResponseError {
  if (!error || 'object' !== typeof error) return undefined;
  const errors: any = {
    code: error.code,
    name: error.name || error.type || ErrorsConst.REQUEST_ERRORS[error.status || '400'].name,
    message: error.message || ErrorsConst.RESPONSE_ERRORS[error.code]
      || Utils.strings.convertErrorCodeToMessage(error.code)
      || ErrorsConst.REQUEST_ERRORS[error.status || 400].message
  };
  if (ConfigLib.ENVIRONMENT !== Environment.production) {
    errors.errors = error.errors || error.inner;
  }
  return errors;
}

export default 'express/Response';
