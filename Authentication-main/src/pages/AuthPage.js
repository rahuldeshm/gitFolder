import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  async function onSubmitHandler(a, b) {
    try {
      const res = await fetch(
        "https://react-http-c1852-default-rtdb.asia-southeast1.firebasedatabase.app/userData.son",
        {
          method: "Post",
          body: JSON.stringify({ email: a, pass: b }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch {
      console.log("something went wrong");
    }
  }
  async function onCreateHandler(a, b) {
    try {
      const res = await fetch(
        "https://react-http-c1852-default-rtdb.asia-southeast1.firebasedatabase.app/userData.son",
        {
          method: "Post",
          body: JSON.stringify({ email: a, pass: b }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (e) {
      alert("Entered Email already Exists");
    }
  }
  return <AuthForm onSubmit={onSubmitHandler} onCreate={onCreateHandler} />;
};

export default AuthPage;
