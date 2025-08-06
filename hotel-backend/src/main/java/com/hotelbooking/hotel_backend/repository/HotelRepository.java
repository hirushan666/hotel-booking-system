package com.hotelbooking.hotel_backend.repository;

import com.hotelbooking.hotel_backend.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    // Optional: custom queries like findByName(String name) can go here later
}
