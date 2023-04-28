import React from "react";
import logo from "../../images/lightning_sewer.webp";
import { Container, Nav, NavLink, Navbar, Image } from "react-bootstrap";
function Header(props) {
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
          <NavLink>Home</NavLink>
          <NavLink>Products</NavLink>
          <NavLink>AboutUs</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
