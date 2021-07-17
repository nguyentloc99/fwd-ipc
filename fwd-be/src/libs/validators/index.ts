import {DateValidator} from './date.validator';
import {ExpressValidator} from './express.validator';

export class Validators {
  public static dates = DateValidator;
  public static express = ExpressValidator;
}
