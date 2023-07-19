import classes from "./Layout.module.css";
import { Col, Container, Row } from "react-bootstrap";
import MainButtons from "./MainButtons";
import Expenses from "../Expense/Expenses";
import Leaderboard from "../Leaderboard/Leaderboard";
import MainData from "../Chart/MainData";
import GetData from "../Chart/GetData";

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col
          xs={12}
          className="order-1 order-md-2 "
          md={8}
          style={{ height: "auto", marginBottom: "7rem" }}
        >
          <Row style={{ maxHeight: "fit-content" }}>
            <Col
              xs={12}
              sm={6}
              className="m-0 p-0 order-2 order-sm-1"
              style={{
                height: "45vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MainButtons />
            </Col>
            <Col
              xs={12}
              sm={6}
              className="p-1 order-1 order-sm-2"
              style={{ height: "45vh" }}
            >
              <Leaderboard />
            </Col>
          </Row>
          <Row
            style={{
              height: "45vh",
            }}
          >
            <Col xs={12} className={classes.chart}>
              <GetData />
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          md={4}
          className="mt-9 p-0 order-2 order-md-1 "
          style={{ height: "90vh", overflowY: "scroll" }}
        >
          <Expenses />
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
