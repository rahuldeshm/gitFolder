import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state, action) {
      state.counter = state.counter + action.payload.amount;
    },
    dicrement(state, action) {
      state.counter = state.counter - action.payload.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export default counterSlice;
