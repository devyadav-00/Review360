import React, { useEffect, useState } from "react";
import RatingCard from "../components/RatingCard";
import EmployeeRatingCard from "../components/EmployeeRatingCard"; // Import the new component
import axios from "axios";

const ManagerPage = () => {
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [managerRatings, setManagerRatings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showManagerRatings, setShowManagerRatings] = useState(false);

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

  const fetchManagerRatings = async () => {
    try {
      const managerResponse = await axios.get(
        "http://localhost:4000/api/v1/rating/me",
        { withCredentials: true }
      );
      setManagerRatings(managerResponse.data);
      setShowManagerRatings(!showManagerRatings);
    } catch (error) {
      console.error("Error fetching manager ratings:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      {/* Button to fetch and display manager's own ratings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Your Ratings</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={fetchManagerRatings}
        >
          Show My Ratings
        </button>

        {/* Conditional rendering of the RatingCard after clicking the button */}
        {showManagerRatings && managerRatings && (
          <RatingCard averageRating={managerRatings.averageRating} />
        )}

        {showManagerRatings && !managerRatings && (
          <p className="mt-4">You have not been rated yet.</p>
        )}
      </div>

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