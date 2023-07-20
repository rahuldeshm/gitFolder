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
  const [enteredCategary, setEnteredCategary] = useState("Food");
  function addExpenseHandler(e) {
    e.preventDefault();
    let method;
    let key;
    if (!edit) {
      method = "POST";
      key = "";
    } else {
      key = editExpense.id;
      method = "PUT";
    }
    if (
      enteredDiscription === "" ||
      enteredPrice === "" ||
      enteredCategary === ""
    ) {
      alert("Fill All required fields");
    }
    fetch(`http://localhost:3000/expense/expenses`, {
      method: "POST",
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
          let createdAt;
          if (method !== "PUT") {
            props.onClick();
            finkey = data.id;
            createdAt = data.createdAt;
          } else {
            finkey = key;
            createdAt = editExpense.createdAt;
          }

          dispatch(
            expenseActions.addList({
              price: enteredPrice,
              discription: enteredDiscription,
              categary: enteredCategary,
              id: finkey,
              createdAt: createdAt,
            })
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
  function onCloseHandler() {
    if (!edit) {
      props.onClick();
    } else {
      dispatch(expenseActions.addList(editExpense));
      dispatch(
        editexpenseActions.setEditExpense({
          price: "",
          discription: "",
          categary: "",
        })
      );
    }
  }
  return (
    <Modal onClick={onCloseHandler}>
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
            <option>Food</option>
            <option>Travel</option>
            <option>Entertainment</option>
            <option>cloths</option>
            <option>other</option>
          </FormSelect>
          <Button className="mt-3" onClick={addExpenseHandler}>
            Add Expense
          </Button>
          <Button className="mt-3" variant="danger" onClick={onCloseHandler}>
            Cancel
          </Button>
        </Form>
      </Container>
    </Modal>
  );
}

export default NewExpense;
