import React, { useState } from "react";
import Profile from "./Profile";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Welcome() {
  const [update, setUpdate] = useState(true);
  function toggleHandler() {
    setUpdate((update) => !update);
  }
  return (
    <Container fluid>
      <Row style={{ height: "4rem" }}></Row>
      <Row
        className="p-1"
        style={{ height: "auto", borderBottom: "2px solid black" }}
      >
        <Col sm={7}>
          <h5>Welcome to Expense tracer</h5>
        </Col>
        <Col
          sm={5}
          style={{
            backgroundColor: "#ccc",
            borderRadius: "1rem",
            height: "auto",
            textAlign: "center",
          }}
        >
          <p
            className="m-1"
            style={{ fontSize: "0.8rem", fontStyle: "italic" }}
          >
            {update
              ? "Your Profile is Incomplete"
              : "Your profile is 64% completed, A complete profile has higher chances of landing a job "}
            <Link
              style={{ fontStyle: "bolder" }}
              onClick={toggleHandler}
              to="/welcome/updateprofile"
            >
              Complete Now
            </Link>
            .
          </p>
        </Col>
      </Row>
      <Route path="/welcome/:profile">
        <Profile toggle={toggleHandler} />
      </Route>
    </Container>
  );
}

export default Welcome;
