import React from "react";
import SignUp from "./SignUp";
import classes from "./AuthPage.module.css";
import { Container, Row } from "react-bootstrap";

function AuthPage() {
  return (
    <Container className="p-4" style={{ width: "20rem", color: "white" }}>
      <Row className={`${classes.row}`}>
        <SignUp />
      </Row>
      <Row className={`mt-2 ${classes.toggle}`}>
        <button className={classes.button}>Have an account? Log in</button>
      </Row>
      <Row style={{ height: "5rem" }} />
    </Container>
  );
}

export default AuthPage;
