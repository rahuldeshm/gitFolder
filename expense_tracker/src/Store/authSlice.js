import { createSlice } from "@reduxjs/toolkit";

const authorisation = JSON.parse(localStorage.getItem("authorised"));
const authorised = !!authorisation;
let lsls = authorised ? authorisation.email : "";
let ls = lsls.replace("@", "");
let emailString = ls.replace(".", "");

const initialState = { authorisation, authorised, emailString };

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.authorisation = action.payload;
      state.authorised = true;
      let lsls = action.payload.email;
      let ls = lsls.replace("@", "");
      let emailString = ls.replace(".", "");
      state.emailString = emailString;
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
