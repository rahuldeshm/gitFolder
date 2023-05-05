import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, useState } from "react";
import Notification from "./components/UI/Notification";

function App() {
  const [loader, setLoader] = useState({
    loader: false,
    status: "",
    title: "",
    message: "",
  });

  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  function fetchCart() {
    setLoader({
      loader: true,
      status: "success",
      title: "Sending...",
      message: "Sending cart data!",
    });

    fetch("https://expnesetracker-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setLoader({
          loader: true,
          status: "success",
          title: "Success",
          message: "Successfully sent cart data!",
        });
      } else {
        setLoader({
          loader: true,
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        });
      }
    });
  }
  useEffect(fetchCart, [cart]);
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
