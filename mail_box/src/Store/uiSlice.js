import { createSlice } from "@reduxjs/toolkit";

const initialState = { loder: false, newmail: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loaderHandler(state) {
      state.loder = !state.loder;
    },
    newmailHandler(state) {
      state.newmail = !state.newmail;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
