import { ProductStoreModel } from 'models/store/product/product-store.model';
import { createReducer } from 'typesafe-actions';
import { getProductAction } from './product.action';

const initialState: ProductStoreModel = {
  loading: false,
};

const productReducer = createReducer<ProductStoreModel>(initialState)
  .handleAction(getProductAction.request, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(getProductAction.failure, (state) => ({
    ...state,
    loading: false,
  }));

export default productReducer;
