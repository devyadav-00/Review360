import React from "react";
import bgimage from "../assets/bgimage.jpg";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const HomePage = () => {

    const { token, setToken } = useContext(StoreContext);
    return (
        <div
            className="h-screen flex items-center justify-center mt-16"
            style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: '100% 100%', 
                backgroundPosition: 'center',
            }}
        >
            {/* Your page content goes here */}
            <div className="text-white text-4xl font-bold">
                Hi
            </div>
        </div>
    );
};

export default HomePage;