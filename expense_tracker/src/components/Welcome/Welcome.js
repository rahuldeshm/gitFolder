import React, { useContext } from "react";
import { Button, Col, Container } from "react-bootstrap";
import DataContext from "../../Store/data-context";
import { useSelector } from "react-redux";

function Welcome() {
  const ctx = useContext(DataContext);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const profile = !!useSelector((state) => state.profile.name);
  const authorisation = useSelector((state) => state.auth.authorisation);

  const mod = useSelector((state) => state.theme.dark);
  let completed = profile ? "green" : "#ccc";

  function verifyEmailHandler() {
    ctx.loaderHandler();
    fetch("http://16.171.27.226:3000/profile/verify", {
      method: "POST",
      body: JSON.stringify({
        email: authorisation.email,
      }),
      headers: {
        authorisation: authorisation.idToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.loaderHandler();
          alert("Verification Email sent.");
        });
      } else
        res.json().then((data) => {
          ctx.loaderHandler();
          alert(data.err);
        });
    });
  }

  return (
    <Container className="m-0 p-0" fluid>
      <Col
        style={{
          backgroundColor: completed,
          borderRadius: "1rem",
          height: "auto",
          textAlign: "center",
        }}
      >
        <p className="m-1" style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
          {profile
            ? "Your Profile is 100% complete"
            : "Your profile is 64% completed"}
          .
        </p>
      </Col>
      <Col>
        <Button
          style={{ width: "100%" }}
          onClick={verifyEmailHandler}
          variant={emailVerified ? "success" : "danger"}
        >
          {emailVerified ? "Email Verified" : "Verify email"}
        </Button>
      </Col>
    </Container>
  );
}

export default Welcome;
