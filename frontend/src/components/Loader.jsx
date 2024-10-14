import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <div className="h-screen w-full bg-transparent inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50">
      <PuffLoader color="#3498db" size={100} />
    </div>
  );
};

export default Loader;