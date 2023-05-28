import React, { useState } from "react";
const url = "https://quotes-f721a-default-rtdb.firebaseio.com/";
function useFetch() {
  const [data, setData] = useState({ data: [], status: "pending" });
  async function getData(payload) {
    console.log("started fetching");
    try {
      const res = await fetch(`${url}${payload}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw "Some Error Occured Whils fetching data";
      }
      const data = await res.json();

      const arr = [];
      for (let key of Object.keys(data)) {
        arr.push({ ...data[key], id: key });
      }
      console.log(arr);
      setData({ data: arr, status: "success" });
    } catch (err) {
      alert(err.message);
    }
  }
  return [data, getData];
}

export default useFetch;
