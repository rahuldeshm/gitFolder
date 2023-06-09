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
      if (!!action.payload.to) {
        delete state.sent[action.payload.id];
      } else {
        delete state.received[action.payload.id];
      }
    },
    addNewMail(state, action) {
      state.sent = { ...state.sent, [action.payload.id]: action.payload.newm };
    },
    clearAllMails(state,action){
      state.received= {}
      state.sent= {}
      state.noofnew= 0 
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
