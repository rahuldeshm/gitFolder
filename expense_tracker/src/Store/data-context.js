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
      if (authorisation.displayName !== undefined) {
        dispatch(
          profileActions.setFetchedData({
            name: authorisation.displayName || "",
            url: authorisation.phone || "",
            emailVerified: authorisation.verified,
          })
        );
      }
    } else {
      dispatch(authActions.logout());
    }
  }
  useEffect(fetchDataFunction, [authorisation, authorised, dispatch]);
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
