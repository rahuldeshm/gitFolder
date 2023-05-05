import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, showLoading: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
