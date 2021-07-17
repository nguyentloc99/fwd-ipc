/**
 * @author LocNT
 * @description Grant role & permission access
 */

export class GrantPermission {
  // noinspection ES6ClassMemberInitializationOrder
  public static readonly ROLES = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    HELPER: 'helper'
  };

  public static readonly userRole = ((): string[] => {
    return [GrantPermission.ROLES.CUSTOMER, GrantPermission.ROLES.HELPER];
  })();
}
