import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import Loading from "../components/Loader";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(StoreContext);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        formData,
        { withCredentials: true }
      );
      setUserData(response.data.user);
      // console.log(response.data);
      toast.success(response.data.message);
      
      navigate("/");
    } catch (error) {
      // console.error('Login failed:', error.response ? error.response.data : error.message);
      setError("Login failed. Please check your credentials and try again.");
      toast.error(error.response.data.message);
      // navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative items-center justify-center h-screen bg-gray-400">
      {loading && (
        <div className="absolute w-full z-10">
          <Loading />
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-lg font-bold mb-4">Login</h2>

        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
            required
          />
          <div className="mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            <label htmlFor="showPassword" className="ml-2">
              Show Password
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create new
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
