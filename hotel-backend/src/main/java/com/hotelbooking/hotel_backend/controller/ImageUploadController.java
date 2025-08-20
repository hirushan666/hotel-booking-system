package com.hotelbooking.hotel_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend
public class ImageUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/hotel")
    public ResponseEntity<String> uploadHotelImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }

            // Create unique filename
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);

            // Ensure directory exists
            Files.createDirectories(path.getParent());

            // Save file
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // Return relative image URL
            return ResponseEntity.ok("/images/" + fileName);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
