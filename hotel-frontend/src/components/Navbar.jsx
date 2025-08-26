import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <img
            src="./Dreamstay.png"
            alt="DreamStay Logo"
            s
            className="logo-img"
          />
          <span className="logo-text">DreamStay</span>
        </NavLink>

        {/* Links */}
        <div className="navbar-links">
          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Hotels
          </NavLink>
          {token && (
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Bookings
            </NavLink>
          )}

          {!token ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "navbar-link login active" : "navbar-link login"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "navbar-link register active"
                    : "navbar-link register"
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="navbar-logout">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
