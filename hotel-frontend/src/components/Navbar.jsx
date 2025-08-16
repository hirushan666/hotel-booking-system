import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-100 border-b border-blue-200 shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo / Home link */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-700 hover:text-blue-900 transition duration-200 tracking-tight drop-shadow-sm"
        >
          Hotels
        </Link>

        {/* Nav Links */}
        <div className="space-x-2 sm:space-x-4 flex items-center">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-md text-gray-700 hover:text-white hover:bg-blue-500 transition duration-150 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-md text-gray-700 hover:text-white hover:bg-green-500 transition duration-150 font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition font-semibold shadow-sm border border-red-400"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
