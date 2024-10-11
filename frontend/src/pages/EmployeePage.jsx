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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen"> 
      <div className="max-w-xl mx-auto min-h-[60vh] bg-gradient-to-b from-indigo-100 via-white to-purple-100 shadow-lg rounded-lg p-10 transform transition-all hover:scale-105 duration-500">
        <h1 className="text-4xl font-bold text-center text-indigo-700">
          My Average Rating
        </h1>

        <div className="mt-8 text-center">
          {averageRating !== null ? (
            <div className="flex justify-center">
              <RatingCard averageRating={averageRating.toFixed(2)} />
            </div>
          ) : (
            <p className="text-gray-500 text-md">No ratings available</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/rate-employee")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
          >
            Rate a Team Member
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/my-profile")}
            className="text-indigo-600 hover:text-purple-600 font-bold underline"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;