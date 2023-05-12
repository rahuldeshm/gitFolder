import "./App.css";
import Header from "./components/Header/Header";
import AuthPage from "./components/Auth/AuthPage";
import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom";
import Welcome from "./components/MainPage/Welcome";
import NewMail from "./components/NewEmail/NewEmail";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "./Store/mailSlice";
import { currentActions } from "./Store/currentSlice";

let first = true;

function App() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.loder);
  const mails = useSelector((state) => state.mail);
  const myemail = useSelector((state) => state.auth.authorisation);

  const fetchedDataHandler = (data) => {
    console.log("updated fetched data");
    dispatch(
      mailActions.setAllTheMails({
        received: data.received,
        sent: data.sent,
      })
    );
  };

  function fetchMails() {
    if (myemail === null) {
      return;
    }

    const myemaild = myemail.email.replace("@", "").replace(".", "");

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
          fetchedDataHandler(data);
          const timeout = setTimeout(() => {
            fetchMails();
          }, 3000);
          dispatch(currentActions.addtimeout(timeout));
        });
      }
    });
  }
  useEffect(fetchMails, [myemail]);
  function updateMails() {
    if (first) {
      first = false;
      return;
    }
    const myemaild = myemail.email.replace("@", "").replace(".", "");

    fetch(
      `https://mailbox-de8bb-default-rtdb.asia-southeast1.firebasedatabase.app/${myemaild}.json`,
      {
        method: "PUT",
        body: JSON.stringify(mails),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  }
  useEffect(updateMails, [mails]);

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
