import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editexpenseActions } from "../../Store/editexpenseSlice";

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
        props.deleteHandler(props.index);
        alert(`${props.e.discription} Deleted sussfully`);
      }
    });
  }
  function editHandler() {
    dispatch(editexpenseActions.setEditExpense(props.e));
    props.deleteHandler(props.index);
  }
  return (
    <Row
      className="p-2 mt-2"
      style={{
        borderRadius: "1rem",
        boxShadow: "0 0 10px blue",
        margin: "2px",
      }}
    >
      <Col className="p-3">
        <h5>{`Rs${props.e.price}`}</h5>
      </Col>
      <Col className="p-1">
        <p>{props.e.discription}</p>
      </Col>
      <Col className="p-3">
        <h5>{props.e.categary}</h5>
      </Col>
      <Col>
        <Button onClick={deleteHandler} size="sm" variant="outline-danger">
          X
        </Button>
        <Button onClick={editHandler} size="sm" variant="outline-success">
          Edit
        </Button>
      </Col>
    </Row>
  );
}

export default ExpenseItem;
