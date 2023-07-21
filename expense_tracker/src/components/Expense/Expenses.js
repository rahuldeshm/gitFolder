import { Col, Container, FormSelect, Row } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Expenses.module.css";
import useFetch from "../Custom/useFetch";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { expenseActions } from "../../Store/expenseSlice";

function Expenses() {
  const mod = useSelector((state) => state.theme.dark);
  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.expense.pageData);
  console.log(pageData);
  const [list, setList] = useFetch();
  const btns = [];
  for (let i = 0; i < pageData.totalPages; i++) {
    btns.push(
      <button
        onClick={() => setList(i + 1)}
        className={
          pageData.currentPage === i + 1 ? classes.activebtn : classes.btn
        }
        key={`${i}butt`}
      >
        {i + 1}
      </button>
    );
  }
  const nextHandler = () => {
    if (pageData.currentPage === pageData.totalPages) {
      alert("You are on last page");
    } else {
      setList(pageData.currentPage + 1);
    }
  };
  return (
    <Container className={classes.cont}>
      <Row className={classes.heading}>
        <Col xs={5}>
          <h5>EXPENSES</h5>
        </Col>
        <Col xs={4}>Per Page</Col>
        <Col xs={3}>
          <FormSelect
            value={pageData.perPage}
            className="p-0"
            placeholder="categary"
            onChange={(e) => {
              dispatch(expenseActions.setPerPage(e.target.value));
              localStorage.setItem("perpage", JSON.stringify(e.target.value));
            }}
          >
            <option>5</option>
            <option>9</option>
            <option>10</option>
            <option>15</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className={classes.expenses}>
        {list.map((e, index) => {
          const nm = pageData.perPage * (pageData.currentPage - 1) + index + 1;
          return <ExpenseItem index={index} key={e.id} e={e} nm={nm} />;
        })}
      </Row>
      <Row className={classes.page}>
        <Col xs={2}>
          <BsFillArrowLeftSquareFill
            className={
              pageData.currentPage === 1 ? classes.disabled : classes.active
            }
            onClick={() => setList(pageData.currentPage - 1)}
            size={30}
          />
        </Col>
        <Col xs={8}>{btns}</Col>
        <Col xs={2}>
          <BsFillArrowRightSquareFill
            className={
              pageData.currentPage === pageData.totalPages
                ? classes.disabled
                : classes.active
            }
            onClick={nextHandler}
            size={30}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Expenses;
