package com.example.real_estate.api.controller;

import com.example.real_estate.api.model.RoleType;
import com.example.real_estate.api.model.User;
import com.example.real_estate.api.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;


    @PostMapping("/login")
public ResponseEntity<Object> login(@RequestParam String username,
                                    @RequestParam String password,
                                    HttpSession session) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password)
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);
    session.setAttribute("username", username);

    // Fetch user from the database
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Check if user has ADMIN role
    boolean isAdmin = user.getRoles().stream()
        .anyMatch(role -> role.getName() == RoleType.ADMIN);

    if (!isAdmin) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", "Access Denied: Not an Admin");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    // ✅ Return JSON response with role
    Map<String, String> response = new HashMap<>();
    response.put("username", user.getUsername());
    response.put("role", "ADMIN"); // Ensure role is included

    return ResponseEntity.ok(response);
}


    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
        return "Logout successful";
    }
}
