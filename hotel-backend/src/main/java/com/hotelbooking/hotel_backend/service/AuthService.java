package com.hotelbooking.hotel_backend.service;

import com.hotelbooking.hotel_backend.dto.AuthRequest;
import com.hotelbooking.hotel_backend.dto.AuthResponse;
import com.hotelbooking.hotel_backend.model.User;
import com.hotelbooking.hotel_backend.repository.UserRepository;
import com.hotelbooking.hotel_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    public AuthResponse login(AuthRequest authRequest) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String token = jwtUtil.generateToken(userDetails);

            return new AuthResponse(token, "Login successful");
        } catch (Exception e) {
            return new AuthResponse(null, "Invalid username or password");
        }
    }

    public AuthResponse register(User user) {
        try {
            // Check if username already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return new AuthResponse(null, "Username already exists");
            }

            // Check if email already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return new AuthResponse(null, "Email already exists");
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Save user
            User savedUser = userRepository.save(user);

            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getUsername());
            final String token = jwtUtil.generateToken(userDetails);

            return new AuthResponse(token, "Registration successful");
        } catch (Exception e) {
            return new AuthResponse(null, "Registration failed: " + e.getMessage());
        }
    }
} 