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
  } else if (action.type === "incrementby2") {
    return {
      counter: state.counter + 2,
    };
  } else if (action.type === "decrementby2") {
    return {
      counter: state.counter - 2,
    };
  } else {
    return state;
  }
}

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  console.log(store.getState());
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "incrementby2" });
store.dispatch({ type: "decrementby2" });
