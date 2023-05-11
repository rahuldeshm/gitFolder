import React from "react";
import { useSelector } from "react-redux";
import NameEmail from "./NameEmail";

function SentMails() {
  const sent = useSelector((state) => state.mail.sent);
  let arrs = [];
  if (!!sent) {
    const keyssent = Object.keys(sent);
    for (let key of keyssent) {
      arrs.push(sent[key]);
    }
  }
  return (
    <div>
      <h3
        style={{
          backgroundColor: "rgb(46, 17, 75)",
          paddingLeft: "0.5rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        Sent Mails
      </h3>
      {arrs.map((e) => {
        return <NameEmail key={e.subject} e={e} to={true} />;
      })}
    </div>
  );
}

export default SentMails;
