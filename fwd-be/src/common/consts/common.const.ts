export class CommonConst {
  static readonly NOTIFICATION_TYPE = {
    SMS: 'sms',
    NOTIFY: 'notify',
    EMAIL: 'email'
  };
  static readonly CATEGORY_ISSUE = {
    UNSATISFIED: 'unsatisfied',
    UNFINISHED: 'unfinished'
  };
  static readonly CATEGORY_TITLE = {
    RATING: 'rating',
    ISSUE: 'issue'
  };
  static readonly CATEGORY_TYPE = {
    RATING: 'rating',
    HELPER_JOB_APPROVED: 'helper-job-approved',
    CUSTOMER_JOB_APPROVED: 'customer-job-approved',
    CUSTOMER_JOB_DOING: 'customer-job-doing',
    CUSTOMER_JOB_PROCESSING: 'customer-job-processing'
  };
  static readonly DEVICE_TYPE = {
    SMS: 'sms',
    EMAIL: 'email',
    NOTIFY: 'notify'
  };
  static readonly RATE_STATUS = {
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    PENDING: 'pending'
  };
  static readonly RATE_TYPE = {
    NORMAL: 'normal',
    JOB: 'job'
  };
  static readonly ISSUE_TYPE = {
    APPROVED: 'approved',
    DOING: 'doing'
  };
  static readonly ISSUE_STATUS = {
    PENDING: 'pending',
    RESOLVED: 'resolved',
    DISPUTED: 'disputed'
  };
  static readonly UNIT_TYPE = {
    HOUR: 'hour',
    DAY: 'day'
  };
  static readonly PAYMENT_TYPE = {
    CASH: 'cash',
    CARD: 'card'
  };
  public static readonly JOB_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    COMPLETED: 'completed',
    REJECTED: 'rejected',
    CANCELED: 'canceled',
    EXPIRED: 'expired',
    DOING: 'doing',
    PROCESSING: 'processing'
  };
  public static readonly CUSTOMER_STATUS = {
    PRECOMPLETED: 'pre-completed',
    APPROVED: 'approved',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
  };
  public static readonly HELPER_STATUS = {
    PRECOMPLETED: 'pre-completed',
    APPROVED: 'approved',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
    READY: 'ready',
    DOING: 'doing',
  };
  public static readonly VPOINT_HISTORY_TYPE = {
    INCREASE: 'increase',
    DECREASE: 'decrease'
  };
  public static readonly VOUCHER_TYPE = {
    PUBLIC: 'public',
    PRIVATE: 'private'
  };
  public static readonly VOUCHER_DISCOUNT_TYPE = {
    PERCENT: 'percent',
    DIRECT: 'direct'
  };
  static readonly SERVICE_STATUS = {
    ENABLE: 'enable',
    DISABLE: 'disable'
  };
  static readonly STATUS_SERVICE = {
    ACTIVE: 'active',
    DELETED: 'deleted'
  };
  static readonly HOUSE_TYPE = {
    HOUSE: 'house',
    APARTMENT: 'apartment',
    VILLA: 'villa'
  };
  static readonly TAKE_CARE_LOCATION_TYPE = {
    HOUSE: 'house',
    HOSPITAL: 'hospital'
  };
  static readonly RANK_NAME = {
    SILVER: 'silver',
    GOLD: 'gold',
    DIAMOND: 'diamond'
  };
  static readonly PERSONAL_SERVICE_IDENTITY = {
    HOUSE_CLEANING: 'donDepNha',
    COOKING: 'nauAn',
    WASHING: 'giatUi',
    TAKE_CARE_BABY: 'trongBe',
    TAKE_CARE_THE_SICK: 'trongNguoiOm',
    TAKE_CARE_PET: 'chamSocThuCung'
  };
  static readonly TYPE_LOCATION: string = 'Point';
  static readonly RATE_SCORES_RANGER: number[] = [1, 2, 3, 4, 5];
  static readonly BONUS_MULTIPLE_VALUE: number = 1; // 10000
}
