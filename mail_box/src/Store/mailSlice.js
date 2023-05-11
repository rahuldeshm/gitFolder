import { createSlice } from "@reduxjs/toolkit";

const initialState = { received: {}, sent: {}, noofnew: 0 };

const mailSlice = createSlice({
  name: "receivedMail",
  initialState,
  reducers: {
    setAllTheMails(state, action) {
      state.received = action.payload.received;
      state.sent = action.payload.sent;
      let arrs = 0;
      const keyssent = Object.keys(action.payload.received);
      for (let key of keyssent) {
        if (action.payload.received[key].new) {
          arrs++;
        }
      }
      state.noofnew = arrs;
    },
    setNewToFalse(state, action) {
      let total = { ...state.received };
      total[action.payload].new = false;
      state.noofnew--;
      state.received = total;
    },
    deleteMail(state, action) {
      delete state.received[action.payload];
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
