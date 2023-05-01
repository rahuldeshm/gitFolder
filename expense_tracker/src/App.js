import Auth from "./components/Auth/Auth";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import { useContext } from "react";
import DataContext from "./Store/data-context";
import ForgotPass from "./components/Auth/ForgotPass";
import Loader from "./components/UI/Loader";
import ExpensePage from "./components/Expense/ExpensePage";

function App() {
  const ctx = useContext(DataContext);

  return (
    <>
      <Header></Header>
      {ctx.loader && <Loader />}
      <Switch>
        <Route path="/" exact>
          <Redirect to={ctx.authorised ? "welcome" : "auth"} />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/forgot-password">
          <ForgotPass />
        </Route>
        {ctx.authorised && (
          <Route path="/welcome">
            <Welcome />
          </Route>
        )}
        {ctx.authorised && (
          <Route path="/expenses">
            <ExpensePage />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
