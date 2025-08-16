import React, { useState } from "react";
import API from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

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
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-blue-100">
      <form onSubmit={handleLogin} className="space-y-5">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Login</h2>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold shadow"
        >
          Login
        </button>
      </form>
    </div>
  );
}
