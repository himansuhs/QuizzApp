import React from "react";
import { useNavigate } from "react-router-dom";

const LayoutWithLogout = ({ children }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Clear the token
    localStorage.removeItem("userId");

    navigate("/login"); // Redirect to the login page
  };

  return (
    <div>
      {/* Logout Button */}
      <div className="flex justify-end p-4 bg-gray-800 text-white">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Render children components (like TopicSelection, QuizPage, etc.) */}
      <div>{children}</div>
    </div>
  );
};

export default LayoutWithLogout;
