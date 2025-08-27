import React, { useEffect, useState } from "react";
import "./Bookings.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/api/bookings/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error: ${res.status} - ${text}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Bookings API response:", data);
          if (Array.isArray(data)) {
            setBookings(data);
            setError(null);
          } else {
            setError("Unexpected response format from API.");
            setBookings([]);
          }
        })
        .catch((err) => setError("Network error: " + err.message))
        .finally(() => setLoading(false));
    } else {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, [token]);

  // Show modal when clicking cancel
  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  // Confirm cancellation
  const confirmCancel = async () => {
    if (!selectedBooking) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/bookings/${selectedBooking.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error: ${res.status} - ${text}`);
      }

      setBookings((prev) =>
        prev.filter((b) => b.id !== selectedBooking.id)
      );
      closeModal();
      alert("Booking cancelled successfully.");
    } catch (err) {
      setError("Failed to cancel booking: " + err.message);
      closeModal();
    }
  };

  return (
    <div className="bookings-container">
      <h1>Your Bookings</h1>

      {/* Loading */}
      {loading && <p>Loading your bookings...</p>}

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* No bookings */}
      {!loading && bookings.length === 0 && !error && (
        <p>No bookings found.</p>
      )}

      {/* Bookings list */}
      {bookings.length > 0 && (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card">
              <h2>{booking.room.hotel.name}</h2>
              <p>
                <strong>Address:</strong> {booking.room.hotel.address},{" "}
                {booking.room.hotel.city}, {booking.room.hotel.country}
              </p>
              <p>
                <strong>Room:</strong> {booking.room.roomNumber} (
                {booking.room.type})
              </p>
              <p>
                <strong>Price:</strong> {booking.room.price} LKR
              </p>
              <p>
                <strong>Check-in:</strong> {booking.checkInDate}
              </p>
              <p>
                <strong>Check-out:</strong> {booking.checkOutDate}
              </p>
              {booking.room.hotel.imageUrl && (
                <img
                  src={`http://localhost:8080${booking.room.hotel.imageUrl}`}
                  alt={booking.room.hotel.name}
                  className="hotel-image"
                />
              )}

              {/* Cancel Booking Button */}
              <button
                className="cancel-btn"
                onClick={() => openModal(booking)}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Cancellation</h3>
            <p>
              Are you sure you want to cancel your booking at{" "}
              <strong>{selectedBooking.room.hotel.name}</strong>?
            </p>
            <div className="modal-buttons">
              <button className="btn btn-confirm" onClick={confirmCancel}>
                Yes
              </button>
              <button className="btn btn-cancel" onClick={closeModal}>
                No
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
