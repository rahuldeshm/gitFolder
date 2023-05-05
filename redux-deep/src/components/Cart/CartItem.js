import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cartSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, index } = props.item;
  function subHandler() {
    dispatch(cartActions.editInCart({ index, op: "S" }));
  }
  function addHandler() {
    dispatch(cartActions.editInCart({ index, op: "A" }));
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={subHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
