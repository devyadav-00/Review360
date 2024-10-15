import React, { useContext, useEffect, useState } from "react";
import bgimage from "../assets/bgimage.jpg";
import teamImage from "../assets/team.jpeg";
import reviewImage from "../assets/review.jpeg";
import { StoreContext } from "../context/StoreContext";



const HomePage = () => {
  // const [user, setUser] = useState(null);

  const { userData } = useContext(StoreContext);
  // console.log(userData);

  
  

  return (
    <div
      className="h-[150vh] lg:h-[110vh] flex flex-col items-center mt-16 px-6 text-center relative"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

      {/* Conditional welcome message or user greeting */}
      <div className="relative z-10 text-white 2xl sm:text-3xl md:text-6xl font-extrabold mt-6 animate-fade-in tracking-wide drop-shadow-2xl transition-transform duration-300 transform hover:scale-110 hover:translate-y-[-4px]">
        {userData ? (
          <>Hi, <span className="text-blue-300">{userData.firstname} {userData.lastname}!</span> Glad to have you back.</>
        ) : (
          <>Welcome to <span className="text-blue-300">Employee Review System</span>!</>
        )}
      </div>

      {/* Move description and images right below welcome message */}
      <div className="flex flex-col items-center justify-start flex-grow z-10 mt-8">
        <div className=" lg:flex lg:flex-row sm:flex sm:flex-col items-center sm:space-y-0  space-y-5  sm:justify-center md:gap-10 lg:gap-40 lg:justify-start w-full">
          {/* Website description */}
          <div className="text-white text-sm sm:text-3xl  md:text-2xl sm:max-h-2xl max-w-xl animate-slide-up drop-shadow-md leading-relaxed md:tracking-wide bg-white bg-opacity-10 hover:shadow-inner backdrop-filter backdrop-blur-lg rounded-xl  p-6 shadow-2xl">
            Our Employee Review System allows employees to review each other and
            employers to monitor their team's performance. Employees can view
            their average rating, and employers can assess individual ratings
            provided by peers. This platform promotes transparency and helps
            companies better understand the contributions and performance of
            each employee.
          </div>

          {/* Images Section */}
          <div className="flex flex-col justify-center items-center gap-3 sm:gap-10 md:flex md:flex-row md:space-x-8 animate-zoom-in">
            <img
              src={teamImage}
              alt="Team collaboration"
              className="w-60 sm:w-72 md:w-80   rounded-xl shadow-2xl transform hover:scale-110 hover:rotate-3 transition-transform duration-500 ease-in-out hover:shadow-blue-500"
            />
            <img
              src={reviewImage}
              alt="Employee review"
              className="w-60 sm:w-72 md:w-80   rounded-xl shadow-2xl transform hover:scale-110 hover:-rotate-3 transition-transform duration-500 ease-in-out hover:shadow-blue-500"
            />
          </div>
        </div>

        {/* Call to Action Button at the bottom */}
        {!userData && (
          <div className="mt-auto animate-bounce lg:mt-48 md:mt-40 sm:mt-10 sm:pb-10 mb-4 lg:mb-16">
            <a
              href="/login"
              className="text-white bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-3 rounded-full font-semibold text-lg transform hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:scale-105 transition-transform duration-500 ease-in-out shadow-lg hover:shadow-gray-400"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;