import React, { createContext, useState } from "react";

export const AuthContext = createContext();

// props.children is whatever is nested inside the Component tag.
// you can destructure the function argument as such: ({ children })

export const AuthProvider = (props) => {
  const [ auth, setAuth ] = useState({});
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children} 
    </AuthContext.Provider>
  );
}
