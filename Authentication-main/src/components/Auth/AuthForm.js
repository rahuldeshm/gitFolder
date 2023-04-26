import { useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEmail] = useState("");
  const [enteredPass, setPass] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }

  function passChangeHandler(e) {
    setPass(e.target.value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (isLogin) {
      props.onSubmit(enteredEmail, enteredPass);
      setPass("");
    } else {
      props.onCreate(enteredEmail, enteredPass);
      setPass("");
      setEmail("");
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            value={enteredEmail}
            onChange={emailChangeHandler}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={enteredPass}
            onChange={passChangeHandler}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>
            {isLogin
              ? `${props.isLoading ? "Sending Request..!" : "Log in"}`
              : `${
                  props.isLoading ? "Creating New Account.." : "Create Account"
                }`}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
