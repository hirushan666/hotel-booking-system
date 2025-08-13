import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/hotels").then((res) => setHotels(res.data));
  }, []);

  return (
    <div>
      <h1>Available Hotels</h1>
      {hotels.map((hotel) => (
        <div key={hotel.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h2>{hotel.name}</h2>
          <p>{hotel.address}, {hotel.city}, {hotel.country}</p>
          <button onClick={() => navigate(`/hotel/${hotel.id}`)}>View Rooms</button>
        </div>
      ))}
    </div>
  );
}
