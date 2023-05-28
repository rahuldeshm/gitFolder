import { Fragment, useEffect } from "react";
import { useParams, Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { Link, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../Hooks/useFetch";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const [Dummy, getQuotes] = useFetch();
  useEffect(() => {
    async function getquo() {
      getQuotes("quotes");
    }
    getquo();
  }, []);
  const quote = Dummy.data.find((quote) => quote.id === params.quoteId);

  return (
    <Fragment>
      {!!quote && <HighlightedQuote text={quote.text} author={quote.author} />}
      {Dummy.status === "pending" && (
        <HighlightedQuote isLoading={true} text="" author="" />
      )}
      <Route path={match.url} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.url}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
