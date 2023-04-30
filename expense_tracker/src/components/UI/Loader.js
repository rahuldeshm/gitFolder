import React from "react";
import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes.overlay}>
      <h1>Loading...</h1>
    </div>
  );
}

export default Loader;
