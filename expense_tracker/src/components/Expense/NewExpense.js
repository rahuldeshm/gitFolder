import React, { useRef } from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";

function NewExpense(props) {
  const [cancel, setCancel] = useState(true);
  const priceRef = useRef();
  const discriptionRef = useRef();
  const categaryRef = useRef();
  function addExpenseHandler(e) {
    e.preventDefault();

    props.onsubmit(
      priceRef.current.value,
      discriptionRef.current.value,
      categaryRef.current.value
    );
    priceRef.current.value = "";
    categaryRef.current.value = "";
    discriptionRef.current.value = "";
  }
  return (
    <Container className="p-5" style={{ height: "36rem", textAlign: "center" }}>
      <Row>
        {cancel && <h5>Add Expenses</h5>}
        {!cancel && (
          <Button onClick={() => setCancel(true)}>Add Expenses</Button>
        )}
      </Row>
      {cancel && (
        <Form onSubmit={addExpenseHandler}>
          <FormControl
            className="mt-4"
            placeholder="Money Spent"
            ref={priceRef}
          />
          <FormControl
            as="textarea"
            style={{ height: "10rem" }}
            className="mt-3"
            placeholder="Discription"
            ref={discriptionRef}
          />
          <FormSelect className="mt-3" ref={categaryRef}>
            <option>food</option>
            <option>petrol</option>
            <option>salary</option>
          </FormSelect>
          <Button className="mt-3" onClick={addExpenseHandler}>
            Add Expense
          </Button>
          <Button
            className="mt-3"
            variant="danger"
            onClick={() => setCancel(false)}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default NewExpense;
