import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  function logoutHandler() {
    history.push("/auth");
    ctx.storeAuthorisation(null);
    localStorage.removeItem("login");
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!ctx.authorised && <Link to="/auth">Login</Link>}</li>
          <li>{ctx.authorised && <Link to="/profile">Profile</Link>}</li>
          <li>
            {ctx.authorised && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
