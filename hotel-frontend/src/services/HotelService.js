import axios from 'axios';

const API_URL = 'http://localhost:8080/api/hotels';

export const getAllHotels = () => {
  return axios.get(API_URL);
};
export const getRoomsByHotelId = (hotelId) => {
  return axios.get(`http://localhost:8080/api/rooms/hotel/${hotelId}`);
};
