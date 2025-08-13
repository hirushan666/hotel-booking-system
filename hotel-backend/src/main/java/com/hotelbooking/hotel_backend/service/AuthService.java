package com.hotelbooking.hotel_backend.service;

import com.hotelbooking.hotel_backend.dto.AuthRequest;
import com.hotelbooking.hotel_backend.dto.AuthResponse;
import com.hotelbooking.hotel_backend.model.User;
import com.hotelbooking.hotel_backend.repository.UserRepository;
import com.hotelbooking.hotel_backend.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

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
            logger.info("Attempting login for user: {}", authRequest.getUsername());
            
            // Authenticate user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String token = jwtUtil.generateToken(userDetails);

            logger.info("Login successful for user: {}", authRequest.getUsername());
            return new AuthResponse(token, "Login successful");
        } catch (Exception e) {
            logger.error("Login failed for user: {}, error: {}", authRequest.getUsername(), e.getMessage());
            return new AuthResponse(null, "Invalid username or password");
        }
    }

    public AuthResponse register(User user) {
        try {
            logger.info("Attempting registration for user: {}", user.getUsername());
            
            // Check if username already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                logger.warn("Registration failed: Username already exists: {}", user.getUsername());
                return new AuthResponse(null, "Username already exists");
            }

            // Check if email already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                logger.warn("Registration failed: Email already exists: {}", user.getEmail());
                return new AuthResponse(null, "Email already exists");
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Save user
            User savedUser = userRepository.save(user);
            logger.info("User registered successfully: {}", savedUser.getUsername());

            // Generate JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getUsername());
            final String token = jwtUtil.generateToken(userDetails);

            return new AuthResponse(token, "Registration successful");
        } catch (Exception e) {
            logger.error("Registration failed for user: {}, error: {}", user.getUsername(), e.getMessage(), e);
            return new AuthResponse(null, "Registration failed: " + e.getMessage());
        }
    }
} 