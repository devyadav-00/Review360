import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { StoreContext } from "../context/StoreContext";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const { token, setToken } = useContext(StoreContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/logout", {}, { withCredentials: true });
      console.log("Logout response:", response.data.message);
      setToken(null);
      // console.log("Token after logout:", Cookies.get('token'));
    } catch (error) {
      console.error("Logout error:", error.response ? error.response.data : error);
    }
  };

  // console.log("Token in context:", token);

  return (
    <nav className="bg-gray-300 p-3 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Home Link */}
        <div className="pl-6">
          <Link to="/" className="text-gray-800 font-medium text-lg">Home</Link>
        </div>

        {/* Center - Logo */}
        <div className="absolute right-[44%] transform translate-x-1/2">
          <Link to="/">
            <div>
              <img src={logo} alt="Logo" width="45%" />
            </div>
          </Link>
        </div>

        {/* Right Side - Conditionally Render Login/Register or Logout */}
        <div className="flex justify-center items-center pr-6 space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="text-gray-800 font-medium text-lg hover:underline">Log in</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;