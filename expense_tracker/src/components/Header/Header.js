import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/lightning_sewer.webp";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.expense.total);
  const authorised = useSelector((state) => state.auth.authorised);

  const premium = total < 10000 ? total : "Activate Premium";
  const variant = total < 10000 ? "primary" : "danger";

  function logoutHandler() {
    dispatch(authActions.logout());
  }
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ zIndex: "20", position: "fixed", width: "100%" }}
    >
      <Container>
        <Image src={logo} roundedCircle style={{ height: "2rem" }} />
      </Container>
      <Container>
        <Navbar.Brand>MyWebLink</Navbar.Brand>
      </Container>
      <Container>
        <Nav>
          <NavLink to="/" style={{ margin: "5px" }}>
            <Button size="sm">Home </Button>
          </NavLink>
          {authorised && (
            <NavLink to="/expenses" style={{ margin: "5px" }}>
              {" "}
              <Button size="sm">Expense</Button>
            </NavLink>
          )}
          {authorised && (
            <Button size="sm" variant={variant} style={{ margin: "5px" }}>
              {premium}
            </Button>
          )}

          {authorised && (
            <a href="http://localhost:3000/">
              <Button
                style={{ margin: "5px" }}
                size="sm"
                onClick={logoutHandler}
                variant="outline-danger"
              >
                logout
              </Button>
            </a>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
