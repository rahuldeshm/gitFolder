import classes from "./NewEmail.module.css";
import { useState } from "react";
import EditorBlock from "./EditorBlock";
import { Button, FormLabel, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function NewEmail() {
  const mymail = useSelector((state) => state.auth.authorisation.email);

  const [editorValue, setEditorValue] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  function editorValueHandler(value) {
    setEditorValue(value);
  }

  function sendMailHandler(e) {
    const myemaild = mymail.replace("@", "").replace(".", "");
    console.log(myemaild);
    const emailwithout = email.replace("@", "");
    const emailwithoutd = emailwithout.replace(".", "");

    fetch(
      `https://mailbox-de8bb-default-rtdb.asia-southeast1.firebasedatabase.app/${emailwithoutd}/received.json`,
      {
        method: "POST",
        body: JSON.stringify({ email, subject, editorValue }),
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
            alert("email stored in sendbox and sent successfully");
          }
        });
      }
    });
  }

  return (
    <>
      <div className={classes.overlay}></div>
      <div className={classes.modal}>
        <Link to="/welcome">
          <button className={classes.exitbtn}>x</button>
        </Link>
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
