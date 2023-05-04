import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { useRef } from "react";
import { useContext } from "react";
import DataContext from "../../Store/data-context";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ctx = useContext(DataContext);
  const emailRef = useRef();
  const passRef = useRef();
  const [hide, setHide] = useState(true);
  function toggleHandler() {
    setHide((hide) => !hide);
  }

  function loginHandler(e) {
    e.preventDefault();
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY";
    ctx.loaderHandler();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(authActions.login(data));
          localStorage.setItem("authorised", JSON.stringify(data));
          history.replace("/welcome");
          ctx.loaderHandler();
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
          ctx.loaderHandler();
        });
      }
    });
  }

  return (
    <Form>
      <FormControl
        type="email"
        placeholder="email"
        style={{
          padding: ".5rem",
          marginTop: "1.5rem",
          backgroundColor: "black",
          color: "white",
        }}
        ref={emailRef}
      />
      <InputGroup>
        <FormControl
          type={hide ? "password" : "text"}
          placeholder="password"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: ".5rem",
            marginTop: "1.5rem",
          }}
          ref={passRef}
        />
        <InputGroup.Text
          style={{
            backgroundColor: "black",
            color: "white",
            padding: ".5rem",
            marginTop: "1.5rem",
          }}
        >
          {!hide ? (
            <AiFillEye onClick={toggleHandler} style={{ color: "white" }} />
          ) : (
            <AiFillEyeInvisible
              onClick={toggleHandler}
              style={{ color: "white" }}
            />
          )}
        </InputGroup.Text>
      </InputGroup>
      <button
        onClick={loginHandler}
        style={{
          backgroundColor: "aqua",
          width: "100%",
          borderRadius: "1.5rem",
          border: "0px solid aqua",
          padding: ".5rem",
          marginTop: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        Sign in
      </button>
      <Link to="/forgot-password"> Forgot password</Link>
    </Form>
  );
}

export default Login;
