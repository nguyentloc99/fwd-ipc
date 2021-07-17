const USER_FIELD = ['_id', 'role', 'phoneNumber', 'displayName'];

export class AuthConfig {
  static readonly JWT = {
    FIELD: [...USER_FIELD]
  };
}
