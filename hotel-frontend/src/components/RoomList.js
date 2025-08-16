import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import LoginPromptModal from "./LoginPromptModal";

export default function RoomList() {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/rooms/hotel/${id}`).then((res) => setRooms(res.data));
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
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Rooms</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-md border border-blue-100 p-6 flex flex-col justify-between hover:shadow-lg transition duration-200"
          >
            <div>
              <h2 className="text-lg font-semibold text-blue-800 mb-2">{room.roomNumber} - {room.type}</h2>
              <p className="text-gray-600 mb-4">Price: <span className="font-bold">LKR {room.price}</span></p>
            </div>
            <button
              onClick={() => handleBookClick(room.id)}
              className="mt-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-medium shadow"
            >
              Book Now
            </button>
          </div>
        ))}
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
