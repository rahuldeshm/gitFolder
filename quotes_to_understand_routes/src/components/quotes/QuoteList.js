import { Fragment, useState } from "react";
import LoadingSpinner from "./../UI/LoadingSpinner";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.author > quoteB.author ? 1 : -1;
    } else {
      return quoteA.author < quoteB.author ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortingASC = queryParams.get("sort") === "ASC";
  const history = useHistory();

  function changeSortHandler() {
    history.push(`${location.pathname}?sort=${sortingASC ? "DEC" : "ASC"}`);
  }
  let quotesort = sortQuotes(props.quotes, sortingASC);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {sortingASC ? "Decending" : "Ascending"}
        </button>
      </div>
      {props.isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <ul className={classes.list}>
        {quotesort.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
