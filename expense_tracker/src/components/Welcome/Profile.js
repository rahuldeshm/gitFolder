import React, { useContext, useRef, useEffect } from "react";
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

function Profile(props) {
  const ctx = useContext(DataContext);
  const nameRef = useRef();
  const urlRef = useRef();

  function fetchDataFunction() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.authorisation.idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          nameRef.current.value = data.users[0].displayName;
          urlRef.current.value = data.users[0].photoUrl;
        });
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  useEffect(fetchDataFunction, [ctx.authorisation]);

  function profileUpdateHandler(e) {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.authorisation.idToken,
          displayName: nameRef.current.value,
          photoUrl: urlRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          // ctx.authorisationHandler(data);
          // localStorage.setItem("authorised", JSON.stringify(data));
          // history.replace("/welcome");
        });
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
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
                  onClick={props.toggle}
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
                  {" "}
                  <AiFillGithub /> Full Name:
                </FormLabel>
              </Col>
              <Col sm={4}>
                <FormControl
                  style={{ height: "2rem" }}
                  ref={nameRef}
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
                  style={{ height: "2rem" }}
                  ref={urlRef}
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
