import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import counter, { getCounterSaga } from "@/store/Counter";

const isDev = process.env.NODE_ENV === "development";
const combinedReducer = combineReducers({
  counter,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export function* rootSaga() {
  yield all([
    getCounterSaga(),
  ])
}

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: isDev ? [sagaMiddleware, logger] : [sagaMiddleware],
  devTools: isDev,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type RootReducerType = ReturnType<typeof rootReducer>;

const wrapper = createWrapper(() => store);
export default wrapper;