import { combineReducers, ReducersMapObject } from 'redux';
import { ActionType } from 'typesafe-actions';
import { StoreState } from '../models/store';
import authenticateReducer from './authenticate/authenticate.reducer';
import productReducer from './product/product.reducer';

const rootReducer: ReducersMapObject<
  StoreState,
  ActionType<typeof import('../store/action').default>
> = {
  authenticate: authenticateReducer,
  product: productReducer,
};

export default combineReducers(rootReducer);
