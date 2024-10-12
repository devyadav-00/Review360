import React from "react";
import RatingList from "./RatingList";

const EmployeeRatingCard = ({ employeeData }) => {
  // console.log(employeeData);
  
  return (
    <div className="container mx-auto p-6">
      {employeeData.map((data, index) => (
        
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4 flex items-center">
          {/* Display Employee Image */}
          <div className="w-16 h-16 mr-4">
            
            <img
              src={data.employee.image} // Assuming `image` contains the URL
              alt={`${data.employee.firstname} ${data.employee.lastname}`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {data.employee.firstname} {data.employee.lastname}
            </h3>
            <p>Average Rating: {data.averageRating} / 5</p>

            {/* Use the RatingList component to render ratings */}
            <RatingList ratings={data.ratings} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeRatingCard;