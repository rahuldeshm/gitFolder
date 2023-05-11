import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { current: {} };

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    addCurrent(state, action) {
      state.current = action.payload;
    },
  },
});

export const currentActions = currentSlice.actions;
export default currentSlice.reducer;
