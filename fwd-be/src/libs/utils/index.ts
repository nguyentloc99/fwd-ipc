import {LanguageUtil} from './language.util';
import {ObjectUtil} from './object.util';
import {StringUtil} from './string.util';
import {MongooseUtil} from './mongoose.util';

export class Utils {
  static language = LanguageUtil;
  static objects = ObjectUtil;
  static strings = StringUtil;
  static mongooses = MongooseUtil;
}
