/**
 * @module const library
 * @description define all const in library
 */

export class ConstLib {
  static readonly SYSTEM_IDENTIFY: string = 'BicycleBlueBook';
  static readonly DEFAULT: any = {
    SYSTEM_IDENTIFY: 'BicycleBlueBook',
    COUNTRY_CODE: 'us'
  };

  static readonly MISSING_CONFIG_GOOGLE_TOKEN: string = 'Missing config google token.';

  static readonly STAGE: any = {
    ACTIVED: 'actived',
    DEACTIVED: 'deactived',
    DELISTED: 'delisted'
  };

  static readonly STATUS_INVALID: string = 'Status code is not valid';

  static readonly DEVICE_MOBILE: string = 'mobile';

  static readonly BOOLEAN: any = {
    TRUE: 'true',
    FALSE: 'false'
  };

  /**
   * @field PAGE_SIZE
   * @description default page size
   */
  static readonly PAGE_SIZE: number = 20;

  /**
   * @field PAGINATE_CURSOR
   * @description default name paginate cursor field
   */
  static readonly PAGINATE_CURSOR_TEMP: string = 'paginateCursorTemp';

  /**
   * @field PAGE_CURSOR
   * @description page cursor field support
   * @link https://github.com/mixmaxhq/mongo-cursor-pagination#find
   */
  static readonly PAGE_CURSOR: string[] = [
    // 'query',
    'limit',
    'fields',
    'paginatedField',
    'sortAscending',
    'next',
    'previous'
  ];

  /**
   * @field TEMPLATES
   * @description mail template key
   * @type {string[]}
   */
  static readonly TEMPLATES: any = {
    FORGOT_PASSWORD: {
      KEY: 'forgot-password',
      SUBJECT: 'Forgot password.'
    }
  };

  static readonly TEMPLATE_KEY: string[] = Object.values(
    ConstLib.TEMPLATES
  ).map((item: any) => item.KEY);
  static readonly ENVIRONMENT_NOT_SUPPORT: string = 'Environment not support';
  static readonly SESSION_EXPIRE: string = 'Session expire.';
  static readonly ADDRESS_CITY_INVALID: string = 'Address city invalid.';
  static readonly ADDRESS_ZIP_CODE_INVALID: string = 'Address zip code invalid.';
  static readonly ADDRESS_STATE_CODE_INVALID: string = 'Address state code invalid.';
  static readonly ADDRESS_INFO_INVALID: string = 'Address info invalid.';
  static readonly ADDRESS_INVALID: string = 'ADDRESS_INVALID';
}
