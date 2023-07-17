import React, { useState } from "react";
import classes from "./MainButtons.module.css";
import { IoMdAddCircle } from "react-icons/io";
import { MdDownloadForOffline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaCrown } from "react-icons/fa";
import Profile from "../Welcome/Profile";
function MainButtons() {
  const [profile, setProfile] = useState(false);
  return (
    <>
      <div className={classes.mainbuttons}>
        <div className={classes.style}>
          <IoMdAddCircle className={classes.icon} size={100} />
          <p>Add Expense</p>
        </div>
        <div className={classes.style} onClick={() => setProfile(!profile)}>
          <CgProfile className={classes.icon} size={100} />
          <p>Profile</p>
        </div>
        <div className={classes.style}>
          <FaCrown className={classes.icon} size={90} />
          <p>Get Primium</p>
        </div>
        <div className={classes.style}>
          <MdDownloadForOffline className={classes.icon} size={100} />
          <p>Report</p>
        </div>
      </div>
      {profile && <Profile onClick={() => setProfile(!profile)} />}
    </>
  );
}

export default MainButtons;
