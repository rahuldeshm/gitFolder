import React from "react";
import { Container, Row } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";

function Expenses(props) {
  return (
    <Container style={{ textAlign: "center" }} className="pr-4">
      <Row className="mt-5">
        <h5>Expenses</h5>
      </Row>

      {props.list.map((e, index) => {
        return (
          <ExpenseItem
            deleteHandler={props.deleteHandler}
            index={index}
            key={e.key}
            e={e}
          />
        );
      })}
    </Container>
  );
}

export default Expenses;
