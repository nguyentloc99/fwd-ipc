import { createAsyncAction } from 'typesafe-actions';

export interface GetProductPayload {
  genderCd: string;
  dob: Date;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  saPerYear?: number;
}

export const getProductAction = createAsyncAction(
  'product/GET_PRODUCT',
  'product/GET_PRODUCT_SUCCESS',
  'product/GET_PRODUCT_FAIL',
)<GetProductPayload, void, void>();
