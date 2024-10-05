import { createContext } from "react";
import { useState, useEffect } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  
  const savedToken = localStorage.getItem('token') || null;
  const [token, setToken] = useState(savedToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = {
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;