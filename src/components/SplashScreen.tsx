
import React from "react";

const SplashScreen: React.FC = () => {

  return  (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="mx-auto h-16 w-16 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">Taskflow</h1>
        <p className="text-xl text-gray-600 mt-2">Loading...</p>
      </div>
    </div>
  ) ;
};

export default SplashScreen;
