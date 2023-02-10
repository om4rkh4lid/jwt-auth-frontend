import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// props.children is whatever is nested inside the Component tag.
// you can destructure the function argument as such: ({ children })

export const AuthProvider = (props) => {
  const [ accessToken, setAccessToken ] = useState("");
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {props.children} 
    </AuthContext.Provider>
  );
}
