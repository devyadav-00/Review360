import React from "react";

const RatingCard = ({ averageRating }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
      <p className="text-xl font-bold">Average Rating: {averageRating} / 5</p>
    </div>
  );
};

export default RatingCard;