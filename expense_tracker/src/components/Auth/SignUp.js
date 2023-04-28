import React from "react";
import { useRef } from "react";
import { FloatingLabel, Form, FormControl, Button } from "react-bootstrap";

function AuthForm(props) {
  const emailRef = useRef();
  const passRef = useRef();
  const cpassRef = useRef();
  function signupHandler(e) {
    e.preventDefault();
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY";
    if (passRef.current.value === cpassRef.current.value) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: cpassRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      });
    } else {
      alert("password and confirm password fields should be same.");
    }
  }
  return (
    <Form onSubmit={signupHandler}>
      <FloatingLabel label="Email address" className="mb-3">
        <FormControl
          type="email"
          placeholder="someemail@email.com"
          ref={emailRef}
        ></FormControl>
      </FloatingLabel>
      <FloatingLabel label="Password" className="mb-3">
        <FormControl
          type="password"
          placeholder="somepassword"
          ref={passRef}
        ></FormControl>
      </FloatingLabel>
      <FloatingLabel label="Confirm Password" className="mb-3">
        <FormControl
          type="password"
          placeholder="somepassword"
          ref={cpassRef}
        ></FormControl>
      </FloatingLabel>

      <Button className="mt-2" variant="success" onClick={signupHandler}>
        Sign Up
      </Button>
    </Form>
  );
}

export default AuthForm;
