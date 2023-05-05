import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  cartItems: [],
  cartNames: [],
  noOfCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
    addToCart(state, action) {
      const ind = state.cartNames.indexOf(action.payload.title);
      let cartitemstoedit = [...state.cartItems];
      if (ind !== -1) {
        cartitemstoedit[ind].amount++;
        state.cartItems = cartitemstoedit;
        state.noOfCart++;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
        state.cartNames = [...state.cartNames, action.payload.title];
        state.noOfCart++;
      }
    },
    editInCart(state, action) {
      let cartitemstoedit = [...state.cartItems];
      let cartnamestoedit = [...state.cartNames];
      if (
        action.payload.op === "A" ||
        state.cartItems[action.payload.index].amount !== 1
      ) {
        if (action.payload.op === "A") {
          cartitemstoedit[action.payload.index].amount++;
          state.noOfCart++;
        } else {
          cartitemstoedit[action.payload.index].amount--;
          state.noOfCart--;
        }
        state.cartItems = cartitemstoedit;
      } else {
        state.noOfCart--;
        cartitemstoedit.splice(action.payload.index, 1);
        cartnamestoedit.splice(action.payload.index, 1);
        state.cartItems = cartitemstoedit;
        state.cartNames = cartnamestoedit;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
