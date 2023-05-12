import classes from "./NewEmail.module.css";
import { useState } from "react";
import EditorBlock from "./EditorBlock";
import { Button, FormLabel, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../Store/uiSlice";
import { mailActions } from "../../Store/mailSlice";

function NewEmail() {
  const dispatch = useDispatch();
  const authorisation = useSelector((state) => state.auth.authorisation);
  const mymail = authorisation.email;
  const profilePicture = !!authorisation.profilePicture
    ? authorisation.profilePicture
    : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80";
  const [editorValue, setEditorValue] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  function editorValueHandler(value) {
    setEditorValue(value);
  }

  function sendMailHandler(e) {
    const myemaild = mymail.replace("@", "").replace(".", "");
    const emailwithoutd = email.replace("@", "").replace(".", "");

    fetch(
      `https://mailbox-de8bb-default-rtdb.asia-southeast1.firebasedatabase.app/${emailwithoutd}/received.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: mymail,
          subject,
          editorValue,
          new: true,
          profilePicture,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(`Mail Sent to ${email} successfully...!`);
        fetch(
          `https://mailbox-de8bb-default-rtdb.asia-southeast1.firebasedatabase.app/${myemaild}/sent.json`,
          {
            method: "POST",
            body: JSON.stringify({ email, subject, editorValue }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            dispatch(uiActions.loaderHandler());
            res.json().then((data) => {
              console.log(data);
              dispatch(
                mailActions.addNewMail({
                  id: data.name,
                  newm: { email, subject, editorValue },
                })
              );
            });
            alert("email stored in sendbox and sent successfully");
          } else {
            alert("some error occurred");
          }
        });
      } else {
        alert("some error occurred");
      }
    });
  }

  return (
    <>
      <div className={classes.overlay}></div>
      <div className={classes.modal}>
        <button
          onClick={() => dispatch(uiActions.loaderHandler())}
          className={classes.exitbtn}
        >
          x
        </button>
        <InputGroup className={classes.to}>
          <FormLabel>To:</FormLabel>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </InputGroup>
        <div className={classes.title}>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="subject"
          />
        </div>
        <EditorBlock setEditorValue={editorValueHandler} />
        <Button onClick={sendMailHandler}>send</Button>
      </div>
    </>
  );
}

export default NewEmail;
