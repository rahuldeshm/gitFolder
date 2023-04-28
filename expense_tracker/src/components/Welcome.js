import React from "react";
import { Col, Container } from "react-bootstrap";

function Welcome() {
  return (
    <Container>
      <Col className="p-5" style={{ height: "10rem", backgroundColor: "red" }}>
        <h1>Welcome to Expense tracer</h1>
      </Col>
    </Container>
  );
}

export default Welcome;
