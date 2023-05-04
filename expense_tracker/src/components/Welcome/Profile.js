import React, { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { GiEarthAfricaEurope } from "react-icons/gi";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DataContext from "../../Store/data-context";
import { useState } from "react";
import { useEffect } from "react";

function Profile(props) {
  const ctx = useContext(DataContext);
  const [enteredName, setEnteredName] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");

  function nameChangeHandler(e) {
    setEnteredName(e.target.value);
  }
  function urlChangeHandler(e) {
    setEnteredUrl(e.target.value);
  }

  function profileUpdateHandler(e) {
    e.preventDefault();
    ctx.loaderHandler();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.authorisation.idToken,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.loaderHandler();
          alert(
            "Profile updeted successfully, if you want to edit the profile then edit and again submit the data"
          );
          ctx.profileHandler();
        });
      } else {
        res.json().then((data) => {
          ctx.loaderHandler();
          alert(data.error.message);
        });
      }
    });
  }
  function setData() {
    setEnteredName(ctx.profile.name);
    setEnteredUrl(ctx.profile.url);
  }

  useEffect(setData, [ctx.profile]);

  return (
    <Container fluid className="p-2">
      {/* <Row style={{ height: "4rem" }}></Row> */}
      <Row>
        <Col sm={2}></Col>
        <Col sm={9} className="p-3" style={{ boxShadow: "0 0 5px black" }}>
          <Row className="m-1">
            <Col>
              <h6>Contact Details</h6>
            </Col>
            <Col style={{ textAlign: "end" }}>
              <Link to="/welcome">
                <Button
                  size="sm"
                  // style={{ width: "5rem" }}
                  variant="outline-danger"
                >
                  Cancel
                </Button>
              </Link>
            </Col>
          </Row>
          <Form onSubmit={profileUpdateHandler}>
            <Row className="m-1" style={{ fontSize: "0.8rem" }}>
              <Col>
                <FormLabel>
                  <AiFillGithub /> Full Name:
                </FormLabel>
              </Col>
              <Col sm={4}>
                <FormControl
                  onChange={nameChangeHandler}
                  value={enteredName}
                  style={{ height: "2rem" }}
                ></FormControl>
              </Col>
              <Col>
                <FormLabel>
                  <GiEarthAfricaEurope />
                  Photo URL:
                </FormLabel>
              </Col>
              <Col sm={4}>
                <FormControl
                  onChange={urlChangeHandler}
                  value={enteredUrl}
                  style={{ height: "2rem" }}
                ></FormControl>
              </Col>
            </Row>
            <Row className="m-1">
              <Col>
                <Button
                  onClick={profileUpdateHandler}
                  size="sm"
                  style={{ width: "5rem" }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
