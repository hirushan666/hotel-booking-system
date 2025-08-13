package com.hotelbooking.hotel_backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Backend server is running");
        response.put("timestamp", new java.util.Date().toString());
        return response;
    }

    @GetMapping("/secured")
    public Map<String, Object> securedEndpoint() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a secured endpoint");
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        
        return response;
    }

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint");
        return response;
    }

    @GetMapping("/db")
    public Map<String, Object> databaseTest() {
        Map<String, Object> response = new HashMap<>();
        try {
            String result = jdbcTemplate.queryForObject("SELECT 'Database connection successful' as status", String.class);
            response.put("status", "success");
            response.put("message", result);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Database connection failed: " + e.getMessage());
        }
        return response;
    }
} 