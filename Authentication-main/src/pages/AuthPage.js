import { useState } from "react";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const [isLoading, setLoading] = useState(false);
  async function onSubmitHandler(a, b) {
    setLoading(true);
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "Post",
        body: JSON.stringify({
          email: a,
          password: b,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          alert(data.error.message);
        });
      } else {
        console.log(res);
      }
    });
    setLoading(false);
  }
  async function onCreateHandler(a, b) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
        {
          method: "Post",
          body: JSON.stringify({
            email: a,
            password: b,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        let errorMessage = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      }
    } catch (e) {}
    setLoading(false);
  }
  return (
    <AuthForm
      isLoading={isLoading}
      onSubmit={onSubmitHandler}
      onCreate={onCreateHandler}
    />
  );
};

export default AuthPage;
