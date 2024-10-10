import React, { useState, useEffect } from "react";
import axios from "axios";
import RatingCard from "../components/RatingCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const EmployeePage = () => {
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(StoreContext);
  if (!userData) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/rating/me",
          { withCredentials: true }
        );
        setAverageRating(response.data.averageRating);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageRating();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 h-[100vh] bg-white shadow-md pt-60 p-6 rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        My Average Rating
      </h1>

      <div className="mt-4 text-center text-gray-600 text-lg">
        {averageRating !== null ? (
          <RatingCard averageRating={averageRating.toFixed(2)} />
        ) : (
          "No ratings available"
        )}
      </div>

      {/* Button to rate another team member */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/rate-employee")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          Rate a Team Member
        </button>
      </div>
    </div>
  );
};

export default EmployeePage;