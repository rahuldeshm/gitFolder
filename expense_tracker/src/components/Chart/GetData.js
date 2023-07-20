import React, { useState } from "react";
import MainData from "./MainData";
import { useSelector } from "react-redux";
import { FormSelect } from "react-bootstrap";
const monthValues = [
  { label: "Jan", value: 0 },
  { label: "Feb", value: 0 },
  { label: "Mar", value: 0 },
  { label: "Apr", value: 0 },
  { label: "May", value: 0 },
  { label: "Jun", value: 0 },
  { label: "Jul", value: 0 },
  { label: "Aug", value: 0 },
  { label: "Sep", value: 0 },
  { label: "Oct", value: 0 },
  { label: "Nov", value: 0 },
  { label: "Dec", value: 0 },
];

function GetData() {
  const [type, setType] = useState("Monthly");
  const UserData = useSelector((state) => state.expense.list);
  const dayValues = [];
  const days = {};
  const currentDate = new Date();
  const last = new Date();
  last.setDate(currentDate.getDate() - 11);
  for (let i = 11; i >= 0; i--) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    days[previousDate.getDate()] = 0;
  }
  const lasttwomonth = [];
  for (let expense of UserData) {
    const expenseMonth = new Date(expense.createdAt).getMonth();
    monthValues[expenseMonth].value += parseInt(expense.price);
    if (new Date(expense.createdAt) >= last) {
      lasttwomonth.push(expense);
    }
  }
  lasttwomonth.forEach((e) => {
    days[new Date(e.createdAt).getDate()] += parseInt(e.price);
  });
  const keys = Object.keys(days);
  for (let key of keys) {
    dayValues.push({ label: key, value: days[key] });
  }
  return (
    <div
      style={{
        width: "100%",
        padding: "7px",
        height: "fit-content",
        position: "relative",
        marginTop: "9px",
      }}
    >
      <FormSelect
        value={type}
        size="sm"
        placeholder="ca"
        onChange={(e) => setType(e.target.value)}
      >
        <option>Monthly</option>
        <option>Daily</option>
      </FormSelect>
      <MainData values={type === "Monthly" ? monthValues : dayValues} />
    </div>
  );
}

export default GetData;
