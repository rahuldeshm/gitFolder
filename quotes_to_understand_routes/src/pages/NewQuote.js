import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "./../components/quotes/QuoteForm";
import useAddquote from "../Hooks/useAddquote";

const NewQuote = () => {
  const [data, setData] = useAddquote();
  const history = useHistory();
  const { status } = data;
  useEffect(() => {
    console.log("useEffect of new quote");
    if (status === "success") {
      history.push("/quotes");
    }
  }, [status]);
  function addQuote(quotedata) {
    console.log(quotedata);
    setData({ quotedata, status: "pending" });
  }
  return <QuoteForm isLoading={status === "pending"} onAddQuote={addQuote} />;
};

export default NewQuote;
