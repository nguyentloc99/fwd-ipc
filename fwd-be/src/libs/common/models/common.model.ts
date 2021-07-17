/**
 * @class CommonModel
 * @description environment running, note (require environment nameming is lowercase)
 */
export enum Environment {
  local = 'local',
  production = 'production',
  staging = 'staging',
  dev = 'dev',
  test = 'test'
}

export enum Strategy {
  ClientId = 'x-bbb-client-id',
  ClientSecret = 'x-bbb-client-secret',
  ClientDevice = 'x-bbb-device'
}

export enum ServiceOption {
  WHOLESALER = 'wholesaler',
  AUTH = 'auth',
  NOTIFY = 'notify',
  BILLING = 'billing',
  CORE = 'core',
  SHIPMENT = 'shipment',
  SUPPORT = 'support',
  SUBSCRIPTION = 'subscription'
}

export enum Headers {
  ContentType = 'Content-Type',
  Authorization = 'Authorization'
}
