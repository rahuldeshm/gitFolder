import React from "react";
import { useState } from "react";
import { createContext } from "react";

const login = JSON.parse(localStorage.getItem("authorised"));
const DataContext = createContext({
  authorised: false,
  authorisation: "",
  authorisationHandler: () => {},
});

export function DataContextProvider(props) {
  const [authorisation, setAuthorisation] = useState(login);
  let authorised = !!authorisation;
  function authorisationHandler(item) {
    setAuthorisation(item);
  }
  return (
    <DataContext.Provider
      value={{
        authorisation: authorisation,
        authorised: authorised,
        authorisationHandler: authorisationHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
