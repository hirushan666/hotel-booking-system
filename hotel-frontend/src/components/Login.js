import React, { useState } from "react";
import API from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    API.post("/auth/login", { username, password })
      .then((res) => {
        const { token } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          toast.success("Login successful!");
          navigate(redirect); // redirect after login
        } else {
          toast.error("Login failed: No token received.");
        }
      })
      .catch(() => toast.error("Invalid username or password"));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>
        <div>
          <label className="login-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div>
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}
