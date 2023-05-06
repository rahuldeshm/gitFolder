import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./authSlice";
import { profileActions } from "./profileSlice";

const DataContext = createContext({
  loader: false,
  loaderHandler: () => {},
});

export function DataContextProvider(props) {
  const dispatch = useDispatch();

  const authorised = useSelector((state) => state.auth.authorised);
  const authorisation = useSelector((state) => state.auth.authorisation);
  const [loader, setLoader] = useState(false);

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
              dispatch(
                profileActions.setFetchedData({
                  name: data.users[0].displayName,
                  url: data.users[0].photoUrl,
                  emailVerified: data.users[0].emailVerified,
                })
              );
            }

            setLoader(false);
          });
        } else {
          res.json().then((data) => {
            dispatch(authActions.logout());
            setLoader(false);
            alert(data.error.message);
          });
        }
      });
    }
  }
  useEffect(fetchDataFunction, [authorisation, authorised]);
  return (
    <DataContext.Provider
      value={{
        loader: loader,
        loaderHandler: loaderHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
