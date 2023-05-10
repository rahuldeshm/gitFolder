import { createSlice } from "@reduxjs/toolkit";

const authorisation = JSON.parse(localStorage.getItem("authorised"));
const authorised = !!authorisation;

const initialState = { authorised, authorisation };

const authSlice = createSlice({
  name: "authorised",
  initialState,
  reducers: {
    login(state, action) {
      state.authorisation = action.payload;
      state.authorised = true;
    },
    logout(state) {
      state.authorisation = null;
      state.authorised = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
