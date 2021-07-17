/**
 * @author LocNT
 * @description custom base error
 * @link https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216
 */
import {get} from 'lodash';
import {ErrorsConst} from '../error.const';

export class BaseError extends Error {
  constructor(options?: { error?: any, code?: string, status?: number, message?: string, name?: string }) {
    // Calling parent constructor of base Error class.
    super();

    // set status
    const status = get(options, 'status') || 400;

    // Saving class name in the property of our custom error as a shortcut.
    this.name = options.name || ErrorsConst.REQUEST_ERRORS[status].name;
    this.message = get(options, 'error.message') || options.message
      || ErrorsConst.REQUEST_ERRORS[status].message;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    (this as any).code = get(options, 'code')
      || ErrorsConst.REQUEST_ERRORS[status].code;
    (this as any).inner = get(options, 'error');

    (this as any).status = status; // default 400
  }
}
