import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import classes from "./SignIn.module.css";
import { useRef } from "react";
import { useState } from "react";

function SignIn() {
  const [hide, setHide] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  function onSubmitHandler(e) {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          localStorage.setItem("authorised", JSON.stringify(data));
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  }
  return (
    <>
      <h3 className="p-3">Sign In</h3>
      <Form onSubmit={onSubmitHandler}>
        <input
          className={`${classes.input}`}
          type="email"
          placeholder="email"
          required
          ref={emailRef}
        />
        <InputGroup>
          <input
            type={hide ? "text" : "password"}
            placeholder="password"
            className={`${classes.pass}`}
            ref={passRef}
            required
          />
          <div className={`${classes.eye}`}>
            {hide ? (
              <AiFillEye
                className={classes.eyecon}
                onClick={() => {
                  setHide((hide) => !hide);
                }}
              />
            ) : (
              <AiFillEyeInvisible
                className={classes.eyecon}
                onClick={() => {
                  setHide((hide) => !hide);
                }}
              />
            )}
          </div>
        </InputGroup>
        <button className={classes.btn}>Sign In</button>
      </Form>
    </>
  );
}

export default SignIn;
