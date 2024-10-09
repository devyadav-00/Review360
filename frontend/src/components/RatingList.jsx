import React, { useState } from "react";

const RatingList = ({ ratings }) => {
  // State to manage visibility of ratings
  const [showRatings, setShowRatings] = useState(false);

  return (
    <div>
      {/* Button to toggle rating list visibility */}
      <button
        onClick={() => setShowRatings((prev) => !prev)} // Toggle state
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showRatings ? "Hide Ratings" : "Show Ratings"}
      </button>

      {/* Conditionally render the rating list based on showRatings state */}
      {showRatings && (
        <>
          {ratings.length === 0 ? (
            // Display message when no ratings are available
            <p className="mt-4 text-gray-500 italic">
              This employee is not rated by any user.
            </p>
          ) : (
            // Render the list of ratings when available
            <ul className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
              {ratings.map((rating, index) => (
                <li
                  key={index}
                  className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between"
                >
                  <div className="flex items-center">
                    {/* Icon for ratedBy */}
                    <svg
                      className="h-6 w-6 text-blue-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 0114 0H3z" />
                    </svg>
                    <span className="text-lg font-semibold text-gray-700">
                      {rating.ratedBy.firstname} {rating.ratedBy.lastname}
                    </span>
                  </div>

                  {/* Rating value */}
                  <div className="flex items-center mt-2">
                    <svg
                      className="h-5 w-5 text-yellow-500 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.318l1.176 3.635h3.83l-3.1 2.25 1.176 3.636L12 11.727l-3.082 2.25L9.196 10.2l-3.1-2.25h3.83L12 4.318z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      {rating.ratingValue} / 5
                    </span>
                  </div>

                  {/* Review */}
                  <p className="mt-3 italic text-gray-500">"{rating.review}"</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default RatingList;