import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-1 md:h-screen pb-8 pt-24 md:pb-0 md:pt-16 bg-gray-100 text-center px-6 overflow-hidden">
      <div className="max-w-3xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to <strong>Employee Review System</strong>! We are a platform
          dedicated to creating transparency and promoting a positive work
          culture by allowing employees to review each other and employers to
          monitor their team’s performance.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Our system empowers employees by giving them the ability to see their
          own performance ratings and helping employers assess team dynamics and
          individual contributions. We believe that feedback is essential for
          growth, and this platform ensures that feedback is provided in a fair,
          structured, and insightful manner.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Whether you're an employer looking to boost productivity or an
          employee striving for excellence, our platform is designed to help you
          succeed. Join us on this journey of continuous improvement!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;