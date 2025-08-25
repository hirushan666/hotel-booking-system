import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./HotelList.css"; // Plain CSS file

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/hotels").then((res) => setHotels(res.data));
  }, []);

  return (
    <div className="hotel-list-container">
      <h1 className="hotel-list-title">Available Hotels</h1>

      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            {hotel.imageUrl && (
              <img
                src={`http://localhost:8080${hotel.imageUrl}`}
                alt={hotel.name}
                className="hotel-image"
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
            )}
            <div className="hotel-info">
              <h2 className="hotel-name">{hotel.name}</h2>
              <p className="hotel-address">
                {hotel.city}
              </p>
            </div>
            <button
              className="hotel-btn"
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            >
              View Rooms
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
