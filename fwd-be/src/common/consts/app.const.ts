/**
 * @class AppConst
 * @description define common app constants
 */

export class AppConst {
  /**
   * @field SCHEMA_OPTIONS
   * @description define option schema
   * @type any
   */
  static SCHEMA_OPTIONS: any = {
    versionKey: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    id: false,
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated'
    }
  };
  static readonly BOOLEAN: any = {
    TRUE: 'true',
    FALSE: 'false'
  };
  static readonly HOUR_RANGER: string[] = [...Array(25).keys()].map(item => item.toString());
  static readonly API_PREFIX: string = 'api';
  static readonly API_VERSION: string = 'v1';
  static readonly PAGE_SIZE: number = 20;
  static readonly SALT_ROUND: number = 10;

  static readonly PASSWORD_MAX_LENGTH: number = 20;
  static readonly PASSWORD_MIN_LENGTH: number = 8;

  static readonly NAME_MAX_LENGTH: number = 255;
  static readonly NAME_MIN_LENGTH: number = 2;
  static readonly NAME_REGEX: RegExp = /^[a-z A-Z 0-9 AÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐaáàảãạâấầẩẫậăắằẳẵặeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵđ ]*$/;

  static readonly EMAIL_MAX_LENGTH: number = 254;
  static readonly EMAIL_MIN_LENGTH: number = 7;

  static readonly PHONE_REGEX: RegExp = /^(0|(\+84)){1}[0-9]{9}$/;

  static readonly LONGITUDE_MIN: number = -180;
  static readonly LONGITUDE_MAX: number = 180;

  static readonly LATITUDE_MIN: number = -90;
  static readonly LATITUDE_MAX: number = 90;

  static readonly VERIFY_LOCATION_MAX: number = 0.0015; // 0.0003;

  static readonly TIME_BEFORE_MAX: number = 80;
  static readonly TIME_BEFORE_MIN: number = 0;

  static readonly TIME_START_AFTER_MIN: number = 30;

  static readonly QR_CODE_LENGTH: number = 10;

  static readonly AREA_MIN: number = 1;
  static readonly AREA_MAX: number = Number.MAX_VALUE;

  static NOTIFY_TYPE = {
    MAIL: 'mail',
    PUSH: 'push',
    SMS: 'sms'
  };

  static PUSH_TYPE: any = {
    JOB: 'job',
    DEFAULT: 'default'
  };
  static MAIL_TYPE: any = {
    LISTING_READY: 'listing_ready',
    CHANGE_ACCOUNT: 'change_account',
    SPECIAL_OFFER: 'special_offer',
    TRANSACTION: 'transaction',
    FAVORITES: 'favorites'
  };
  // todo sms type
  static SMS_TYPE: any = {};
  static DEFAULT: any = {
    ADMINISTRATOR_ID: 'administrator_id',
    ADMINISTRATOR: 'administrator'
  };
  static readonly ADDITIONAL_SERVICE_COST: number = 30 * 1000;

  static readonly JOB_OFFER_TIME_OUT: number = 30 * 1000;

  static readonly RETRY_MATCH_JOB_TIME_OUT: number = 10 * 1000;

  static readonly EXPIRE_JOB_TIME_OUT: number = 92 * 1000;
}
