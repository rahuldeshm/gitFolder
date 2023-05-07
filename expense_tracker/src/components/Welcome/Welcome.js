import React, { useContext, useState } from "react";
import Profile from "./Profile";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DataContext from "../../Store/data-context";
import { useSelector } from "react-redux";

function Welcome() {
  const ctx = useContext(DataContext);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const profile = !!useSelector((state) => state.profile.name);
  const authorisation = useSelector((state) => state.auth.authorisation);
  const [update, setUpdate] = useState(true);
  const mod = useSelector((state) => state.theme.dark);
  let completed = profile ? "green" : "#ccc";
  const bgcolor = mod ? "white" : "#0b3738";
  const acolor = mod ? "#0b3738" : "white";
  function toggleHandler() {
    setUpdate(false);
  }

  function verifyEmailHandler() {
    ctx.loaderHandler();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authorisation.idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.loaderHandler();
          alert("Verification Email sent.");
        });
      } else
        res.json().then((data) => {
          ctx.loaderHandler();
          alert(data.error.message);
        });
    });
  }

  return (
    <Container fluid style={{ backgroundColor: bgcolor, color: acolor }}>
      <Row style={{ height: "4rem" }}></Row>
      <Row
        className="p-1"
        style={{ height: "auto", borderBottom: "2px solid black" }}
      >
        <Col sm={5}>
          <h5>Welcome to Expense tracker</h5>
        </Col>
        <Col
          sm={5}
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
            {profile
              ? "Your Profile is 100% complete"
              : update
              ? "Your Profile is Incomplete"
              : "Your profile is 64% completed, A complete profile has higher chances of landing a job "}
            <Link onClick={toggleHandler} to="/welcome/updateprofile">
              {profile ? "Update Profile" : "Complete Now"}
            </Link>
            .
          </p>
        </Col>
        <Col sm={2}>
          <Button
            onClick={verifyEmailHandler}
            variant={emailVerified ? "success" : "danger"}
          >
            {emailVerified ? "Email Verified" : "Verify email"}
          </Button>
        </Col>
      </Row>
      <Switch>
        <Route path="/welcome/:profile" exact>
          <Profile />
        </Route>
      </Switch>
      <Row style={{ height: "34rem", backgroundColor: bgcolor }}></Row>
    </Container>
  );
}

export default Welcome;
