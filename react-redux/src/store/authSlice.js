import { createSlice } from "@reduxjs/toolkit";
const initialauthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialauthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice;
