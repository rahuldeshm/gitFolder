import React from "react";
import { useSelector } from "react-redux";
import NameEmail from "./NameEmail";

function SentMails() {
  const sent = useSelector((state) => state.mail.sentMails);
  console.log(sent);
  return (
    <div>
      <h3>Sent Mails</h3>
      {sent.map((e) => {
        return <NameEmail key={e.subject} e={e} to={true} />;
      })}
    </div>
  );
}

export default SentMails;
