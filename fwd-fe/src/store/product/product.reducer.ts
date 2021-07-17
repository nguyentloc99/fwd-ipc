import { ProductStoreModel } from 'models/store/product/product-store.model';
import { createReducer } from 'typesafe-actions';
import { getProductAction } from './product.action';

const initialState: ProductStoreModel = {
  loading: false,
  quotationProducts: [],
};

const productReducer = createReducer<ProductStoreModel>(initialState)
  .handleAction(getProductAction.request, (state) => ({
    ...state,
    loading: true,
    quotationProducts: [],
  }))
  .handleAction(getProductAction.failure, (state) => ({
    ...state,
    loading: false,
  }))
  .handleAction(getProductAction.success, (state, { payload }) => ({
    ...state,
    loading: false,
    quotationProducts: payload.quotationProducts,
  }));

export default productReducer;
