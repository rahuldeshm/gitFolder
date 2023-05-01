import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/lightning_sewer.webp";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import DataContext from "../../Store/data-context";

function Header(props) {
  const ctx = useContext(DataContext);
  function logoutHandler() {
    ctx.authorisationHandler(null);
    localStorage.removeItem("authorised");
  }
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ zIndex: "20", position: "fixed", width: "100%" }}
    >
      <Container>
        <Image src={logo} roundedCircle style={{ height: "2rem" }}></Image>
      </Container>
      <Container>
        <Navbar.Brand>MyWebLink</Navbar.Brand>
      </Container>
      <Container>
        <Nav>
          <NavLink to="/" style={{ margin: "5px" }}>
            Home{" "}
          </NavLink>
          {ctx.authorised && (
            <NavLink to="/expenses" style={{ margin: "5px" }}>
              {" "}
              Expense
            </NavLink>
          )}
          <NavLink to="/" style={{ margin: "5px" }}>
            {" "}
            AboutUs
          </NavLink>
          {ctx.authorised && (
            <a href="http://localhost:3000/">
              <Button onClick={logoutHandler} variant="outline-danger">
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
