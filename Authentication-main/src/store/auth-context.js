import React, { createContext, useEffect, useState } from "react";
const localauth = localStorage.getItem("login");
export function AuthContextProvider(props) {
  const [authorisation, setAuthorisation] = useState(localauth);
  const authorised = !!authorisation;
  useEffect(() => {
    setTimeout(() => {
      console.log("autotimeout");
      localStorage.removeItem("login");
    }, 30000);
  }, []);
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
  authorised: "",
  authorisation: "",
  storeAuthorisation: (data) => {},
});

export default AuthContext;
