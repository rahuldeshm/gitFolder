import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Navbar } from "react-bootstrap";
import mail from "./../../images/mail.png";
import { Image } from "react-bootstrap";
import { authActions } from "../../Store/authSlice";
import { currentActions } from "../../Store/currentSlice";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const timeout = useSelector((state) => state.current.timeout);

  function logoutHandler() {
    clearTimeout(timeout);
    localStorage.removeItem("authorised");
    dispatch(authActions.logout());
    history.replace("/auth");
    dispatch(currentActions.removeCurrent());
    
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
          <a href="https://mailbox-de8bb.web.app/"><Button onClick={logoutHandler} size="sm" variant="outline-danger">
            Log out
          </Button></a>
      </Container>
    </Navbar>
  );
}

export default Header;
