import React, { useCallback, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Expenses from "./Expenses";
import NewExpense from "./NewExpense";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expenseSlice";

function ExpensePage() {
  const mod = useSelector((state) => state.theme.dark);
  const list = useSelector((state) => state.expense.list);
  const dispatch = useDispatch();
  const onAddHandler = useCallback(
    (price, discription, categary, key) => {
      dispatch(expenseActions.addList({ price, discription, categary, key }));
    },
    [dispatch]
  );
  const bgcolor = mod ? "white" : "#0b3738";

  function fetchList() {
    dispatch(expenseActions.deleteWholeList());
    fetch("https://expnesetracker-default-rtdb.firebaseio.com/expenses.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const keys = Object.keys(data);
          let total = 0;
          for (let i of keys) {
            total = total + parseInt(data[i].price);
            onAddHandler(
              data[i].price,
              data[i].discription,
              data[i].categary,
              i
            );
          }
        });
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  useEffect(fetchList, [onAddHandler]);

  function deleteHandler(index) {
    dispatch(expenseActions.deleteList(index));
  }

  return (
    <Container fluid style={{ color: "white", backgroundColor: bgcolor }}>
      <Row style={{ height: "4rem" }}></Row>
      <Row>
        <Col>
          <NewExpense onsubmit={onAddHandler} />
        </Col>
        <Col>
          <Expenses deleteHandler={deleteHandler} list={list} />
        </Col>
      </Row>
    </Container>
  );
}

export default ExpensePage;
