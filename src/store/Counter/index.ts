import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export * from "./saga";

type CounterState = {
  count: number;
  status: "idle" | "loading" | "failed";
};

const initialState: CounterState = {
  count: 0,
  status: "idle",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    clearCount: (state) => {
      state.count = 0;
      state.status = "idle";
    },
    increaseCountInit: (state) => {
      state.status = "loading";
    },
    increaseCountSuccess: (state, action: PayloadAction<number>) => {
      state.status = "idle";
      state.count += action.payload;
    },
    increaseCountError: (state) => {
      state.status = "failed";
    },
    decreaseCountInit: (state) => {
      state.status = "loading";
    },
    decreaseCountSuccess: (state, action: PayloadAction<number>) => {
      state.status = "idle";
      state.count -= action.payload;
    },
    decreaseCountError: (state) => {
      state.status = "failed";
    }
  }
});

export const {
  clearCount,
  increaseCountInit,
  increaseCountSuccess,
  increaseCountError,
  decreaseCountInit,
  decreaseCountSuccess,
  decreaseCountError,
} = counterSlice.actions;

const counter = counterSlice.reducer;
export default counter;