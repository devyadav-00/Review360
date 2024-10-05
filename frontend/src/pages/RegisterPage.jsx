import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    salary: '',
    remarks: '',
    image: null
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    // console.log(formDataToSend);
    

    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // console.log('Registration successful:', response.data);
      navigate('/login');
     
    }
    catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-400 pt-20 pb-4">
      <div className="container max-w-md p-8 bg-blue-200 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-800">First Name</label>
              <input
                type="text"
                name="firstname"
                onChange={changeHandler}
                value={formData.firstname}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-800">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={changeHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Image</label>
            <input
              type="file"
              name="image"
              onChange={changeHandler}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-800">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;