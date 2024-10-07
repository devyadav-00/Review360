import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-300 p-4 shadow-lg  w-full bottom-0">
      <div className="container mx-auto flex flex-col justify-center items-center">
        
            <div className="">
                <Link to="/about" className="text-gray-800 font-medium text-lg">
                    About Us
                </Link>
            </div>

            <div className="text-gray-800 font-medium">
                &copy; {new Date().getFullYear()} Review 360. All rights reserved.
            </div>

            <div className="">
                <Link to="/contact" className="text-gray-800 font-medium text-lg">
                    Contact Us
                </Link>
            </div>
      </div>
    </footer>
  );
};

export default Footer;