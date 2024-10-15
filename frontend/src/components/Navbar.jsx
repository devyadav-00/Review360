import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userData, setUserData } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://review360-backend.onrender.com/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      // console.log("Logout response:", response.data.message);
      toast.success(response.data.message);

      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response ? error.response.data : error
      );
    }
  };

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-300 p-3 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-10">
        {/* Left Side - Home Link */}
        <div className="pr-10 mr-16 hidden md:block">
          <Link
            to="/"
            className="text-gray-800 font-semibold text-lg hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:underline"
          >
            Home
          </Link>
        </div>

        {/* Center - Logo */}
        <div className="flex items-center w-32  justify-start md:justify-center md:w-[200px] h-16 md:items-center lg:pl-6 lg:ml-20">
          <Link to="/">
            <img src={logo} alt="Logo" className="" />
          </Link>
        </div>

        {/* <div className="flex items-center justify-start md:justify-center md:items-center  pl-6 ml-20 md:w-[200px] h-16">
          <Link to="/">
            <img src={logo} alt="Logo" className="" />
          </Link>
        </div> */}

        {/* Right Side - Links */}
        <div className="flex justify-center items-center pr-6 space-x-4">
          <Link
            to="/about"
            className="text-gray-800 hidden lg:block font-medium text-lg hover:underline"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hidden lg:block font-medium text-lg hover:underline"
          >
            Contact Us
          </Link>
          {!userData ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          ) : (
            // Profile Image and Dropdown
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                {/* Profile Image */}
                <img
                  src={userData.image} // Use user's profile image or a placeholder
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                {/* Dropdown Arrow */}
                <IoIosArrowDown />
                {/* Unicode down arrow */}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>

                  {/* New Dropdown Item for Dashboard */}
                  <Link
                    to={
                      userData.role === "Manager"
                        ? "/manager/dashboard"
                        : "/employee/dashboard"
                    }
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
