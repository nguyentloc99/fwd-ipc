import {BaseError} from './base.error';
import {ErrorsConst} from '../error.const';

export class GoneError extends BaseError {
  constructor(options: { code?: string, error?: any, message?: string, name?: string } = {}) {
    options.code = options.code || ErrorsConst.REQUEST_ERRORS[410].code;
    super({error: options.error, code: options.code, message: options.message, status: 410, name: options.name});
  }
}
