
import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import LoginPromptModal from "./LoginPromptModal";
import "./RoomList.css";

export default function RoomList() {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/rooms/hotel/${id}`).then((res) => setRooms(res.data));
    API.get(`/hotels/${id}`).then((res) => setHotelName(res.data.name));
  }, [id]);

  const handleBookClick = (roomId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSelectedRoomId(roomId); // remember which room they clicked
      setShowLoginPrompt(true); // show modal instead of navigating
    } else {
      navigate(`/book/${roomId}`);
    }
  };

  // const handleLoginChoice = () => {
  //   navigate("/login");
  // };

  // const handleRegisterChoice = () => {
  //   navigate("/register");
  // };

  return (
    <div className="roomlist-container">
      <h1 className="roomlist-title">Rooms for - {hotelName}</h1>
      <div className="roomlist-grid">
        {rooms.map((room) => {
          const typeToImage = {
            Deluxe: "/room-images/deluxe.jpg",
            Standard: "/room-images/standard.jpg",
            Suite: "/room-images/suite.jpg"
          };
          const imgSrc = typeToImage[room.type] || "/room-images/default.png";
          return (
            <div key={room.id} className="roomlist-card">
              <img
                src={imgSrc}
                alt={room.type}
                className="roomlist-room-image"
                style={{ width: "100%", height: "170px", objectFit: "cover", borderRadius: "0.5rem 0.5rem 0 0" }}
              />
              <div>
                <h2 className="roomlist-card-title">{room.roomNumber} {room.type}</h2>
                <p className="roomlist-card-price">Price: <span>LKR {room.price}</span></p>
              </div>
              <button
                onClick={() => handleBookClick(room.id)}
                className="roomlist-book-btn"
              >
                Book Now
              </button>
            </div>
          );
        })}
      </div>

      {showLoginPrompt && (
        <LoginPromptModal
          onClose={() => setShowLoginPrompt(false)}
          redirectRoomId={selectedRoomId}
        />
      )}
    </div>
  );
}
