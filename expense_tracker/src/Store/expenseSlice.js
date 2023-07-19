import { createSlice } from "@reduxjs/toolkit";
const initialState = { list: [], total: 0, primium: false };
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addList(state, action) {
      state.list = [action.payload, ...state.list];
      state.total = state.total + parseInt(action.payload.price);
    },
    deleteList(state, action) {
      let li = [...state.list];
      const sub = parseInt(li[action.payload].price);
      li.splice(action.payload, 1);
      state.list = li;
      state.total = state.total - sub;
    },
    deleteWholeList(state) {
      state.list = [];
      state.total = 0;
    },
    primiumHandler(state) {
      state.primium = !state.primium;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
