import React, { useEffect, useState } from "react";
import EmployeeRatingCard from "../components/EmployeeRatingCard";
import axios from "axios";

const ManagerPage = () => {
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-20 h-[100vh]">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      {/* Employees ratings using EmployeeRatingCard component */}
      <div>
        <h2 className="text-2xl font-semibold">Employee Ratings</h2>
        {employeeRatings.length > 0 ? (
          <EmployeeRatingCard employeeData={employeeRatings} /> /* Pass data to the component */
        ) : (
          <p>No ratings found for employees.</p>
        )}
      </div>
    </div>
  );
};

export default ManagerPage;