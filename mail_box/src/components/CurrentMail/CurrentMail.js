import React from "react";
import { useSelector } from "react-redux";

function CurrentMail() {
  const current = useSelector((state) => state.current.current);
  return <div>{`${current.subject} from ${current.email}`}</div>;
}

export default CurrentMail;
