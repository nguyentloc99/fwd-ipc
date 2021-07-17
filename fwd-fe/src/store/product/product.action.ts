import { QuotationProductModel } from 'models/entity/product/quotation-product.model';
import { createAsyncAction } from 'typesafe-actions';

export interface GetProductPayload {
  genderCd: string;
  dob: Date;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  saPerYear?: number;
}

export interface GetProductSuccessPayload {
  quotationProducts: QuotationProductModel[];
}

export const getProductAction = createAsyncAction(
  'product/GET_PRODUCT',
  'product/GET_PRODUCT_SUCCESS',
  'product/GET_PRODUCT_FAIL',
)<GetProductPayload, GetProductSuccessPayload, void>();
