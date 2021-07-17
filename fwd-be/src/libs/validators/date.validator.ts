// import {duration} from 'moment';

export class DateValidator {
  public static isValidDate(d: any) {
    const date = new Date(d);
    return date instanceof Date && !isNaN(date.getTime());
  }
}
