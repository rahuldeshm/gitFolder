import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./summery.module.css";
import { MdBackup } from "react-icons/md";
import Download from "./Download";
import { useSelector } from "react-redux";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
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
const currentDate = new Date();
const last = new Date();
last.setDate(currentDate.getDate() - 30);
function Summery(props) {
  const [downloadlist, setDownloadlist] = useState([]);
  const token = useSelector((state) => state.auth.authorisation);
  const list = useSelector((state) => state.expense.list);
  async function fetchDownload() {
    try {
      const resp = await fetch("http://localhost:3000/premium/download", {
        method: "GET",
        headers: {
          authorisation: token.idToken,
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error("Something went wrong.");
      }
      console.log(data);
      const a = document.createElement("a");
      a.download = "myexpense.txt";
      a.href = data.fileUrl;
      a.click();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("http://localhost:3000/premium/downloaded", {
          method: "GET",
          headers: {
            authorisation: token.idToken,
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error("Something went wrong.");
        }
        console.log(data);
        setDownloadlist(data);
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    };

    fetchData();
  }, []);
  return (
    <Modal onClick={props.onClick}>
      <div className={classes.maindiv}>
        <button onClick={fetchDownload} className="border-primary bg-primary">
          Download .txt
          <MdBackup size={20} />
        </button>
        <Download />
        <div className={classes.downloaded}>
          Previous Downloads <BsFillArrowRightSquareFill size={20} />
          {downloadlist.map((e) => {
            return (
              <a href={e.url} download={`some.txt`} key={`${e.id}links`}>
                <button className="border-primary bg-primary">{`${new Date(
                  e.createdAt
                ).getDate()} ${
                  months[new Date(e.createdAt).getMonth()]
                }`}</button>
              </a>
            );
          })}
        </div>
        <h4>Day to Day expense</h4>
        <h5>
          {`${last.getDate()} ${
            months[last.getMonth()]
          }   ${last.getFullYear()}`}
          <BsFillArrowRightSquareFill size={20} />
          {`${currentDate.getDate()} ${
            months[currentDate.getMonth()]
          } ${currentDate.getFullYear()}`}
        </h5>

        <table className="table table-striped table-hover">
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
