import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-2xl mx-auto p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Welcome to Quiz App
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12">
          Test your knowledge and challenge your friends!
        </p>

        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-center">
          {/* Register Button */}
          <Link to="/register">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-base sm:text-lg">
              Register
            </button>
          </Link>

          {/* Login Button */}
          <Link to="/login">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 text-base sm:text-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
