import React, { useContext } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import Welcome from "./Welcome";
import DataContext from "../../Store/data-context";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../Store/profileSlice";
import Modal from "../UI/Modal";

function Profile(props) {
  const dispatch = useDispatch();
  const pname = useSelector((state) => state.profile.name);
  const url = useSelector((state) => state.profile.url);
  const authorisation = useSelector((state) => state.auth.authorisation);
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

    fetch("http://localhost:3000/profile/update", {
      method: "POST",
      body: JSON.stringify({
        username: enteredName,
        phone: enteredUrl,
      }),
      headers: {
        authorisation: authorisation.idToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.loaderHandler();
          console.log(data);
          dispatch(
            profileActions.setProfile({ name: enteredName, phone: enteredUrl })
          );
          alert(
            "Profile updeted successfully, if you want to edit the profile then edit and again submit the data"
          );
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
    setEnteredName(pname);
    setEnteredUrl(url);
  }

  useEffect(setData, [pname, url]);

  return (
    <Modal onClick={props.onClick}>
      <Container fluid className="p-2">
        {/* <Row style={{ height: "4rem" }}></Row> */}
        <Row>
          <Col sm={2}>
            <Welcome />
          </Col>
          <Col sm={10} className="p-3" style={{ boxShadow: "0 0 5px black" }}>
            <Row className="m-1">
              <Col>
                <h6>Contact Details</h6>
              </Col>
              <Col style={{ textAlign: "end" }}>
                <Button
                  size="sm"
                  onClick={props.onClick}
                  variant="outline-danger"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
            <Form onSubmit={profileUpdateHandler}>
              <Row className="m-1" style={{ fontSize: "0.8rem" }}>
                <Col>
                  <FormLabel>
                    <AiFillGithub size={19} /> User name:
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
                    <BsFillTelephoneFill size={15} />
                    Phone no:
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
    </Modal>
  );
}

export default Profile;
