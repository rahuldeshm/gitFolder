import React, { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expenseSlice";
import DataContext from "../../Store/data-context";

function Expenses() {
  const dispatch = useDispatch();
  const ctx = useContext(DataContext);
  const token = useSelector((state) => state.auth.authorisation);
  const mod = useSelector((state) => state.theme.dark);
  const list = useSelector((state) => state.expense.list);
  const total = useSelector((state) => state.expense.total);

  function fetchList() {
    dispatch(expenseActions.deleteWholeList());
    ctx.loaderHandler();
    fetch(`http://localhost:3000/expense/expenses`, {
      method: "GET",
      headers: {
        authorisation: token.idToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const keys = Object.keys(data);
          for (let i of keys) {
            dispatch(
              expenseActions.addList({
                id: data[i].id,
                price: data[i].price,
                discription: data[i].description,
                categary: data[i].categary,
              })
            );
          }
        });
        ctx.loaderHandler();
      } else {
        res.json().then((data) => {
          ctx.loaderHandler();
          console.log(data);
          alert(data.error.message);
        });
      }
    });
  }

  useEffect(fetchList, [dispatch]);
  const deleteHandler = (index) => {
    dispatch(expenseActions.deleteList(index));
  };
  return (
    <Container style={{ textAlign: "center" }}>
      <Row className="mt-1">
        <h4>Expenses </h4>
        <h5>{`Rs - ${total}`}</h5>
      </Row>

      {list.map((e, index) => {
        return (
          <ExpenseItem
            deleteHandler={deleteHandler}
            index={index}
            key={e.id}
            e={e}
          />
        );
      })}
    </Container>
  );
}

export default Expenses;
