import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerPage = () => {
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [managerRatings, setManagerRatings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const employeeResponse = await axios.get(
          "http://localhost:4000/api/v1/manager/employee-ratings"
        );
        const managerResponse = await axios.get(
          "http://localhost:4000/api/v1/manager/my-ratings"
        );

        setEmployeeRatings(employeeResponse.data);
        setManagerRatings(managerResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      {/* Manager's own ratings */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Your Ratings</h2>
        {managerRatings ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
            <p className="text-xl">
              Average Rating: {managerRatings.averageRating} / 5
            </p>
            <ul className="mt-4">
              {managerRatings.ratings.map((rating, index) => (
                <li key={index} className="mb-2">
                  Rated by: {rating.ratedBy} - Rating: {rating.ratingValue} -{" "}
                  {rating.review}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>You have not been rated yet.</p>
        )}
      </div>

      {/* Employees ratings */}
      <div>
        <h2 className="text-2xl font-semibold">Employee Ratings</h2>
        {employeeRatings.length > 0 ? (
          employeeRatings.map((employee) => (
            <div
              key={employee.employeeId}
              className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4"
            >
              <h3 className="text-xl font-semibold">{employee.name}</h3>
              <p>Average Rating: {employee.averageRating} / 5</p>
              <ul className="mt-4">
                {employee.ratings.map((rating, index) => (
                  <li key={index} className="mb-2">
                    Rated by: {rating.ratedBy} - Rating: {rating.ratingValue} -{" "}
                    {rating.review}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No ratings found for employees.</p>
        )}
      </div>
    </div>
  );
};

export default ManagerPage;