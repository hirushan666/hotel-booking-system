import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    API.post("/auth/login", { username, password })
      .then((res) => {
        const { token } = res.data;
        if (token) {
          // Save token and username (or userId if backend returns it)
          localStorage.setItem("token", token);
          localStorage.setItem("username", username); // store username for convenience

          alert("Login successful!");
          navigate("/");
        } else {
          alert("Login failed: no token received");
        }
      })
      .catch(() => alert("Invalid username or password"));
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
