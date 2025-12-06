import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../api";
import "./BookingForm.css";
import "./UpdateBookingForm.css";

export default function UpdateBookingForm({ booking, onClose, onUpdated }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!booking) {
      return;
    }

    const currentCheckIn = new Date(`${booking.checkInDate}T00:00:00`);
    const currentCheckOut = new Date(`${booking.checkOutDate}T00:00:00`);
    setCheckInDate(currentCheckIn);
    setCheckOutDate(currentCheckOut);

    API.get(`/bookings/room/${booking.room.id}/booked-dates`)
      .then((response) => {
        const dates = [];
        response.data.forEach((existingBooking) => {
          if (existingBooking.id === booking.id) {
            return;
          }

          let cursor = new Date(`${existingBooking.checkInDate}T00:00:00`);
          const end = new Date(`${existingBooking.checkOutDate}T00:00:00`);
          while (cursor <= end) {
            dates.push(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
          }
        });
        setBookedDates(dates);
        setError("");
      })
      .catch(() => setError("Unable to load booked dates."));
  }, [booking]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after the check-in date.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        room: { id: booking.room.id },
        user: { id: booking.user?.id },
        checkInDate: formatDate(checkInDate),
        checkOutDate: formatDate(checkOutDate)
      };

      const response = await API.put(`/bookings/${booking.id}`, payload);
      if (response?.data) {
        setError("");
        if (onUpdated) {
          onUpdated(response.data);
        }
      }
    } catch (err) {
      setError("Failed to update booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const excludedCheckOutDates = useMemo(() => {
    const extraDates = [];
    if (checkInDate) {
      extraDates.push(new Date(checkInDate));
    }
    return [...bookedDates, ...extraDates];
  }, [bookedDates, checkInDate]);

  return (
    <div className="update-booking-overlay">
      <div className="update-booking-modal">
        <h2 className="booking-form-title">Update Booking</h2>

        <form className="booking-form" onSubmit={handleUpdate}>
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
              excludeDates={excludedCheckOutDates}
              minDate={checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select check-out date"
            />
          </div>

          {error && <p className="booking-error-text">{error}</p>}
          <div className="update-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
