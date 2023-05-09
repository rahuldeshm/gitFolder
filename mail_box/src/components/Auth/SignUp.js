import React from "react";
import { FloatingLabel, FormControl } from "react-bootstrap";
import classes from "./SignUp.module.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignUp() {
  const history = useHistory();
  const emailRef = useRef();
  const passRef = useRef();
  const cpassRef = useRef();
  function onSubmitHandler(e) {
    e.preventDefault();
    if (
      emailRef.current.value !== "" &&
      passRef.current.value !== "" &&
      cpassRef.current.value &&
      passRef.current.value === cpassRef.current.value
    ) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: cpassRef.current.value,
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
            history.push("/welcome");
          });
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      });
    } else {
      alert(
        "fill all the fields and check password and confirm password are equal...!"
      );
    }
  }
  return (
    <>
      <h3 className="p-3">SignUp</h3>
      <FloatingLabel
        className="mb-3"
        controlId="floatingInput"
        label="Email Address"
        style={{ color: "black" }}
      >
        <FormControl type="email" placeholder="email" required ref={emailRef} />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="floatingInput"
        label="Password"
        style={{ color: "black" }}
      >
        <FormControl
          type="password"
          placeholder="password"
          required
          ref={passRef}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="floatingInput"
        label="Password"
        style={{ color: "black" }}
      >
        <FormControl
          type="password"
          placeholder="password"
          required
          ref={cpassRef}
        />
      </FloatingLabel>
      <button
        onClick={onSubmitHandler}
        className={`m-3 ${classes.btn}`}
        style={{ width: "90%" }}
      >
        Sign Up
      </button>
    </>
  );
}

export default SignUp;
