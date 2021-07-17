import * as moment from 'moment';

import {Utils} from '../utils';

const IdValid = require('mongoose').Types.ObjectId.isValid;

export class ExpressValidator {
  public static customExpressValidation() {
    return {
      isArray: (value: any) => {
        return Array.isArray(value);
      },
      isArrayObjectId: (value?: any) => {
        return Array.isArray(value) && value.filter(item => !IdValid(item)).length === 0;
      },
      isUniqueArrayObjectId: (value?: any) => {
        return Array.isArray(value)
          && value.filter(item => !IdValid(item)).length === 0
          && new Set(value.map(item => item)).size === value.length;
      },
      isArrayMinimum: (value: any, num?: number) => {
        return Array.isArray(value) && value.length >= num;
      },
      isString: (value: any) => {
        return 'string' === typeof value;
      },
      gte: (param: number, num: number) => {
        return param >= num;
      },
      isDateOfBirth: (value: string) => {
        return moment(value, 'YYYY/MM/DD').isValid();
      },
      isSSN: (value: string) => {
        return Utils.strings.validationSSN(value);
      }
    };
  }

}
