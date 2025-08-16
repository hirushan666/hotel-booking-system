import React, { useState } from "react";
import API from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

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
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-blue-100">
      <form onSubmit={handleRegister} className="space-y-5">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Register</h2>
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
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow"
        >
          Register
        </button>
      </form>
    </div>
  );
}
