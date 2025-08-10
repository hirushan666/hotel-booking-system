package com.hotelbooking.hotel_backend.service;

import com.hotelbooking.hotel_backend.model.Booking;
import com.hotelbooking.hotel_backend.model.Room;
import com.hotelbooking.hotel_backend.model.User;
import com.hotelbooking.hotel_backend.repository.BookingRepository;
import com.hotelbooking.hotel_backend.repository.RoomRepository;
import com.hotelbooking.hotel_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking createBooking(Booking booking) {
        // Fetch User by ID
        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch Room by ID
        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        booking.setUser(user);
        booking.setRoom(room);

        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found for id: " + id));

        User user = userRepository.findById(bookingDetails.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(bookingDetails.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        booking.setUser(user);
        booking.setRoom(room);
        booking.setBookingDate(bookingDetails.getBookingDate());
        booking.setStatus(bookingDetails.getStatus());

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
