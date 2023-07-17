import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/lightning_sewer.webp";
import { Nav, Navbar, Image, Button, Col } from "react-bootstrap";
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
    <Navbar bg={mod ? "primary" : "dark"} variant="dark">
      <Col style={{ textAlign: "center" }}>
        <Image
          src={logo}
          roundedCircle
          style={{ height: "2rem", marginRight: "4rem" }}
        />
      </Col>
      <Col style={{ textAlign: "center" }}>
        <Navbar.Brand>Expense Tracker app</Navbar.Brand>
      </Col>
      <Col style={{ textAlign: "center" }}>
        {authorised && total > 10000 && !primium && (
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
          <a href="http://localhost:3001/">
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
      </Col>
    </Navbar>
  );
}
export default Header;
