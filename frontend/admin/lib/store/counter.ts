"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
