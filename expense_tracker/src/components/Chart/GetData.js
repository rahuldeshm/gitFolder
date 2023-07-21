import React from "react";
import MainData from "./MainData";
import { useSelector } from "react-redux";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function GetData() {
  const UserData = useSelector((state) => state.expense.chartlist);
  const dayValues = [];
  const days = {};
  const currentDate = new Date();
  const last = new Date();
  last.setDate(currentDate.getDate() - 11);
  for (let i = 11; i >= 0; i--) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    days[`${previousDate.getDate()} ${months[previousDate.getMonth()]}`] = 0;
  }
  const lasttwomonth = [];
  for (let expense of UserData) {
    if (new Date(expense.createdAt) >= last) {
      lasttwomonth.push(expense);
    }
  }
  lasttwomonth.forEach((e) => {
    days[
      `${new Date(e.createdAt).getDate()} ${
        months[new Date(e.createdAt).getMonth()]
      }`
    ] += parseInt(e.price);
  });
  const keys = Object.keys(days);
  for (let key of keys) {
    dayValues.push({ label: key, value: days[key] });
  }
  return (
    <div
      style={{
        width: "100%",
        minHeight: "19rem",
        padding: "7px",
      }}
    >
      <MainData values={dayValues} />
    </div>
  );
}

export default GetData;
