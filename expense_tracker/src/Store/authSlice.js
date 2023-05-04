import { createSlice } from "@reduxjs/toolkit";

const authorisation = JSON.parse(localStorage.getItem("authorised"));
const authorised = !!authorisation;

const initialState = { authorisation, authorised };

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.authorisation = action.payload;
      state.authorised = true;
    },
    logout(state) {
      state.authorisation = null;
      state.authorised = false;
      localStorage.removeItem("authorised");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
