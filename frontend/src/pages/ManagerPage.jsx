import React, { useEffect, useState, useContext } from "react";
import EmployeeRatingCard from "../components/EmployeeRatingCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ManagerPage = () => {
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { userData } = useContext(StoreContext);
  if (!userData) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const employeeResponse = await axios.get(
          "http://localhost:4000/api/v1/rating/allRatings",
          { withCredentials: true }
        );
        setEmployeeRatings(employeeResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee ratings:", error);
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

 

  return (
    <div className="container mx-auto p-6 pt-20 min-h-[100vh] bg-gradient-to-br from-indigo-200 to-blue-300">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
        Manager Dashboard
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform ">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-indigo-600 pb-2">
          Employee Ratings
        </h2>
        {employeeRatings.length > 0 ? (
          <EmployeeRatingCard employeeData={employeeRatings} />
        ) : (
          <p className="text-gray-600 text-lg">No ratings found for employees.</p>
        )}
      </div>
    </div>
  );
};

export default ManagerPage;