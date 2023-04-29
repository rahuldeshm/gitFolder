import Auth from "./components/Auth/Auth";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";

function App() {
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
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    </>
  );
}

export default App;
