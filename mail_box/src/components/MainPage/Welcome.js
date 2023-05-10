import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./Welcome.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../Store/uiSlice";
import ReceivedMails from "../Mails/ReceivedMails";
import SentMails from "../Mails/SentMails";

function Welcome() {
  const dispatch = useDispatch();
  const [inbox, setInbox] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <div className={classes.container}>
      <Col sm={3} className={classes.profile}>
        <div style={{ height: "24rem", borderBottom: "1px solid #ccc" }}></div>
        <Row>
          <div style={{ height: "auto", borderbottom: "1px solid #ccc" }}>
            <button onClick={() => dispatch(uiActions.loaderHandler())}>
              compose
            </button>
            <button onClick={() => setInbox(!inbox)}>Inbox</button>
            <button onClick={() => setSent(!sent)}>Sent</button>
          </div>
        </Row>
      </Col>
      {(inbox || sent) && (
        <Col sm={3} className={classes.mails}>
          {inbox && <ReceivedMails />}
          {sent && <SentMails />}
        </Col>
      )}
      <Col sm={inbox ? 6 : 9} className={classes.mail}>
        <p>mail will come here </p>
      </Col>
    </div>
  );
}

export default Welcome;
