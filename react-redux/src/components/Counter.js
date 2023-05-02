import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  function incrementHandler() {
    dispatch({ type: "increment" });
  }
  function decrementHandler() {
    dispatch({ type: "decrement" });
  }
  function increment5Handler() {
    dispatch({ type: "increment5" });
  }
  function decrement5Handler() {
    dispatch({ type: "decrement5" });
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
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
