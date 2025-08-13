import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function RoomList() {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/rooms/hotel/${id}`).then((res) => setRooms(res.data));
  }, [id]);

  return (
    <div>
      <h1>Rooms</h1>
      {rooms.map((room) => (
        <div key={room.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h2>{room.roomNumber} - {room.type}</h2>
          <p>Price: LKR {room.price}</p>
          <button onClick={() => navigate(`/book/${room.id}`)}>Book Now</button>
        </div>
      ))}
    </div>
  );
}
