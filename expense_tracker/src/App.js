import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "./Store/data-context";
import ForgotPass from "./components/Auth/ForgotPass";
import Loader from "./components/UI/Loader";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import { expenseActions } from "./Store/expenseSlice";

function App() {
  const ctx = useContext(DataContext);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authorisation);
  const authorised = useSelector((state) => state.auth.authorised);
  function fetchList() {
    dispatch(expenseActions.deleteWholeList());
    if (!token) {
      return;
    }
    ctx.loaderHandler();
    fetch(`http://localhost:3000/expense/expenset`, {
      method: "GET",
      headers: {
        authorisation: token.idToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const keys = Object.keys(data);
          const flist = [];
          for (let i of keys) {
            flist.push({
              id: data[i].id,
              price: data[i].price,
              discription: data[i].description,
              categary: data[i].categary,
              createdAt: data[i].createdAt,
            });
          }
          dispatch(expenseActions.chartAdd(flist));
        });
        ctx.loaderHandler();
      } else {
        res.json().then((data) => {
          ctx.loaderHandler();
          alert(data.error.message);
        });
      }
    });
  }

  useEffect(fetchList, [dispatch, token]);
  return (
    <>
      <Header></Header>
      {ctx.loader && <Loader />}
      <Switch>
        <Route path="/" exact>
          <Redirect to={authorised ? "welcome" : "auth"} />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/forgot-password">
          <ForgotPass />
        </Route>
        {authorised && (
          <Route path="/welcome">
            <Layout />
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
