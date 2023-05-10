import React from "react";
import { useSelector } from "react-redux";
import NameEmail from "./NameEmail";

function ReceivedMails() {
  const received = useSelector((state) => state.mail.receivedMails);
  console.log(received);
  return (
    <div>
      <h3>Inbox</h3>
      {received.map((e) => {
        return <NameEmail key={e.subject} e={e} to={false} />;
      })}
    </div>
  );
}

export default ReceivedMails;
