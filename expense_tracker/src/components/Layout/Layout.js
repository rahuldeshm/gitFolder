import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainButtons from "./MainButtons";

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col
          sm={4}
          className="m-0 p-0"
          style={{ height: "90vh", border: "1px solid salmon" }}
        ></Col>
        <Col sm={8} style={{ height: "90vh", border: "1px solid salmon" }}>
          <Row style={{ height: "45vh", border: "1px solid salmon" }}>
            <Col sm={6} className="m-0 p-0" style={{ height: "45vh" }}>
              <MainButtons />
            </Col>
            <Col
              sm={6}
              style={{ height: "45vh", border: "1px solid salmon" }}
            ></Col>
          </Row>
          <Row style={{ height: "45vh", border: "1px solid salmon" }}></Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
