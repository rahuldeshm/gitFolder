import { createSlice } from "@reduxjs/toolkit";

const initialState = { loder: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    newMailHandler(state) {
      state.loder = !state.loder;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
