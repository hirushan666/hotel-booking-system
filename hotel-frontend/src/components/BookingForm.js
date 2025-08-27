import React, { useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginPromptModal from "./LoginPromptModal";
import "./BookingForm.css"; // ✅ Import CSS

export default function BookingForm() {
  const { roomId } = useParams();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    const roomIdNum = Number(roomId);
    if (isNaN(roomIdNum)) {
      toast.error("Invalid room ID");
      return;
    }

    API.post(
      "/bookings",
      {
        room: { id: roomIdNum },
        checkInDate,
        checkOutDate,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        toast.success("Booking successful!");
        navigate("/");
      })
      .catch(() => toast.error("Booking failed!"));
  };

  return (
    <div className="booking-form-container">
      <h1 className="booking-form-title">Book Room</h1>
      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleBooking();
        }}
      >
        <div>
          <label>Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div>
          <label>Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
}
