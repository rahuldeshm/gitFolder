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

import Modal from "../UI/Modal";
import { expenseActions } from "../../Store/expenseSlice";

function NewExpense(props) {
  const token = useSelector((state) => state.auth.authorisation);
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.editexpense.edit);
  const editExpense = useSelector((state) => state.editexpense.editExpense);

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
    if (
      enteredDiscription !== "" &&
      enteredPrice !== "" &&
      enteredCategary !== ""
    ) {
      fetch(`http://localhost:3000/expense/expenses`, {
        method: method,
        body: JSON.stringify({
          id: key,
          description: enteredDiscription,
          price: enteredPrice,
          categary: enteredCategary,
        }),
        headers: {
          authorisation: token.idToken,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            let finkey;
            if (method !== "PUT") {
              finkey = data.id;
            } else {
              finkey = key;
            }

            dispatch(
              expenseActions.addList({
                price: enteredPrice,
                discription: enteredDiscription,
                categary: enteredCategary,
                id: finkey,
              })
            );
            props.onClick();
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
    <Modal onClick={props.onClick}>
      <Container
        className="p-5"
        style={{ height: "auto", textAlign: "center" }}
      >
        <Row>
          <h5>Add Expenses</h5>
        </Row>

        <Form onSubmit={addExpenseHandler}>
          <FormControl
            type="number"
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
          <Button className="mt-3" variant="danger" onClick={props.onClick}>
            Cancel
          </Button>
        </Form>
      </Container>
    </Modal>
  );
}

export default NewExpense;
