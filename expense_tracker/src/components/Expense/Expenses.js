import { Col, Container, Row } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";
import classes from "./Expenses.module.css";
import useFetch from "../Custom/useFetch";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

function Expenses() {
  const mod = useSelector((state) => state.theme.dark);
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
        <h5>EXPENSES</h5>
      </Row>
      <Row className={classes.expenses}>
        {list.map((e, index) => {
          return <ExpenseItem index={index} key={e.id} e={e} />;
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
