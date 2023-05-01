import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";

const login = JSON.parse(localStorage.getItem("authorised"));
const DataContext = createContext({
  authorised: false,
  authorisation: "",
  authorisationHandler: () => {},
  completedProfile: false,
  profile: {},
  emailVerified: false,
  profileHandler: () => {},
  loader: false,
  loaderHandler: () => {},
});

export function DataContextProvider(props) {
  const [loader, setLoader] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [profile, setprofileData] = useState({ name: "", url: "" });
  const [completedProfile, setCompletedProfile] = useState(false);
  const [authorisation, setAuthorisation] = useState(login);
  let authorised = !!authorisation;
  function authorisationHandler(item) {
    setAuthorisation(item);
  }

  function profileHandler() {
    setCompletedProfile(true);
  }
  function loaderHandler() {
    setLoader((loader) => !loader);
  }

  function fetchDataFunction() {
    if (authorised) {
      setLoader(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAVVFxex2DkoJzmrbLNI1k-qI-CED2MHPY",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authorisation.idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.users[0].displayName !== undefined) {
              setCompletedProfile(true);
              setprofileData({
                name: data.users[0].displayName,
                url: data.users[0].photoUrl,
              });
            }
            if (data.users[0].emailVerified === true) {
              setEmailVerified(true);
            }
            setLoader(false);
          });
        } else {
          res.json().then((data) => {
            setAuthorisation(null);
            localStorage.removeItem("authorised");
            setLoader(false);
          });
        }
      });
    }
  }
  useEffect(fetchDataFunction, [authorisation, authorised]);
  return (
    <DataContext.Provider
      value={{
        authorisation: authorisation,
        authorised: authorised,
        authorisationHandler: authorisationHandler,
        completedProfile: completedProfile,
        profile: profile,
        emailVerified: emailVerified,
        profileHandler: profileHandler,
        loader: loader,
        loaderHandler: loaderHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
