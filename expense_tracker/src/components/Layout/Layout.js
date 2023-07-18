import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainButtons from "./MainButtons";
import Expenses from "../Expense/Expenses";
import Leaderboard from "../Leaderboard/Leaderboard";

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col sm={8} style={{ height: "90vh" }}>
          <Row style={{ height: "45vh" }}>
            <Col
              sm={6}
              className="m-0 p-0"
              style={{
                height: "45vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MainButtons />
            </Col>
            <Col sm={6} className="p-1" style={{ height: "45vh" }}>
              <Leaderboard />
            </Col>
          </Row>
          <Row style={{ height: "45vh", border: "1px solid salmon" }}></Row>
        </Col>
        <Col
          sm={{ order: "first", sm: 4 }}
          className="m-0 p-0"
          style={{ height: "90vh" }}
        >
          <Expenses />
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
