package com.hotelbooking.hotel_backend.repository;

import com.hotelbooking.hotel_backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Add custom queries if needed later
    List<Booking> findByUser_Username(String username);
}
