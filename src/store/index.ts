import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import counter, { getCounterSaga } from "store/Counter";

const rootReducer = combineReducers({
  counter,
});

export function* rootSaga() {
  yield all([
    getCounterSaga(),
  ])
}

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: process.env.NODE_ENV === "development" ? [sagaMiddleware, logger] : [sagaMiddleware],
  devTools: process.env.NODE_ENV === "development",
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type RootReducerType = ReturnType<typeof rootReducer>;

const wrapper = createWrapper(() => store);
export default wrapper;