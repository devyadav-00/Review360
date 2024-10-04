import { createContext } from "react";
import { useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

     const [user, setUser] = useState(null);
 
     const contextValue = {
         user,
         setUser,
     };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;