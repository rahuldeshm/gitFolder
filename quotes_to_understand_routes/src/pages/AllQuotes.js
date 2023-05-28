import React, { useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import QuoteList from "../components/quotes/QuoteList";

const AllQuotes = () => {
  const [quotes, getQuotes] = useFetch();
  useEffect(() => {
    async function getquo() {
      getQuotes("quotes");
    }
    getquo();
  }, []);

  return (
    <QuoteList
      isLoading={quotes.status === "pending"}
      quotes={quotes.data}
    ></QuoteList>
  );
};

export default AllQuotes;
