import Auth from "./components/Auth/Auth";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import { useContext } from "react";
import DataContext from "./Store/data-context";

function App() {
  const ctx = useContext(DataContext);

  return (
    <>
      <Header></Header>
      <Switch>
        <Route path="/" exact>
          <Redirect to="auth" />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {ctx.authorised && (
          <Route path="/welcome">
            <Welcome />
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
