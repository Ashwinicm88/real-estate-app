package com.example.real_estate.api.repository;

import com.example.real_estate.api.model.Role;
import com.example.real_estate.api.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}