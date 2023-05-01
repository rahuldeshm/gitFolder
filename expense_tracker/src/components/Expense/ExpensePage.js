import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Expenses from "./Expenses";
import NewExpense from "./NewExpense";
import { useState } from "react";
const l = [
  { price: 233, discription: "on some thing expensive", categary: "food" },
];
function ExpensePage() {
  const [list, setList] = useState(l);
  function onAddHandler(price, discription, categary) {
    setList((list) => [...list, { price, discription, categary }]);
  }
  return (
    <Container fluid style={{ color: "white", backgroundColor: "#0b3738" }}>
      <Row style={{ height: "4rem" }}></Row>
      <Row>
        <Col>
          <NewExpense onsubmit={onAddHandler} />
        </Col>
        <Col>
          <Expenses list={list} />
        </Col>
      </Row>
    </Container>
  );
}

export default ExpensePage;
