package com.example.real_estate.api.controller;

import com.example.real_estate.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestParam String username, @RequestParam String password) {
        userService.registerAdmin(username, password);
        return ResponseEntity.ok("Admin registered successfully");
    }
}

