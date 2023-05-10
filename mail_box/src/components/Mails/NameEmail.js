import React from "react";
import classes from "./NameEmail.module.css";

function NameEmail(props) {
  return (
    <div className={classes.main}>
      <button>
        <h4>{props.e.subject}</h4>
        <p>{`${props.to ? "Sent to" : "Received from"}: ${props.e.email}`}</p>
      </button>
    </div>
  );
}

export default NameEmail;
