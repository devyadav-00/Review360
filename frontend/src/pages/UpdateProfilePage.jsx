import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const EditProfilePage = () => {
  const { userData, setUserData } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    phone: userData.phone || "",  // Initialize with empty string if undefined
    dob: userData.dob || "",      // Initialize with empty string if undefined
    image: null,
  });

  console.log(userData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form data
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("dob", formData.dob);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/user/updateProfile",
        formDataToSend,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setUserData(response.data);
      navigate("/my-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* Display all user data */}
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700">First Name</label>
              <p className="mt-1 text-gray-600">{userData.firstname}</p>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Last Name</label>
              <p className="mt-1 text-gray-600">{userData.lastname}</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <p className="mt-1 text-gray-600">{userData.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <p className="mt-1 text-gray-600">{userData.role}</p>
          </div>
          
          {/* Editable fields */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="image">Profile Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
              required
            />
          </div>
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;