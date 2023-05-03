import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  function incrementHandler() {
    dispatch(counterActions.increment({ amount: 1 }));
  }
  function decrementHandler() {
    dispatch(counterActions.dicrement({ amount: 1 }));
  }
  function increment5Handler() {
    dispatch(counterActions.increment({ amount: 5 }));
  }
  function decrement5Handler() {
    dispatch(counterActions.dicrement({ amount: 5 }));
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <div>
        <button onClick={increment5Handler}>incrementby5</button>
        <button onClick={decrement5Handler}>decrementby5</button>
      </div>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
