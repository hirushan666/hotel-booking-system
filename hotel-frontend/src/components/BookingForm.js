import React, { useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginPromptModal from "./LoginPromptModal";

export default function BookingForm() {
  const { roomId } = useParams();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      setShowLoginPrompt(true); // show the modal instead of redirect
      return;
    }

    const roomIdNum = Number(roomId);

    if (isNaN(roomIdNum)) {
      toast.error("Invalid user or room ID");
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
        toast.success("Booking successful!");
        navigate("/");
      })
      .catch(() => toast.error("Booking failed!"));
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-blue-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">Book Room</h1>
      <form className="space-y-5" onSubmit={e => { e.preventDefault(); handleBooking(); }}>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold shadow"
        >
          Confirm Booking
        </button>
      </form>
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
}
