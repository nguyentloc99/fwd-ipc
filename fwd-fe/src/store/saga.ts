import { all, fork } from '@redux-saga/core/effects';
import productSaga from './product/product.saga';

export default function* rootSaga() {
  try {
    yield all([fork(productSaga)]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
