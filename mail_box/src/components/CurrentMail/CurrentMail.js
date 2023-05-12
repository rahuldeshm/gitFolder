import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store/mailSlice";

function CurrentMail() {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current.current);
  const available = !!current.editorValue;
  function deleteHandler() {
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
          {!!!current.dummy && <p>{current.editorValue.blocks[0].text}</p>}
          {!!!current.dummy && (
            <Button onClick={deleteHandler} variant="danger">
              Delete mail
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default CurrentMail;
