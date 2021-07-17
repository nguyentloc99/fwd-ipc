import {BaseError} from './base.error';
import {ErrorsConst} from '../error.const';

export class ConflictError extends BaseError {
  constructor(options: { code?: string, error?: any, message?: string, name?: string } = {}) {
    options.code = options.code || ErrorsConst.REQUEST_ERRORS[409].code;
    super({error: options.error, code: options.code, message: options.message, status: 409, name: options.name});
  }
}
