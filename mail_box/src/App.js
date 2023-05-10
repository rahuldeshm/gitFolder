import "./App.css";
import Header from "./components/Header/Header";
import AuthPage from "./components/Auth/AuthPage";
import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom";
import Welcome from "./components/MainPage/Welcome";
import NewMail from "./components/NewEmail/NewEmail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "./Store/mailSlice";

function App() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.loder);
  const myemail = useSelector((state) => state.auth.authorisation.email);
  function fetchMails() {
    const myemaild = myemail.replace("@", "").replace(".", "");
    let arr = [];
    let arrs = [];
    fetch(
      `https://mailbox-de8bb-default-rtdb.asia-southeast1.firebasedatabase.app/${myemaild}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const keys = Object.keys(data.received);
          const keyssent = Object.keys(data.sent);

          for (let key of keys) {
            arr.push(data.received[key]);
          }
          for (let key of keyssent) {
            arrs.push(data.sent[key]);
          }
          dispatch(mailActions.setAllTheMails({ arr, arrs }));
        });
      }
    });
  }
  useEffect(fetchMails, []);
  return (
    <div style={{ backgroundColor: "rgb(36, 24, 10)" }}>
      <Header />
      {loader && <NewMail />}
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
      </Switch>
    </div>
  );
}

export default App;
