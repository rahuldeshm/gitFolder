import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCaretLeft } from "react-icons/ai";
import NameEmail from "./NameEmail";

function SentMails(props) {
  const sent = useSelector((state) => state.mail.sent);
  let arrs = [];
  if (!!sent) {
    const keys = Object.keys(sent);
    for (let i = keys.length - 1; i > -1; i--) {
      const withkey = { ...sent[keys[i]], id: keys[i], to: true };
      arrs.push(withkey);
    }
  }
  return (
    <div
      style={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <h3
        style={{
          textAlign: "end",
          paddingLeft: "0.5rem",
          borderBottom: "1px solid #ccc",
          backgroundColor: "rgb(46, 17, 75)",
        }}
      >
        SentMails
        <AiOutlineCaretLeft onClick={props.onClick} />
      </h3>
      {arrs.map((e) => {
        return <NameEmail key={e.subject} e={e} />;
      })}
    </div>
  );
}

export default SentMails;
