import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Navbar = () => {
  const { userData, setUserData } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout response:", response.data.message);
      setUserData(null);
    }
    catch (error) {
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
              <img src={logo} alt="Logo" width="45%" />
            </div>
          </Link>
        </div>

        {/* Right Side - Links */}
        <div className="flex justify-center items-center pr-6 space-x-4">
          <Link
            to="/about"
            className="text-gray-800 font-medium text-lg hover:underline"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 font-medium text-lg hover:underline"
          >
            Contact Us
          </Link>
          {!userData ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Log in
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
              <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                {/* Profile Image */}
                <img
                  src={userData.image} // Use user's profile image or a placeholder
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                {/* Dropdown Arrow */}
                <span className="text-gray-800">&#9662;</span> {/* Unicode down arrow */}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
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







// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { StoreContext } from "../context/StoreContext";
// import axios from "axios";

// const Navbar = () => {
//   const { userData, setUserData } = useContext(StoreContext);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/user/logout",
//         {},
//         { withCredentials: true }
//       );
//       console.log("Logout response:", response.data.message);
//       setUserData(null);
//     } catch (error) {
//       console.error(
//         "Logout error:",
//         error.response ? error.response.data : error
//       );
//     }
//   };

//   return (
//     <nav className="bg-gray-300 p-3 shadow-lg fixed w-full top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Left Side - Home Link */}
//         <div className="pl-6">
//           <Link to="/" className="text-gray-800 font-medium text-lg">
//             Home
//           </Link>
//         </div>

//         {/* Center - Logo */}
//         <div className="absolute right-[44%] transform translate-x-1/2">
//           <Link to="/">
//             <div>
//               <img src={logo} alt="Logo" width="45%" />
//             </div>
//           </Link>
//         </div>

//         {/* Right Side - Links */}
//         <div className="flex justify-center items-center pr-6 space-x-4">
//           <Link
//             to="/about"
//             className="text-gray-800 font-medium text-lg hover:underline"
//           >
//             About Us
//           </Link>
//           <Link
//             to="/contact"
//             className="text-gray-800 font-medium text-lg hover:underline"
//           >
//             Contact Us
//           </Link>
//           {!userData ? (
//             <>
//               <Link
//                 to="/login"
//                 className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
//               >
//                 Log in
//               </Link>

//               <Link
//                 to="/register"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
