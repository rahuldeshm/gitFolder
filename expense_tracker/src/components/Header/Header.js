import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/lightning_sewer.webp";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/authSlice";
import { themeActions } from "../../Store/themeSlice";
import { expenseActions } from "../../Store/expenseSlice";
function Header() {
  const mod = useSelector((state) => state.theme.dark);
  const primium = useSelector((state) => state.expense.primium);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.expense.total);
  const authorised = useSelector((state) => state.auth.authorised);

  function logoutHandler() {
    dispatch(authActions.logout());
  }
  return (
    <Navbar
      bg={mod ? "primary" : "dark"}
      variant="dark"
      style={{ zIndex: "20", position: "fixed", width: "100%" }}
    >
      <Container>
        <Image src={logo} roundedCircle style={{ height: "2rem" }} />
      </Container>
      <Container>
        <Navbar.Brand>Expense Tracker app</Navbar.Brand>
      </Container>
      <Container>
        <Nav>
          {authorised && (
            <NavLink to="/welcome" style={{ margin: "5px" }}>
              {" "}
              <Button variant={mod ? "dark" : "primary"} size="sm">
                Profile
              </Button>
            </NavLink>
          )}
          {authorised && (
            <NavLink to="/expenses" style={{ margin: "5px" }}>
              {" "}
              <Button variant={mod ? "dark" : "primary"} size="sm">
                Expense
              </Button>
            </NavLink>
          )}

          {authorised && total > 10000 && (
            <Button
              size="sm"
              variant="success"
              style={{ margin: "5px", width: "8rem" }}
              onClick={() => {
                dispatch(expenseActions.primiumHandler());
              }}
            >
              Activate Primium
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
          {authorised && primium && (
            <Button
              size="sm"
              onClick={() => dispatch(themeActions.setTheme())}
              variant={mod ? "primary" : "dark"}
              style={{ margin: "5px" }}
            >
              {mod ? (
                <BsFillSunFill style={{ height: "1rem" }} />
              ) : (
                <BsFillMoonStarsFill style={{ height: "1rem" }} />
              )}
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
