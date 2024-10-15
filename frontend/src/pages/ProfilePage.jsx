import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userData } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  // Check if userData is available, if not, show loader
  useEffect(() => {
    if (userData) {
      setLoading(false);
    } 
  }, [userData]);
  
  // console.log(userData);
  

  return (
    <div className="flex items-center relative justify-center h-[120vh] sm:h-screen pt-14">
      {loading && (
        <div className="absolute w-full z-10">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="max-w-2xl sm:mx-auto bg-white shadow-lg rounded-lg  p-6 border-t-4 border-indigo-500 transition-transform transform hover:scale-105 hover:shadow-xl">
          {/* Added hover effects */}
          <div className="text-center mb-6">
            <img
              className="w-32 h-32 rounded-full mx-auto shadow-md object-cover"
              src={userData.image}
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
              <p className="text-gray-600">
                {new Date(userData.dob).toISOString().split("T")[0]}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Gender:</h2>
              <p className="text-gray-600">{userData.gender}</p>
            </div>

            {/* Display manager's name if managed_by is not null */}
            {userData.role !== "Manager" && (
              <div className="col-span-2">
                <h2 className="text-lg font-semibold text-gray-700">Manager:</h2>
                <p className="text-gray-600"> 
                  {userData.managed_by.firstname + " " + userData.managed_by.lastname} 
                </p>
              </div>
            )}
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
      )}
    </div>
  );
};

export default ProfilePage;