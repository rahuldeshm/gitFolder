import { createStore } from "redux";

function counterReducer(state = { counter: 0 }, action) {
  if (action.type === "increment") {
    return { counter: state.counter + 1 };
  } else if (action.type === "decrement") {
    return { counter: state.counter - 1 };
  }
  return state;
}

const store = redux.createStore(counterReducer);

console.log(store.getState());

export default store;
