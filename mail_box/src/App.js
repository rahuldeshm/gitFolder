import "./App.css";
import Header from "./components/Header/Header";
import AuthPage from "./components/Auth/AuthPage";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Welcome from "./components/Profile/Welcome";

function App() {
  return (
    <div style={{ backgroundColor: "rgb(36, 24, 10)" }}>
      <Header />
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
