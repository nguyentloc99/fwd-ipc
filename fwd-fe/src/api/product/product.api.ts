import authorizedRequest from 'api/request/authorizedRequest';
import { QuotationProductModel } from 'models/entity/product/quotation-product.model';

export interface GetProductApiBody {
  genderCd: string;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  saPerYear?: number;
}

export interface GetProductApiResponse {
  quotationProductList: QuotationProductModel[];
}

export function getProductApi(body: GetProductApiBody) {
  return authorizedRequest.post<GetProductApiResponse, GetProductApiResponse>(
    '/getProduct',
    body,
  );
}
