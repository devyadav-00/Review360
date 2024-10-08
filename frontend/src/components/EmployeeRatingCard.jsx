import React from "react";
import RatingList from "./RatingList"; // Import the RatingList component

const EmployeeRatingCard = ({ employeeData }) => {
//   console.log(employeeData);

  return (
    <div className="container mx-auto p-6">
      {employeeData.map((data, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-xl font-semibold">
            {data.employee.firstname} {data.employee.lastname}
          </h3>
          <p>Average Rating: {data.averageRating} / 5</p>

          {/* Use the RatingList component to render ratings */}
          <RatingList ratings={data.ratings} />
        </div>
      ))}
    </div>
  );
};

export default EmployeeRatingCard;