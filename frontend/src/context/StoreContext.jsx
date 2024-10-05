import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  // const savedToken = Cookies.get('token') || null;
  const [token, setToken] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/user/profile", {
        withCredentials: true,
      })
      .then((profileData) => {
        if (profileData) {
          console.log(profileData);
          setToken(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log("Token in context:", token);
  // console.log(savedToken);

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