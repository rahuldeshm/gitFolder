import React, { useRef } from "react";
import { Form, FormControl, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

function Profile() {
  const nameRef = useRef();
  const urlRef = useRef();
  const profile = useSelector((state) => state.auth.authorisation);
  const updated = !!profile.displayName;
  function profileUpdateHandler(e) {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: profile.idToken,
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
          alert(
            "Profile updeted successfully, From your next login the updated profile will be attached."
          );
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  }
  return (
    <>
      {!updated && (
        <div style={{ padding: ".7rem" }}>
          <h3 style={{ textAlign: "center" }}>Profile</h3>
          <Form style={{ marginTop: "3rem" }} onSubmit={profileUpdateHandler}>
            <FormControl
              style={{ marginTop: "3rem" }}
              placeholder="profile name"
              ref={nameRef}
            />
            <FormControl
              style={{ marginTop: "1rem" }}
              placeholder="URL of photo"
              ref={urlRef}
            />
            <Button
              onClick={profileUpdateHandler}
              style={{ marginTop: "1rem" }}
            >
              Update Profile
            </Button>
          </Form>
        </div>
      )}
      {updated && (
        <div style={{ textAlign: "center" }}>
          <Image
            src={profile.profilePicture}
            roundedCircle
            style={{
              height: "4rem",
              marginTop: "4rem",
              objectFit: "cover",
              width: "4rem",
            }}
          />
          <h3>{profile.displayName}</h3>
          <div style={{ height: "4rem", display: "block" }}></div>
        </div>
      )}
    </>
  );
}

export default Profile;
