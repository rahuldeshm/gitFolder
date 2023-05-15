import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/mailSlice";
import { currentActions } from "../../Store/currentSlice";

function CurrentMail() {
  const dispatch = useDispatch();
  const authorisation = useSelector((state) => state.auth.authorisation);
  const current = useSelector((state) => state.current.current);
  const available = !!current.editorValue;
  function deleteHandler() {
    dispatch(currentActions.removeCurrent());
    dispatch(mailActions.deleteMail({ id: current.id, to: current.to }));
  }

  return (
    <>
      {available && (
        <div style={{ padding: "1rem" }}>
          {!!!current.to && (
            <img
              style={{
                objectFit: "cover",
                borderRadius: "1.5rem",
                width: "3rem",
                height: "3rem",
              }}
              src={current.profilePicture}
            />
          )}
          <h2>{current.subject}</h2>
          <p>{current.email}</p>
          <p>{current.editorValue.blocks[0].text}</p>

          <Button onClick={deleteHandler} variant="danger">
            Delete mail
          </Button>
        </div>
      )}
      {!available && (
        <div style={{ paddingTop: "7rem", textAlign: "center" }}>
          <img
            style={{
              objectFit: "cover",
              borderRadius: "5rem",
              width: "10rem",
              height: "10rem",
            }}
            src={authorisation.profilePicture}
          />
          <h2>Name: {authorisation.displayName}</h2>
          <p>Mail: {authorisation.email}</p>
          <p>Press "compose" to compose Mail and send.</p>
          <p>Press "index" to see your received Mails.</p>
          <p>Press "Sent" to see the mails you sent.</p>
        </div>
      )}
    </>
  );
}

export default CurrentMail;
