package com.hotelbooking.hotel_backend.controller;

import com.hotelbooking.hotel_backend.model.Hotel;
import com.hotelbooking.hotel_backend.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class HotelController {

    @Autowired
    private HotelService hotelService;

    // GET all hotels
    @GetMapping
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }

    // GET a hotel by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Optional<Hotel> hotel = hotelService.getHotelById(id);
        return hotel.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE a new hotel
    @PostMapping
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
        Hotel createdHotel = hotelService.createHotel(hotel);
        return ResponseEntity.ok(createdHotel); // You could return 201 Created here if needed
    }

    // CREATE hotel with image upload
    @PostMapping("/with-image")
    public ResponseEntity<Hotel> createHotelWithImage(
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("country") String country,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path path = Paths.get("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.copy(file.getInputStream(), path, REPLACE_EXISTING);
                imageUrl = "/images/" + fileName;
            } catch (IOException e) {
                return ResponseEntity.status(500).build();
            }
        }
        Hotel hotel = new Hotel();
        hotel.setName(name);
        hotel.setAddress(address);
        hotel.setCity(city);
        hotel.setCountry(country);
        hotel.setPhoneNumber(phoneNumber);
        hotel.setImageUrl(imageUrl);
        Hotel createdHotel = hotelService.createHotel(hotel);
        return ResponseEntity.ok(createdHotel);
    }

    // UPDATE a hotel
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        Optional<Hotel> updatedHotel = hotelService.updateHotel(id, hotel);
        return updatedHotel.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE a hotel
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        boolean deleted = hotelService.deleteHotel(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE hotel details and image
    @PutMapping("/{id}/with-image")
    public ResponseEntity<Hotel> updateHotelWithImage(
            @PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "country", required = false) String country,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        Optional<Hotel> optionalHotel = hotelService.getHotelById(id);
        if (optionalHotel.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Hotel hotel = optionalHotel.get();
        if (name != null) hotel.setName(name);
        if (address != null) hotel.setAddress(address);
        if (city != null) hotel.setCity(city);
        if (country != null) hotel.setCountry(country);
        if (phoneNumber != null) hotel.setPhoneNumber(phoneNumber);
        if (file != null && !file.isEmpty()) {
            try {
                String uploadDir = Paths.get(System.getProperty("user.dir"), "uploads").toString();
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path path = Paths.get(uploadDir, fileName);
                Files.createDirectories(path.getParent());
                Files.copy(file.getInputStream(), path, REPLACE_EXISTING);
                if (hotel.getImageUrl() != null) {
                    Path oldImagePath = Paths.get(uploadDir, hotel.getImageUrl());
                    try { Files.deleteIfExists(oldImagePath); } catch (Exception ignored) {}
                }
                hotel.setImageUrl("/images/" + fileName);
            } catch (IOException e) {
                return ResponseEntity.status(500).build();
            }
        }
        Optional<Hotel> updatedHotel = hotelService.updateHotel(id, hotel);
        return updatedHotel.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
