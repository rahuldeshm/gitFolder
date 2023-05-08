import React from "react";
import { FloatingLabel, FormControl } from "react-bootstrap";
import classes from "./SignUp.module.css";

function SignUp() {
  return (
    <>
      <h3 className="p-3">SignUp</h3>
      <FloatingLabel
        className="mb-3"
        controlId="floatingInput"
        label="Email Address"
        style={{ color: "black" }}
      >
        <FormControl type="email" placeholder="email" />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="floatingInput"
        label="Password"
        style={{ color: "black" }}
      >
        <FormControl type="password" placeholder="email" />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="floatingInput"
        label="Password"
        style={{ color: "black" }}
      >
        <FormControl type="password" placeholder="email" />
      </FloatingLabel>
      <button className={`m-3 ${classes.btn}`} style={{ width: "90%" }}>
        Sign Up
      </button>
    </>
  );
}

export default SignUp;
