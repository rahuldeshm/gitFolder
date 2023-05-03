import { useContext, useEffect } from "react";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import DataContext from "../../Store/data-context";

function NewExpense(props) {
  const ctx = useContext(DataContext);
  const [cancel, setCancel] = useState(false);
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDiscription, setEnteredDiscription] = useState("");
  const [enteredCategary, setEnteredCategary] = useState("");
  function addExpenseHandler(e) {
    e.preventDefault();
    let method;
    let key;
    if (ctx.edit === true) {
      method = "POST";
      key = "";
    } else {
      key = ctx.editExpense.key;
      method = "PUT";
    }
    let url = `https://expnesetracker-default-rtdb.firebaseio.com/expenses/${key}.json`;

    if (
      enteredDiscription !== "" &&
      enteredPrice !== "" &&
      enteredCategary !== ""
    ) {
      fetch(url, {
        method: method,
        body: JSON.stringify({
          discription: enteredDiscription,
          price: enteredPrice,
          categary: enteredCategary,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (method === "PUT") {
              ctx.setEdit(true);
            }

            props.onsubmit(
              enteredPrice,
              enteredDiscription,
              enteredCategary,
              ctx.editExpense.key
            );
            setEnteredCategary("");
            setEnteredDiscription("");
            setEnteredPrice("");
          });
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      });
    } else {
      alert("Fill All required fields");
    }
  }

  function editData() {
    setEnteredCategary(ctx.editExpense.categary);
    setEnteredDiscription(ctx.editExpense.discription);
    setEnteredPrice(ctx.editExpense.price);
  }

  useEffect(editData, [ctx.editExpense]);

  function priceChangeHandler(e) {
    setEnteredPrice(e.target.value);
  }
  function discriptionChangeHandler(e) {
    setEnteredDiscription(e.target.value);
  }
  function categaryChangeHandler(e) {
    setEnteredCategary(e.target.value);
  }
  return (
    <Container className="p-5" style={{ height: "36rem", textAlign: "center" }}>
      <Row>
        {cancel && <h5>Add Expenses</h5>}
        {!cancel && (
          <Button
            style={{ height: "4rem", marginTop: "5rem" }}
            onClick={() => setCancel(true)}
          >
            Add Expenses
          </Button>
        )}
      </Row>
      {cancel && (
        <Form onSubmit={addExpenseHandler}>
          <FormControl
            value={enteredPrice}
            className="mt-4"
            placeholder="Money Spent"
            onChange={priceChangeHandler}
          />
          <FormControl
            value={enteredDiscription}
            onChange={discriptionChangeHandler}
            as="textarea"
            style={{ height: "10rem" }}
            className="mt-3"
            placeholder="Discription"
          />
          <FormSelect
            value={enteredCategary}
            className="mt-3"
            placeholder="categary"
            onChange={categaryChangeHandler}
          >
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
