import React from 'react';

function RoomList({ rooms }) {
  if (!rooms.length) return <p>No rooms available.</p>;

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            Room {room.roomNumber} - {room.type} - LKR {room.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
