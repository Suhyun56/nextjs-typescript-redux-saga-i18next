import { getRandomNumber } from '@/utils/counter';
import {
  increaseCountInit,
  increaseCountSuccess,
  increaseCountError,
  decreaseCountInit,
  decreaseCountSuccess,
  decreaseCountError,
} from "@/store/Counter";
import { all, call, put, takeLatest } from "redux-saga/effects";

function* getPlusNumber() {
  try {
    const randomNumber: number = yield call(() => getRandomNumber());
    yield put(increaseCountSuccess(randomNumber));
  } catch (error) {
    yield put(increaseCountError());
  }
}

function* getMinusNumber() {
  try {
    const randomNumber: number = yield call(() => getRandomNumber());
    yield put(decreaseCountSuccess(randomNumber));
  } catch (error) {
    yield put(decreaseCountError());
  }
}

export function* getCounterSaga() {
  yield all([
    takeLatest(increaseCountInit, getPlusNumber),
    takeLatest(decreaseCountInit, getMinusNumber),
  ]);
}