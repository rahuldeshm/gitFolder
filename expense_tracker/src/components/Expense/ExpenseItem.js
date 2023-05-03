import React, { useContext } from "react";
import { Col, Row, Button } from "react-bootstrap";
import DataContext from "../../Store/data-context";

function ExpenseItem(props) {
  const ctx = useContext(DataContext);
  function deleteHandler() {
    fetch(
      `https://expnesetracker-default-rtdb.firebaseio.com/expenses/${props.e.key}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        props.deleteHandler(props.index);
      }
    });
  }
  function editHandler() {
    ctx.addExpensetoEdit(props.e);
    ctx.setEdit(false);
    props.deleteHandler(props.index);
  }
  return (
    <Row
      className="p-2 mt-4"
      style={{
        borderRadius: "1rem",
        backgroundColor: "#17241c",
        boxShadow: "0 0 10px white",
      }}
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
