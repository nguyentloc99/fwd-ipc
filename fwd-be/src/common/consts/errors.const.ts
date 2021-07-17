export class ErrorsConst {
  static readonly USER_ERROR: any = {
    DUPLICATE_USERNAME: 'Duplicate Username.',
    DUPLICATE_EMAIL_OR_PHONE: 'Duplicate email or phone.',
    DUPLICATE_EMAIL: 'Duplicate Email',
    DUPLICATE_PHONE_NUMBER: 'Duplicate Phone Number.',
    USER_NOT_FOUND: 'User not found.',
    PASSWORD_NOT_MATCH: 'Passwords must match.',
    WRONG_PASSWORD: 'Wrong password.',

    //#region "Reset password code"
    NO_RESET_CODE_FOUND: 'No reset code found.',
    INVALID_RESET_CODE: 'Invalid reset code.',
    EXPIRED_RESET_CODE: ' Reset code expired.',
    //#endregion "Reset password code"

    //#region "Customer"
    CUSTOMER_NOT_FOUND: 'Customer not found.',
    //#endregion "Customer"

    //#region "Helper"
    HELPER_NOT_FOUND: 'Helper not found.',
    //#endregion "Helper"
  };
}
