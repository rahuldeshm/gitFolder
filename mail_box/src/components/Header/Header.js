import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Container, Navbar } from "react-bootstrap";
import mail from "./../../images/mail.png";
import { Image } from "react-bootstrap";
import { authActions } from "../../Store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem("authorised");
    history.push("/auth");
  }
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ borderBottom: "0.5px solid #ccc" }}
    >
      <Container fluid>
        <Image src={mail} style={{ height: "2rem" }} />
        <Navbar.Brand>MAIL BOX</Navbar.Brand>
        <Button onClick={logoutHandler} size="sm" variant="outline-danger">
          Log out
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
