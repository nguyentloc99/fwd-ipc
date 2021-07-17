import {BaseError} from '../standard/error/http-method';

export class LogManual {
  public static addLog(err: BaseError) {
    console.log(err);
  }
}
