import React, { useState } from "react";
import classes from "./MainButtons.module.css";
import { IoMdAddCircle } from "react-icons/io";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Profile from "../Welcome/Profile";
import NewExpense from "../Expense/NewExpense";
import { useSelector } from "react-redux";
import Premium from "./Premium";
function MainButtons() {
  const [profile, setProfile] = useState(false);
  const auth = useSelector((state) => state.auth.authorisation);
  const [add, setAdd] = useState(false);
  const verified = auth.verified && !!auth.phone;
  return (
    <>
      <div className={classes.mainbuttons}>
        <div onClick={() => setAdd(!add)} className={classes.style}>
          <IoMdAddCircle className={classes.icon} size={100} />
          <p>Add Expense</p>
        </div>
        <div className={classes.style} onClick={() => setProfile(!profile)}>
          {verified ? (
            <BsFillCheckCircleFill className={classes.icons} size={75} />
          ) : (
            <CgProfile className={classes.icon} size={100} />
          )}
          <p>Profile</p>
        </div>
        <Premium />
        <div className={classes.style}>
          <MdDownloadForOffline className={classes.icon} size={100} />
          <p>Report</p>
        </div>
      </div>
      {profile && <Profile onClick={() => setProfile(!profile)} />}
      {add && <NewExpense onClick={() => setAdd(!add)} />}
    </>
  );
}

export default MainButtons;
