package com.hotelbooking.hotel_backend.controller;

import com.hotelbooking.hotel_backend.model.User;
import com.hotelbooking.hotel_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // React frontend CORS
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {


        // You might want to validate input here
        return userService.registerUser(user);
    }
}
