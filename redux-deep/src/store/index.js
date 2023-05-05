import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: { cart: cartSlice, ui: uiSlice },
});

export default store;
