import authorizedRequest from 'api/request/authorizedRequest';

export interface GetProductApiBody {
  genderCd: string;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  saPerYear?: number;
}

export interface GetProductApiResponse {}

export function getProductApi(body: GetProductApiBody) {
  console.log(body);
  return authorizedRequest.post<GetProductApiResponse, GetProductApiResponse>(
    '/getProduct',
    body,
  );
}
