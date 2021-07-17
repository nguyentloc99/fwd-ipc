import {BaseError} from './base.error';
import {ErrorsConst} from '../error.const';

export class ForbiddenError extends BaseError {
  constructor(options: { code?: string, error?: any, message?: string, name?: string } = {}) {
    options.code = options.code || ErrorsConst.REQUEST_ERRORS[403].code;
    super({error: options.error, code: options.code, message: options.message, status: 403, name: options.name});
  }
}
