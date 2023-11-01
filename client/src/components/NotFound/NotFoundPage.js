import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/mainDashboard"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold mt-4 px-6 py-2 rounded-lg transition-colors duration-300"
        >
          Go Back To Login
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
