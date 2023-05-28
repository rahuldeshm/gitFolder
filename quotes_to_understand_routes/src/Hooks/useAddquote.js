import React, { useState } from "react";

const FIREBASE_DOMAIN = "https://quotes-f721a-default-rtdb.firebaseio.com/";

function useAddquote() {
  const [data, setData] = useState({ status: "open" });
  function useHttp(payload) {
    console.log("usehttp runned");
    setData({ quotedata: payload.quotedata, status: "pending" });
    fetch(`${FIREBASE_DOMAIN}quotes.json`, {
      method: "POST",
      body: JSON.stringify(payload.quotedata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setData({ quotedata: "", status: "success" });
      } else alert("some error occured");
    });
  }
  return [data, useHttp];
}

export default useAddquote;
