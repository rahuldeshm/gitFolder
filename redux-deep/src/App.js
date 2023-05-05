import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/uiSlice";
import { cartActions } from "./store/cartSlice";

let isFirstTime = true;

function App() {
  const loader = useSelector((state) => state.ui.loader);
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  function fetchCart() {
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }
    dispatch(
      uiActions.setLoader({
        loader: true,
        status: "success",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    fetch("https://expnesetracker-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        dispatch(
          uiActions.setLoader({
            loader: true,
            status: "success",
            title: "Success",
            message: "Successfully sent cart data!",
          })
        );
      } else {
        dispatch(
          uiActions.setLoader({
            loader: true,
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      }
    });
  }
  useEffect(fetchCart, [cart, dispatch]);
  function fetchPriviousData() {
    if (isFirstTime) {
      isFirstTime = true;
    }
    dispatch(
      uiActions.setLoader({
        loader: true,
        status: "success",
        title: "Fetching...",
        message: "Collecting cart data!",
      })
    );

    fetch("https://expnesetracker-default-rtdb.firebaseio.com/cart.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(cartActions.fetchedCart(data));
        });
        dispatch(
          uiActions.setLoader({
            loader: false,
            status: "",
            title: "",
            message: "",
          })
        );
      } else {
        dispatch(
          uiActions.setLoader({
            loader: true,
            status: "error",
            title: "Error!",
            message: "Collecting cart data failed!",
          })
        );
      }
    });
  }
  useEffect(fetchPriviousData, [dispatch]);
  return (
    <>
      {loader.loader && (
        <Notification
          status={loader.status}
          title={loader.title}
          message={loader.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
