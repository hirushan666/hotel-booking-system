package com.hotelbooking.hotel_backend.service;

import com.hotelbooking.hotel_backend.model.Hotel;
import com.hotelbooking.hotel_backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Optional<Hotel> updateHotel(Long id, Hotel updatedHotel) {
        return hotelRepository.findById(id).map(hotel -> {
            hotel.setName(updatedHotel.getName());
            hotel.setAddress(updatedHotel.getAddress());
            hotel.setImageUrl(updatedHotel.getImageUrl()); // include image

            // Add more fields if necessary
            return hotelRepository.save(hotel);
        });
    }



    public boolean deleteHotel(Long id) {
        if (hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
