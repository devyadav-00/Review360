import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-300 p-6 shadow-lg w-full mt-auto">
      <div className="container mx-auto flex flex-col justify-center items-center space-y-2">

          {/* About Us */}
        <div className="text-center">
          <Link
            to="/about"
            className="text-gray-800 font-semibold text-lg hover:text-blue-500 transition duration-300"
          >
            About Us
          </Link>
        </div>
        {/* Contact Us */}
        <div className="text-center">
          <Link
            to="/contact"
            className="text-gray-800 font-semibold text-lg hover:text-blue-500 transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-gray-800 font-medium text-center">
          &copy; {new Date().getFullYear()} Review 360. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;