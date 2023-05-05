import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../store/uiSlice";

const CartButton = (props) => {
  const no = useSelector((state) => state.cart.noOfCart);
  const dispatch = useDispatch();
  function cartHandler() {
    dispatch(uiActions.setShowCart());
  }
  return (
    <button onClick={cartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{no}</span>
    </button>
  );
};

export default CartButton;
