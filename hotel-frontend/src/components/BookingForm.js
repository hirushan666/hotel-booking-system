import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import LoginPromptModal from "./LoginPromptModal";
import "./BookingForm.css";

export default function BookingForm() {
  const { roomId } = useParams();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState(null);

  const navigate = useNavigate();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (roomId) {
      // Fetch room info
      API.get(`/rooms/${roomId}`)
        .then((response) => setRoomInfo(response.data))
        .catch((error) => console.error("Error fetching room info", error));

      // Fetch booked dates
      API.get(`/bookings/room/${roomId}/booked-dates`)
        .then((response) => {
          const dates = [];
          response.data.forEach((booking) => {
            let current = new Date(booking.checkInDate);
            const end = new Date(booking.checkOutDate);
            while (current <= end) {
              dates.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
          });
          setBookedDates(dates);
        })
        .catch((error) => console.error("Error fetching booked dates", error));
    }
  }, [roomId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out must be after check-in");
      return;
    }

    try {
      setLoading(true);
      await API.post(
        "/bookings",
        {
          room: { id: Number(roomId) },
          checkInDate: formatDate(checkInDate),
          checkOutDate: formatDate(checkOutDate),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowSuccessModal(true);
    } catch (err) {
      alert("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-overlay">
        <div className="booking-form-container">
          <h1 className="booking-form-title">Book Your Stay</h1>

          {roomInfo && (
            <div className="room-details">
              <p><strong>Hotel:</strong> {roomInfo.hotel.name}</p>
              <p><strong>Room Type:</strong> {roomInfo.type}</p>
            </div>
          )}

          <form
            className="booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleBooking();
            }}
          >
            <div className="form-group">
              <label>Check-in Date:</label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                excludeDates={bookedDates}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select check-in date"
              />
            </div>

            <div className="form-group">
              <label>Check-out Date:</label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                excludeDates={bookedDates}
                minDate={checkInDate || new Date()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select check-out date"
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!checkInDate || !checkOutDate || loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>

          {showLoginPrompt && (
            <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
          )}

          {showSuccessModal && (
            <div className="success-modal">
              <div className="success-modal-content">
                <h2>Booking Successful!</h2>
                <p>Your room has been booked.</p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
