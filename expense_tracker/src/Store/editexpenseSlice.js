import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  edit: false,
  editExpense: {
    price: "",
    discription: "",
    categary: "",
    key: "",
  },
};

const editexpenseSlice = createSlice({
  name: "editexpense",
  initialState,
  reducers: {
    setEditExpense(state, action) {
      state.editExpense = action.payload;
      state.edit = !state.edit;
    },
  },
});

export const editexpenseActions = editexpenseSlice.actions;

export default editexpenseSlice.reducer;
