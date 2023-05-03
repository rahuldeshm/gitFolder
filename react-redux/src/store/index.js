import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import counterSlice from "./counterSlice";

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const authActions = authSlice.actions;
export const counterActions = counterSlice.actions; // action creater.

export default store;
