import { createSlice } from "@reduxjs/toolkit";

const initialState = { current: {}, timeout: null };

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    addCurrent(state, action) {
      state.current = action.payload;
    },
    removeCurrent(state) {
      state.current = {};
    },
    addtimeout(state, action) {
      state.timeout = action.payload;
    },
  },
});

export const currentActions = currentSlice.actions;
export default currentSlice.reducer;
