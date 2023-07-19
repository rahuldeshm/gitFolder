import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Leaderboard.module.css";
import { Table } from "react-bootstrap";

function Leaderboard() {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.authorisation);
  function fetchleaderbord() {
    fetch("http://localhost:3000/premium/leaderboard", {
      method: "GET",
      headers: { authorisation: token.idToken },
    })
      .then((response) => {
        // data=response;
        response.json().then((data) => {
          if (response.ok) {
            setData(data);
          }
        });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(fetchleaderbord, [token.idToken]);
  return (
    <div className={classes.leader}>
      <h4>Leader Board</h4>
      <Table striped hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => {
            return (
              <tr key={e.username}>
                <td>{index + 1} </td>
                <td>{e.username}</td>
                <td>{e.total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Leaderboard;
