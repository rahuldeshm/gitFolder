import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const enteredPasswordRef = useRef();
  const ctx = useContext(AuthContext);
  const history = useHistory();
  function submitHandler(e) {
    e.preventDefault();
    const pass = enteredPasswordRef.current.value;
    // add valid

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.authorisation,
          password: pass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        history.push("/auth");
        ctx.storeAuthorisation(null);
        console.log("password Changed Successfully");
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={enteredPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
