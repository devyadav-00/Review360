import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loader";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
    image: null,
  });

  const [newFormData, setNewFormData] = useState({
    phone: "",
    dob: "",
    image: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        phone: userData.phone,
        dob: userData.dob,
        image: userData.image,
      });
      setNewFormData({
        phone: userData.phone,
        dob: new Date(userData.dob).toISOString().split("T")[0],
        image: null,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewFormData({ ...newFormData, image: files[0] });
    } else {
      setNewFormData({ ...newFormData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newFormData.dob && !newFormData.image && !newFormData.phone) {
      toast.error("Please fill at least one field to update your profile."); // Use toast for alerts
      return;
    }

    const formDataToSend = new FormData();

    if (newFormData.phone) {
      formDataToSend.append("phone", newFormData.phone);
    } else {
      formDataToSend.append("phone", userData.phone);
    }
    if (newFormData.dob) {
      formDataToSend.append("dob", newFormData.dob);
    } else {
      formDataToSend.append("dob", userData.dob);
    }
    if (newFormData.image) {
      formDataToSend.append("image", newFormData.image);
    } else {
      formDataToSend.append("image", userData.image);
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/user/updateProfile",
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUserData(response.data.user);
      // console.log("Profile updated successfully:", response.data.message);
      toast.success(response.data.message);
      navigate("/my-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex relative items-center justify-center min-h-[100] pt-20 pb-14">
      {loading && (
        <div className="absolute w-full z-10">
          <Loading />
        </div>
      )}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border-gray-300 border-2">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={newFormData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength="10"
              minLength="10"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={newFormData.dob}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="image">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
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

export default UpdateProfilePage;
