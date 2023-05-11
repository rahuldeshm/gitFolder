import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import mailSlice from "./mailSlice";
import currentSlice from "./currentSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    mail: mailSlice,
    current: currentSlice,
  },
});

export default store;
