import { useEffect } from "react";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editexpenseActions } from "../../Store/editexpenseSlice";
import Download from "./Download";

function NewExpense(props) {
  const emailString = useSelector((state) => state.auth.emailString);
  const primium = useSelector((state) => state.expense.primium);
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.editexpense.edit);
  const editExpense = useSelector((state) => state.editexpense.editExpense);
  const [cancel, setCancel] = useState(false);
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDiscription, setEnteredDiscription] = useState("");
  const [enteredCategary, setEnteredCategary] = useState("");
  function addExpenseHandler(e) {
    e.preventDefault();
    let method;
    let key;
    if (edit === true) {
      method = "POST";
      key = "";
    } else {
      key = editExpense.key;
      method = "PUT";
    }
    let url = `https://expnesetracker-default-rtdb.firebaseio.com/expenses/${emailString}/${key}.json`;

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
            let finkey;
            if (method !== "PUT") {
              finkey = data.name;
            } else {
              finkey = key;
            }
            props.onsubmit(
              enteredPrice,
              enteredDiscription,
              enteredCategary,
              finkey
            );
            if (method === "PUT") {
              dispatch(
                editexpenseActions.setEditExpense({
                  price: "",
                  discription: "",
                  categary: "",
                })
              );
            }
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
    setEnteredCategary(editExpense.categary);
    setEnteredDiscription(editExpense.discription);
    setEnteredPrice(editExpense.price);
  }

  useEffect(editData, [editExpense]);

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
    <Container className="p-5" style={{ height: "auto", textAlign: "center" }}>
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
            <option>utensils</option>
            <option>books</option>
            <option>cloths</option>
            <option>other</option>
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
      {primium && <Download />}
    </Container>
  );
}

export default NewExpense;
