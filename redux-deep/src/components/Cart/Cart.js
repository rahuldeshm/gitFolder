import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const list = useSelector((state) => state.cart.cartItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {list.map((e, index) => {
          return (
            <CartItem
              key={`cart${e.title}`}
              item={{
                index: index,
                title: e.title,
                quantity: e.amount,
                total: e.amount * e.price,
                price: e.price,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
