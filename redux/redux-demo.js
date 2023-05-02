const redux = require("redux");

function counterReducer(state = { counter: 0 }, action) {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  } else {
    return { counter: state.counter + 1 };
  }
}

const store = redux.createStore(counterReducer);

console.log(store.getState());
const counterSubscriber = () => {
  console.log(store.getState());
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "increment" });
