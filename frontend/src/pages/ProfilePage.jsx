import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userData } = useContext(StoreContext);

  // Redirect to login if userData is not available
  if (!userData) {
    navigate("/login");
    return null; // Return null to avoid rendering the rest of the component
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border-t-4 border-indigo-500 transition-transform transform hover:scale-105 hover:shadow-xl"> {/* Added hover effects */}
        <div className="text-center mb-6">
          <img
            className="w-32 h-32 rounded-full mx-auto shadow-md object-cover"
            src={userData.image || "/default-profile.jpg"} // Use image from userData
            alt="Profile"
          />
          <h1 className="text-2xl font-bold mt-4 text-gray-800">
            {userData.firstname} {userData.lastname}
          </h1>
          <p className="text-gray-500 mt-2">{userData.role}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Phone:</h2>
            <p className="text-gray-600">{userData.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Date of Birth:</h2>
            <p className="text-gray-600">{userData.dob}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Gender:</h2>
            <p className="text-gray-600">{userData.gender}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/update-profile")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;