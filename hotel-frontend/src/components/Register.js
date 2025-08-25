import React, { useState } from "react";
import API from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleRegister = (e) => {
    e.preventDefault();

    API.post("/auth/register", { username, email, password })
      .then((res) => {
        const { token } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          toast.success("Registration successful!");
          navigate(redirect); // redirect after registration
        } else {
          toast.error("Registration failed: No token received.");
        }
      })
      .catch((error) => {
        toast.error(
          "Registration failed: " +
            (error.response?.data?.message || error.message)
        );
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Register</h2>
        <div>
          <label className="register-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
        </div>
        <div>
          <label className="register-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
        </div>
        <div>
          <label className="register-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
        </div>
        <button
          type="submit"
          className="register-btn"
        >
          Register
        </button>
      </form>
    </div>
  );
}
