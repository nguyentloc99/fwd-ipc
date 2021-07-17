import { QuotationProductModel } from 'models/entity/product/quotation-product.model';

export interface ProductStoreModel {
  loading: boolean;
  quotationProducts: QuotationProductModel[];
}
