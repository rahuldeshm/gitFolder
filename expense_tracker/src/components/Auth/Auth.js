import { Col, Container, Row } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import { useState } from "react";

function Auth(props) {
  const [islogin, setisLogin] = useState(true);
  function logintosignupHandler() {
    setisLogin((islogin) => !islogin);
  }
  return (
    <div
      style={{
        backgroundColor: "#0b3738",
        height: "41rem",
        justifyContent: "center",
      }}
    >
      <Container style={{ height: "8rem" }}></Container>
      <Container
        style={{
          borderRadius: "1rem",
          textAlign: "center",
          backgroundColor: "white",
          width: "20rem",
          height: "23rem",
        }}
      >
        <Col sm={12}>
          <Row className="p-1">
            <h3 className="p-3" style={{ borderBottom: "2px solid black" }}>
              {islogin ? "log in" : "Sign Up"}
            </h3>
          </Row>
          <Row className="p-2">{islogin ? <Login /> : <SignUp />}</Row>
        </Col>
      </Container>
      <Container
        className="mt-2"
        style={{
          borderRadius: "1rem",
          textAlign: "center",
          backgroundColor: "#d5f0ea",
          width: "20rem",
          height: "4rem",
        }}
      >
        <Col sm={12}>
          <Row className="p-3" onClick={logintosignupHandler}>
            <h5>
              {islogin ? "New Here? Sign up." : "Have an account? Log in"}
            </h5>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default Auth;
