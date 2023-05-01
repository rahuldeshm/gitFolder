import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Expenses from "./Expenses";
import NewExpense from "./NewExpense";
import { useState } from "react";

function ExpensePage() {
  const [list, setList] = useState([]);
  function onAddHandler(price, discription, categary) {
    setList((list) => [...list, { price, discription, categary }]);
  }
  function fetchList() {
    fetch("https://expnesetracker-default-rtdb.firebaseio.com/expenses.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const keys = Object.keys(data);
          let arr = [];
          for (let i of keys) {
            arr.push(data[i]);
          }
          setList(arr);
        });
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  useEffect(fetchList, []);
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
