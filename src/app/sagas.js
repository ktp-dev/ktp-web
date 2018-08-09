import { takeEvery } from 'redux-saga/effects';

import { BOOT } from './action-types';
import { onBoot } from './effects';

export function* bootSaga() {
  yield takeEvery(BOOT, onBoot);
}
