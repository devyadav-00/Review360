import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RateEmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [ratingValue, setRatingValue] = useState();
  const [review, setReview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of employees to rate
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/teamMembers", {
          withCredentials: true,
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setErrorMessage("Error fetching employees.");
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !review || !ratingValue) {
      setErrorMessage("Please fill all the fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/v1/rating/create",
        {
          ratedEmployee: selectedEmployee,
          ratingValue,
          review,
        },
        { withCredentials: true }
      );
      setSuccessMessage("Rating submitted successfully!");
      setErrorMessage("");
      setSelectedEmployee("");
      setRatingValue('');
      setReview("");
    } catch (error) {
      console.error("Error submitting rating:", error);
      setErrorMessage("Error submitting rating.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 mt-20 bg-gray-300 shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Rate a Team Member
      </h1>

      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Dropdown to select an employee */}
        <label className="block mb-2 text-gray-700 font-medium">
          Select Employee:
        </label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
        >
          <option value="">-- Select an Employee --</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.firstname} {employee.lastname}
            </option>
          ))}
        </select>

        {/* Rating input */}
        <label className="block mb-2 text-gray-700 font-medium">Rating:</label>
        <input
          type="number"
          value={ratingValue}
          onChange={(e) => setRatingValue(e.target.value)}
          min="1"
          max="5"
          placeholder="Enter rating (1-5)"
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        {/* Review input */}
        <label className="block mb-2 text-gray-700 font-medium">Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Write your review"
        ></textarea>

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            Submit Rating
          </button>
        </div>
      </form>
    </div>
  );
};

export default RateEmployeePage;