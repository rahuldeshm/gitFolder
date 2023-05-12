import React from "react";
import { useSelector } from "react-redux";
import NameEmail from "./NameEmail";
import { AiOutlineCaretLeft } from "react-icons/ai";

function ReceivedMails(props) {
  const received = useSelector((state) => state.mail.received);
  let arr = [];
  if (!!received) {
    const keys = Object.keys(received);
    for (let i = keys.length - 1; i > -1; i--) {
      const withkey = { ...received[keys[i]], id: keys[i] };
      arr.push(withkey);
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
        Inbox
        <AiOutlineCaretLeft onClick={props.onClick} />
      </h3>
      {arr.map((e) => {
        return <NameEmail key={e.id} e={e} />;
      })}
    </div>
  );
}

export default ReceivedMails;
