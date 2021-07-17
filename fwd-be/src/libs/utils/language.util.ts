import {LanguageModel, LanguageType} from '../common/models';

export class LanguageUtil {
  public static show(message: LanguageModel, lang: LanguageType | string) {
    if (Object.values(LanguageType).indexOf(lang as any) === -1) {
      lang = LanguageType.EN.toString();
    }
    return message[lang as LanguageType];
  }
}
