import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    API.post("/users/register", { username, email, password })
      .then((res) => {
        const { token } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username); // or decode token for user info if needed
          alert("Registration successful!");
          navigate("/"); // redirect to home or wherever you want
        } else {
          alert("Registration failed: No token received.");
        }
      })
      .catch((error) => {
        alert(
          "Registration failed: " +
            (error.response?.data?.message || error.message)
        );
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit">Register</button>
    </form>
  );
}
