import React, { useContext, useRef } from "react";
import logo from "../../images/lightning_sewer.webp";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Container,
  Form,
  FormControl,
  FormLabel,
  Col,
  Row,
  Image,
} from "react-bootstrap";
import DataContext from "../../Store/data-context";

// try {
//   const res = await axios.post("http://localhost:3000/auth/forgot", {
//     email: e.target.email.value,
//   });
//   console.log(res.data);
//   alert("Link Sent Successfully....");
//   document.getElementById("fpp").checked = true;
// } catch (err) {
//   console.log(err);
//   alert("Email couldn't Sent...");
// }

function ForgotPass() {
  const ctx = useContext(DataContext);
  const history = useHistory();
  const emailRef = useRef();
  function submitFormHandler(e) {
    e.preventDefault();
    console.log(emailRef.current.value);
    ctx.loaderHandler();
    fetch("http://localhost:3000/auth/forgot", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          console.log(data);
          alert(data.err);
          ctx.loaderHandler();
        });
      } else {
        alert("change password link sent successfully");
        ctx.loaderHandler();
        history.push("/auth");
      }
    });
  }
  return (
    <div
      style={{
        backgroundColor: "#0b3738",
        height: "41rem",
        justifyContent: "center",
      }}
    >
      <Container style={{ height: "2rem" }}></Container>
      <Container
        style={{
          textAlign: "center",
          width: "20rem",
          justifyContent: "center",
        }}
      >
        <Col sm={12}>
          <Row
            className="p-1"
            style={{ justifyContent: "center", color: "white" }}
          >
            <Image
              src={logo}
              roundedCircle
              style={{ height: "4rem", width: "7rem" }}
            />
            <h3 className="p-3" style={{ borderBottom: "2px solid black" }}>
              Expense tracker app
            </h3>
          </Row>
          <Form onSubmit={submitFormHandler}>
            <FormLabel
              style={{
                padding: ".5rem",
                marginTop: "1.5rem",
                color: "white",
              }}
            >
              Enter your email with which you have resistered.
            </FormLabel>
            <FormControl
              type="email"
              placeholder="email"
              style={{
                padding: ".5rem",
                marginTop: "1.5rem",
                backgroundColor: "black",
                color: "white",
              }}
              ref={emailRef}
            />

            <button
              onClick={submitFormHandler}
              style={{
                backgroundColor: "aqua",
                width: "100%",
                borderRadius: "1.5rem",
                border: "0px solid aqua",
                padding: ".5rem",
                marginTop: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Send Link
            </button>
            <Link to="/auth"> New here? Signup</Link>
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default ForgotPass;
