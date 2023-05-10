import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Welcome() {
  return (
    <>
      <p style={{ color: "white" }}>Welcome to mail box</p>
      <Link to="/newmail">
        <Button>send Mail</Button>
      </Link>
    </>
  );
}

export default Welcome;
