import React from "react";
import { Col, Row } from "react-bootstrap";

function ExpenseItem(props) {
  return (
    <Row
      className="p-2 mt-4"
      style={{ borderRadius: "1rem", boxShadow: "0 0 10px white" }}
    >
      <Col className="p-3">
        <h5>{`$${props.e.price}`}</h5>
      </Col>
      <Col className="p-1">
        <p>{props.e.discription}</p>
      </Col>
      <Col className="p-3">
        <h5>{props.e.categary}</h5>
      </Col>
    </Row>
  );
}

export default ExpenseItem;
