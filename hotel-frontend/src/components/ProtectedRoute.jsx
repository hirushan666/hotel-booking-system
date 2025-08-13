// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token"); // Or use your auth context
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
     