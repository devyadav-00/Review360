import React from "react";
import { Link } from "react-router-dom";
import logo  from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="bg-gray-300 p-3 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Home Link */}
        <div className="pl-6">
          <Link to="/" className="text-gray-800 font-medium text-lg">
            Home
          </Link>
        </div>

        {/* Center - Logo */}
        <div className="absolute right-[44%] transform translate-x-1/2">
          <Link to="/">
            <div>
             <img src={logo} alt="" width="45%"/>
            </div>
          </Link>
        </div>

        {/* Right Side - Login and Sign-up */}
        <div className="flex justify-center items-center pr-6 space-x-4">
          <Link
            to="/login"
            className="text-gray-800 font-medium text-lg hover:underline"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;