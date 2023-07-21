import { createSlice } from "@reduxjs/toolkit";
const perPage = JSON.parse(localStorage.getItem("perpage"));
const initialState = {
  chartlist: [],
  list: [],
  primium: false,
  pageData: { perPage, count: 1, totalPages: 1, currentPage: 1 },
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addList(state, action) {
      state.list = action.payload;
    },
    deleteList(state, action) {
      let li = [...state.list];
      li.splice(action.payload, 1);
      state.list = li;
    },
    deleteWholeList(state) {
      state.list = [];
    },
    primiumHandler(state) {
      state.primium = !state.primium;
    },
    chartAdd(state, action) {
      state.chartlist = action.payload;
    },
    setPageData(state, action) {
      state.pageData = action.payload;
    },
    addIndList(state, action) {
      state.list = [action.payload, ...state.list];
    },
    setPerPage(state, action) {
      state.pageData.perPage = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
