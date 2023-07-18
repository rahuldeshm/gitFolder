import React from "react";
import classes from "./MainButtons.module.css";
import { FaCrown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import { authActions } from "../../Store/authSlice";

function Premium() {
  const [Razorpay, isLoaded] = useRazorpay();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authorisation);
  async function raserHandler(e) {
    e.preventDefault();
    if (auth.ispremium) {
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/payment/createorder",

        {
          method: "POST",
          body: {},
          headers: {
            authorisation: auth.idToken,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const options = {
          key: data.key_id,
          order_id: data.order.id,
          handler: async function (payres) {
            const updateres = await fetch(
              "http://localhost:3000/payment/update",
              {
                method: "POST",
                body: JSON.stringify({
                  order_id: options.order_id,
                  payment_id: payres.razorpay_payment_id,
                }),
                headers: {
                  authorisation: auth.idToken,
                  "Content-Type": "application/json",
                },
              }
            );
            const newtoken = { ...auth };
            newtoken.ispremium = true;
            localStorage.setItem("authorised", JSON.stringify(newtoken));
            dispatch(authActions.login(newtoken));
            alert(updateres.data.message);
          },
        };
        const rzpl = new Razorpay(options);
        rzpl.open();
        rzpl.on("payment.failed", async function () {
          try {
            const updatere = await fetch(
              "http://localhost:3000/payment/update",
              {
                method: "POST",
                body: JSON.stringify({
                  order_id: options.order_id,
                  payment_id: null,
                }),
                headers: { authorisation: auth.idToken },
              }
            );
            alert(updatere.data.message);
          } catch (err) {
            alert(err);
          }
          rzpl.close();
        });
      } else {
        throw new Error("some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.style} onClick={raserHandler}>
      <FaCrown
        className={auth.ispremium ? classes.iconsp : classes.icon}
        size={75}
      />
      <p>{auth.ispremium ? "Premium User" : "Get Primium"}</p>
    </div>
  );
}

export default Premium;
