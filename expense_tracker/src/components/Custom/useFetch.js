import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expenseSlice";
import DataContext from "../../Store/data-context";

function useFetch() {
  const list = useSelector((state) => state.expense.list);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.authorisation);
  async function fetchList(page) {
    try {
      const res = await fetch(
        `http://localhost:3000/expense/expenses?page=${page}`,
        {
          method: "GET",
          headers: {
            authorisation: token.idToken,
            "Content-Type": "application/json",
          },
        }
      );

      const alldata = await res.json();
      console.log(alldata);
      const data = alldata.rows;
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const keys = Object.keys(data);
      const flist = [];
      for (let i of keys) {
        flist.push({
          id: data[i].id,
          price: data[i].price,
          discription: data[i].description,
          categary: data[i].categary,
          createdAt: data[i].createdAt,
        });
      }
      dispatch(expenseActions.addList(flist));
      dispatch(
        expenseActions.setPageData({
          currentPage: alldata.currentPage,
          totalPages: alldata.totalPages,
        })
      );
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return [list, fetchList];
}
export default useFetch;
