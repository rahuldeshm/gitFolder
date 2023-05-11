import React from "react";
import { Image } from "react-bootstrap";
import classes from "./NameEmail.module.css";
import { useDispatch } from "react-redux";
import { currentActions } from "../../Store/currentSlice";
import { mailActions } from "../../Store/mailSlice";

function NameEmail(props) {
  const dispatch = useDispatch();
  function showMailHandler() {
    dispatch(currentActions.addCurrent(props.e));
    !props.to && dispatch(mailActions.setNewToFalse(props.e.id));
  }
  return (
    <>
      <div onClick={showMailHandler} className={classes.main}>
        {!props.to && (
          <div className={classes.pic}>
            {props.e.new && <div></div>}

            <Image
              src={
                !!props.e.profilePicture
                  ? props.e.profilePicture
                  : "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              roundedCircle
            />
          </div>
        )}
        <div
          className={classes.details}
          style={!props.to ? { paddingLeft: "0rem" } : { paddingLeft: "1rem" }}
        >
          <h5>{props.e.subject}</h5>
          <p>{`${props.to ? "Sent to" : "Received from"}: ${props.e.email}`}</p>
        </div>
      </div>
    </>
  );
}

export default NameEmail;
