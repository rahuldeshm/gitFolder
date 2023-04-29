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
});

export function DataContextProvider(props) {
  const [profile, setprofileData] = useState({ name: "", url: "" });
  const [completedProfile, setCompletedProfile] = useState(false);
  const [authorisation, setAuthorisation] = useState(login);
  let authorised = !!authorisation;
  function authorisationHandler(item) {
    setAuthorisation(item);
  }

  function fetchDataFunction() {
    if (authorised) {
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
          });
        } else {
          res.json().then((data) => {
            setAuthorisation(null);
            localStorage.removeItem("authorised");
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
