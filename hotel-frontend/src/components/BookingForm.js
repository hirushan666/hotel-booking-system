import React, { useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function BookingForm() {
  const { roomId } = useParams();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      alert("Please login to book a room.");
      navigate("/login");
      return;
    }
    
    const roomIdNum = Number(roomId);

    if (isNaN(roomIdNum)) {
      alert("Invalid user or room ID");
      return;
    }
    API.post(
      "/bookings",
      {
        
        room: { id: roomIdNum }, 
        checkInDate,
        checkOutDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        alert("Booking successful!");
        navigate("/");
      })
      .catch(() => alert("Booking failed!"));
  };

  return (
    <div>
      <h1>Book Room</h1>
      <label>Check-in Date:</label>
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <br />
      <label>Check-out Date:</label>
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
      <br />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
