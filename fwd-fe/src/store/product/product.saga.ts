import { takeLatest, put, call } from '@redux-saga/core/effects';
import { getProductApi, GetProductApiBody } from 'api/product/product.api';
import { toastError } from 'helpers/toast.helper';
import moment from 'moment';
import { getProductAction } from './product.action';

function* handleGetProduct({
  payload,
}: ReturnType<typeof getProductAction.request>) {
  try {
    const body: GetProductApiBody = {
      ...payload,
      dob: moment(payload.dob).format('YYYY-MM-DD'),
    };
    yield call(getProductApi, body);
    yield put(getProductAction.success());
  } catch (err) {
    yield put(getProductAction.failure());
    toastError(err);
  }
}

export default function* productSaga() {
  yield takeLatest(getProductAction.request, handleGetProduct);
}
