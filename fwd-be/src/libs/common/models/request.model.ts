import {ServiceOption} from './common.model';

export interface OptionRequest {
  service: ServiceOption;
  url: string;
  body?: any;
  qs?: any;
  secure?: boolean; // default true
}

export enum MethodOption {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}
