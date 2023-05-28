import React from "react";
import SignUp from "./SignUp";
import classes from "./AuthPage.module.css";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";
import SignIn from "./SignIn";

function AuthPage() {
  const [signIn, setSignIn] = useState(false);
  return (
    <Container className="p-4" style={{ width: "20rem", color: "white" }}>
      <Row className={`${classes.row}`}>{signIn ? <SignUp /> : <SignIn />}</Row>
      <Row className={`mt-2 ${classes.toggle}`}>
        <button
          onClick={() => setSignIn((signIn) => !signIn)}
          className={classes.button}
        >
          {signIn ? "Have an account? Log in" : "New Here? Sign Up"}
        </button>
      </Row>
      <Row style={{ height: "5.4rem" }} />
    </Container>
  );
}

export default AuthPage;
