package com.hotelbooking.hotel_backend.service;

import com.hotelbooking.hotel_backend.model.Booking;
import com.hotelbooking.hotel_backend.model.Room;
import com.hotelbooking.hotel_backend.model.User;
import com.hotelbooking.hotel_backend.repository.BookingRepository;
import com.hotelbooking.hotel_backend.repository.RoomRepository;
import com.hotelbooking.hotel_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public Booking createBooking(Booking booking, String username) {
        // Validate dates
        if (booking.getCheckInDate() == null || booking.getCheckOutDate() == null) {
            throw new RuntimeException("Check-in and check-out dates are required");
        }

        if (booking.getCheckInDate().isAfter(booking.getCheckOutDate())) {
            throw new RuntimeException("Check-in date cannot be after check-out date");
        }

        if (booking.getCheckInDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Check-in date cannot be in the past");
        }

        // Fetch User by username from JWT
        User user = userRepository.findByUsername(username)
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
        booking.setCheckInDate(bookingDetails.getCheckInDate());
        booking.setCheckOutDate(bookingDetails.getCheckOutDate());

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    // Find bookings by date range
    public List<Booking> getBookingsByDateRange(LocalDate startDate, LocalDate endDate) {
        return bookingRepository.findAll().stream()
                .filter(booking -> !booking.getCheckOutDate().isBefore(startDate) && 
                                   !booking.getCheckInDate().isAfter(endDate))
                .toList();
    }
    
    // Find available rooms for a date range
    public boolean isRoomAvailableForDates(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        List<Booking> conflictingBookings = bookingRepository.findAll().stream()
                .filter(booking -> booking.getRoom().getId().equals(roomId) &&
                                   !(checkOut.isBefore(booking.getCheckInDate()) || 
                                     checkIn.isAfter(booking.getCheckOutDate())))
                .toList();
        
        return conflictingBookings.isEmpty();
    }
    public List<Booking> getBookingsByUsername(String username) {
        // Query your repository for bookings by username
        return bookingRepository.findByUser_Username(username);
    }
}
