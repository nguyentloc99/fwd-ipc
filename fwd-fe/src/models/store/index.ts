import { AuthenticateStoreModel } from './authenticate/authenticate.model';
import { ProductStoreModel } from './product/product-store.model';

export interface StoreState {
  authenticate: AuthenticateStoreModel;
  product: ProductStoreModel;
}
