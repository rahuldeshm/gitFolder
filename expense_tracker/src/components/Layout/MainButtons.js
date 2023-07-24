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
import Summery from "../Summery/Summery";
function MainButtons() {
  const [profile, setProfile] = useState(false);
  const auth = useSelector((state) => state.auth.authorisation);
  const edit = useSelector((state) => state.editexpense.edit);
  const [add, setAdd] = useState(false);
  const [summ, setSumm] = useState(false);
  const verified = auth.verified && !!auth.phone;
  return (
    <>
      <div className={classes.mainbuttons}>
        <div onClick={() => setAdd(!add)} className={classes.style}>
          <IoMdAddCircle className={classes.icon} size={100} />
          <p>Add Expense</p>
        </div>
        <div
          className={verified ? classes.astyle : classes.style}
          onClick={() => setProfile(!profile)}
        >
          {verified ? (
            <BsFillCheckCircleFill className={classes.icons} size={75} />
          ) : (
            <CgProfile className={classes.icon} size={100} />
          )}
          <p>Profile</p>
        </div>
        <Premium />
        <div className={classes.style} onClick={() => setSumm(!summ)}>
          <MdDownloadForOffline className={classes.icon} size={100} />
          <p>Report</p>
        </div>
      </div>
      {profile && <Profile onClick={() => setProfile(!profile)} />}
      {(edit || add) && <NewExpense onClick={() => setAdd(!add)} />}
      {summ && <Summery onClick={() => setSumm(!summ)} />}
    </>
  );
}

export default MainButtons;
