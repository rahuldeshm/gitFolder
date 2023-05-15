import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Navbar } from "react-bootstrap";
import mail from "./../../images/mail.png";
import { Image } from "react-bootstrap";
import { authActions } from "../../Store/authSlice";
import { currentActions } from "../../Store/currentSlice";
import { mailActions } from "../../Store/mailSlice";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const timeout = useSelector((state) => state.current.timeout);

  function logoutHandler() {
    clearTimeout(timeout);
    dispatch(authActions.logout());
    localStorage.removeItem("authorised");
    dispatch(currentActions.removeCurrent());
    history.replace("/auth");
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
        <a href="http://localhost:3000/auth">
          <Button onClick={logoutHandler} size="sm" variant="outline-danger">
            Log out
          </Button>
        </a>
      </Container>
    </Navbar>
  );
}

export default Header;
