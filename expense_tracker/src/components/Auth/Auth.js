import { Col, Container, Row } from "react-bootstrap";
import AuthForm from "./AuthForm";

function Auth(props) {
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
          <Row className="p-3">
            <h3 className="p-2" style={{ borderBottom: "2px solid black" }}>
              Sign Up
            </h3>
          </Row>
          <Row>
            <AuthForm></AuthForm>
          </Row>
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
          <Row className="p-3">
            <h5>Have an account? Login</h5>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default Auth;
