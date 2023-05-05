import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  loader: {
    loader: false,
    status: "",
    title: "",
    message: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
    setLoader(state, action) {
      state.loader = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
