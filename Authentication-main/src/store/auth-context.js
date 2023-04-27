import React, { createContext, useState } from "react";

export function AuthContextProvider(props) {
  const [authorised, setAuthorised] = useState(false);
  const [authorisation, setAuthorisation] = useState(null);
  function storeAuthorisation(data) {
    setAuthorisation(data);
  }
  return (
    <AuthContext.Provider
      value={{
        authorised: authorised,
        setAuthorised: setAuthorised,
        storeAuthorisation: storeAuthorisation,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext({
  authorised: false,
  setAuthorised: () => {},
  storeAuthorisation: () => {},
});

export default AuthContext;
