import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPromptModal({ onClose, redirectRoomId }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate(`/login?redirect=/book/${redirectRoomId}`);
  };

  const handleRegister = () => {
    onClose();
    navigate(`/register?redirect=/book/${redirectRoomId}`);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: "400px",
        width: "90%",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}>
        <h2>Login Required</h2>
        <p>To book a room, you need to login or register first.</p>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <button onClick={handleLogin} style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Login
          </button>
          <button onClick={handleRegister} style={{ padding: "10px 20px", backgroundColor: "#555", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Register
          </button>
        </div>
        <button onClick={onClose} style={{ marginTop: "15px", background: "transparent", border: "none", color: "#999", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
