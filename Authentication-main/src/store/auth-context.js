import React, { createContext, useState } from "react";

export function AuthContextProvider(props) {
  const [authorisation, setAuthorisation] = useState(null);
  const authorised = !!authorisation;
  function storeAuthorisation(data) {
    setAuthorisation(data);
  }
  return (
    <AuthContext.Provider
      value={{
        authorised: authorised,
        authorisation: authorisation,
        storeAuthorisation: storeAuthorisation,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext({
  authorised: false,
  authorisation: "",
  storeAuthorisation: (data) => {},
});

export default AuthContext;
