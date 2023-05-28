import { Link } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./NoQuotesFound.module.css";

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <Link to="/new-Quote" className="btn">
        Add a Quote
      </Link>
    </div>
  );
};

export default NoQuotesFound;
