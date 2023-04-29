import React, { useContext, useState } from "react";
import Profile from "./Profile";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DataContext from "../../Store/data-context";

function Welcome() {
  const ctx = useContext(DataContext);
  const [update, setUpdate] = useState(true);
  let completed = ctx.completedProfile ? "green" : "#ccc";

  function toggleHandler() {
    setUpdate(false);
  }

  function verifyEmailHandler() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctx.authorisation.idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => console.log(data));
      } else res.json().then((data) => alert(data.error.message));
    });
  }

  return (
    <Container fluid>
      <Row style={{ height: "4rem" }}></Row>
      <Row
        className="p-1"
        style={{ height: "auto", borderBottom: "2px solid black" }}
      >
        <Col sm={6}>
          <h5>Welcome to Expense tracer</h5>
        </Col>
        <Col
          sm={4}
          style={{
            backgroundColor: completed,
            borderRadius: "1rem",
            height: "auto",
            textAlign: "center",
          }}
        >
          <p
            className="m-1"
            style={{ fontSize: "0.8rem", fontStyle: "italic" }}
          >
            {ctx.completedProfile
              ? "Your Profile is 100% complete"
              : update
              ? "Your Profile is Incomplete"
              : "Your profile is 64% completed, A complete profile has higher chances of landing a job "}
            <Link onClick={toggleHandler} to="/welcome/updateprofile">
              {ctx.completedProfile ? "Update Profile" : "Complete Now"}
            </Link>
            .
          </p>
        </Col>
        <Col>
          <Button onClick={verifyEmailHandler} variant="danger">
            Verify email
          </Button>
        </Col>
      </Row>
      <Switch>
        <Route path="/welcome/:profile" exact>
          <Profile />
        </Route>
      </Switch>
    </Container>
  );
}

export default Welcome;
