import classes from "./HighlightedQuote.module.css";
import LoadingSpinner from "./../UI/LoadingSpinner";

const HighlightedQuote = (props) => {
  return (
    <>
      <figure className={classes.quote}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <p>{props.text}</p>
        <figcaption>{props.author}</figcaption>
      </figure>
    </>
  );
};

export default HighlightedQuote;
