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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Available Hotels</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl shadow-md border border-blue-100 p-6 flex flex-col justify-between hover:shadow-lg transition duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{hotel.name}</h2>
              <p className="text-gray-600 mb-4">{hotel.address}, {hotel.city}, {hotel.country}</p>
            </div>
            <button
              onClick={() => navigate(`/hotel/${hotel.id}`)}
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium shadow"
            >
              View Rooms
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
