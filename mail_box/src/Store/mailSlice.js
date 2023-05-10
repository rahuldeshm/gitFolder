import { createSlice } from "@reduxjs/toolkit";

const initialState = { receivedMails: [], sentMails: [] };

const mailSlice = createSlice({
  name: "receivedMail",
  initialState,
  reducers: {
    setAllTheMails(state, action) {
      state.receivedMails = action.payload.arr;
      state.sentMails = action.payload.arrs;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
