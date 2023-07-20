import React from "react";
import Modal from "../UI/Modal";
import classes from "./summery.module.css";
import { MdBackup } from "react-icons/md";
import Download from "./Download";
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
function Summery(props) {
  const list = useSelector((state) => state.expense.list);
  const currentDate = new Date();
  const last = new Date();
  last.setDate(currentDate.getDate() - 30);
  return (
    <Modal onClick={props.onClick}>
      <div class={classes.maindiv}>
        <button class="border-primary bg-primary">
          Download .txt
          <MdBackup size={20} />
        </button>
        <Download />
        <h4>Day to Day expense</h4>
        <h5>{`${months[last.getMonth()]}   ${last.getFullYear()} `}</h5>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Discription</th>
              <th>Category</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => {
              if (new Date(e.createdAt) > last) {
                return (
                  <tr key={`${e.id}s`}>
                    <td>{e.discription}</td>
                    <td>{e.categary}</td>
                    <td>{e.price}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default Summery;
