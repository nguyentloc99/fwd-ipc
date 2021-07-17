/**
 * @interface ResponseError
 * @description define model response error
 */

export interface ResponseError {
  name: string;
  code?: string;
  message?: string;
  errors?: any;
}
