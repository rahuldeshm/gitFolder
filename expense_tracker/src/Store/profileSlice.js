import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", url: "", emailVerified: false };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFetchedData(state, action) {
      state.name = action.payload.name;
      state.url = action.payload.url;
      state.emailVerified = action.payload.emailVerified;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
