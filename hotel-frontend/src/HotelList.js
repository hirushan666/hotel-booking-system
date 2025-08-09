import React, { useEffect, useState } from 'react';
import { getAllHotels, getRoomsByHotelId } from './services/HotelService';
import RoomList from './RoomList';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAllHotels()
      .then(response => setHotels(response.data))
      .catch(error => console.error('Error fetching hotels:', error));
  }, []);

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    getRoomsByHotelId(hotel.id)
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  };

  return (
    <div>
      <h1>Hotels</h1>
      <ul>
        {hotels.map(hotel => (
          <li 
            key={hotel.id} 
            style={{ cursor: 'pointer', fontWeight: hotel.id === selectedHotel?.id ? 'bold' : 'normal' }}
            onClick={() => handleHotelClick(hotel)}
          >
            {hotel.name} - {hotel.address}
          </li>
        ))}
      </ul>

      {selectedHotel && (
        <div>
          <h2>Rooms for {selectedHotel.name}</h2>
          <RoomList rooms={rooms} />
        </div>
      )}
    </div>
  );
}

export default HotelList;
//jj