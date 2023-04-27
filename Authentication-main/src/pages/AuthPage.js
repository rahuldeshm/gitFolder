import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import AuthForm from "../components/Auth/AuthForm";
import { useHistory } from "react-router-dom";

const AuthPage = () => {
  const histry = useHistory();
  const ctx = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  async function onSubmitHandler(a, b, c) {
    setLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY";
    if (!c) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY";
    }
    await fetch(url, {
      method: "Post",
      body: JSON.stringify({
        email: a,
        password: b,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          alert(data.error.message);
        });
      } else {
        res.json().then((data) => {
          ctx.storeAuthorisation(data.idToken);
          localStorage.setItem("login", data.idToken);
          histry.push("/");
        });
      }
    });
    setLoading(false);
  }

  return <AuthForm isLoading={isLoading} onSubmit={onSubmitHandler} />;
};

export default AuthPage;
