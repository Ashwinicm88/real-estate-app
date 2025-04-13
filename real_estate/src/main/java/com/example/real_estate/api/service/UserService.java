package com.example.real_estate.api.service;

import com.example.real_estate.api.model.Role;
import com.example.real_estate.api.model.RoleType;
import com.example.real_estate.api.model.User;
import com.example.real_estate.api.repository.RoleRepository;
import com.example.real_estate.api.repository.UserRepository;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerAdmin(String username, String rawPassword) {
        String encodedPassword = passwordEncoder.encode(rawPassword);

        Role adminRole = roleRepository.findByName(RoleType.ADMIN)
            .orElseThrow(() -> new RuntimeException("Admin role not found"));

        User user = new User(username, encodedPassword, Set.of(adminRole));
        userRepository.save(user);
    }
}
