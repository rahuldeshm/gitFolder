import "./App.css";
import Header from "./components/Header/Header";
import AuthPage from "./components/Auth/AuthPage";
import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom";
import Welcome from "./components/Profile/Welcome";
import NewMail from "./components/NewEmail/NewEmail";

function App() {
  return (
    <div style={{ backgroundColor: "rgb(36, 24, 10)" }}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/newmail">
          <NewMail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
