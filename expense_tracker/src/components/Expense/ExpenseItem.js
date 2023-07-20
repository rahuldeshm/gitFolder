import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editexpenseActions } from "../../Store/editexpenseSlice";
import { expenseActions } from "../../Store/expenseSlice";
import classes from "./ExpenseItem.module.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function ExpenseItem(props) {
  const token = useSelector((state) => state.auth.authorisation);
  const dispatch = useDispatch();

  function deleteHandler() {
    fetch(`http://localhost:3000/expense/expenses/${props.e.id}`, {
      method: "DELETE",
      headers: {
        authorisation: token.idToken,
        price: props.e.price,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        dispatch(expenseActions.deleteList(props.index));
        alert(`${props.e.discription} Deleted sussfully`);
      }
    });
  }
  function editHandler() {
    dispatch(editexpenseActions.setEditExpense(props.e));
    dispatch(expenseActions.deleteList(props.index));
  }
  return (
    <Container className={classes.item}>
      <Row>
        <Col className="p-1">
          <h5>{`Rs${props.e.price}`}</h5>
        </Col>
        <Col className="p-1">
          <h5>{props.e.categary}</h5>
        </Col>
      </Row>
      <Row>
        <Col sm={8} className="p-0">
          <p>{props.e.discription}</p>
        </Col>
        <Col sm={4}>
          <Button onClick={deleteHandler} size="sm" variant="outline-danger">
            <AiFillDelete size={18} />
          </Button>
          <Button onClick={editHandler} size="sm" variant="outline-success">
            <AiFillEdit size={18} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ExpenseItem;
