import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/user/profile", {
        withCredentials: true,
      })
      .then((profileData) => {
        if (profileData) {
          setToken(true);
          setUserData(profileData.data);
          // console.log(profileData.data);
          
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
    userData,
    setUserData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;