import { Container, Row } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";

function Expenses() {
  const mod = useSelector((state) => state.theme.dark);
  const list = useSelector((state) => state.expense.list);
  const total = useSelector((state) => state.expense.total);

  return (
    <Container style={{ textAlign: "center" }}>
      <Row className="mt-1">
        <h4>Expenses </h4>
        <h5>{`Rs - ${total}`}</h5>
      </Row>

      {list.map((e, index) => {
        return <ExpenseItem index={index} key={e.id} e={e} />;
      })}
    </Container>
  );
}

export default Expenses;
