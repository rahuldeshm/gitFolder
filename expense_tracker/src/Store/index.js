import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import editexpenseSlice from "./editexpenseSlice";
import expenseSlice from "./expenseSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    editexpense: editexpenseSlice,
    expense: expenseSlice,
    theme: themeSlice,
  },
});

export default store;
