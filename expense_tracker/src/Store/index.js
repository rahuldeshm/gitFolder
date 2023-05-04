import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import editexpenseSlice from "./editexpenseSlice";
import expenseSlice from "./expenseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    editexpense: editexpenseSlice,
    expense: expenseSlice,
  },
});

export default store;
