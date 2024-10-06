import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/user/profile", {
        withCredentials: true,
      })
      .then((profileData) => {
        if (profileData) {
          setToken(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setToken(false);
      });
  }, []);
  

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