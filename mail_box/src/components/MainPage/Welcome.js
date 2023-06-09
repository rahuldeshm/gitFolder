import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./Welcome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../Store/uiSlice";
import ReceivedMails from "../Mails/ReceivedMails";
import Profile from "./Profile";
import SentMails from "../Mails/SentMails";
import CurrentMail from "../CurrentMail/CurrentMail";

function Welcome() {
  const dispatch = useDispatch();
  const no = useSelector((state) => state.mail.noofnew);
  const [inbox, setInbox] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <div className={classes.container}>
      <Col sm={3} className={classes.profile}>
        <div style={{ height: "auto", borderBottom: "1px solid #ccc" }}>
          <Profile />
        </div>
        <Row>
          <div style={{ height: "13rem", padding: "2rem" }}>
            <p style={{ width: "100%" }}>
              &nbsp; &emsp; This is mail box here you can create account and
              start messaging to those who are already on this platfrom or
              invite them.
            </p>
          </div>
          <div style={{ height: "auto", borderbottom: "1px solid #ccc" }}>
            <button onClick={() => dispatch(uiActions.newMailHandler())}>
              compose
            </button>
            <button
              style={
                no > 0
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "rgb(46, 17, 75)" }
              }
              onClick={() => {
                setInbox(true);
                setSent(false);
              }}
            >
              inbox{no > 0 ? <div>{no}</div> : ""}
            </button>
            <button
              onClick={() => {
                setInbox(false);
                setSent(true);
              }}
            >
              Sent
            </button>
          </div>
          <div style={{ height: "1.6rem" }} />
        </Row>
      </Col>
      {(inbox || sent) && (
        <Col sm={3} className={classes.mails}>
          {inbox && (
            <ReceivedMails
              onClick={() => {
                setInbox(false);
                setSent(false);
              }}
            />
          )}
          {sent && (
            <SentMails
              onClick={() => {
                setInbox(false);
                setSent(false);
              }}
            />
          )}
        </Col>
      )}
      <Col sm={inbox || sent ? 6 : 9} className={classes.mail}>
        <CurrentMail />
      </Col>
    </div>
  );
}

export default Welcome;
