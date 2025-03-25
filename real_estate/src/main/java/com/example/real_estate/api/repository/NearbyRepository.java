package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.real_estate.api.model.Nearby;

public interface NearbyRepository extends JpaRepository<Nearby, Integer> {
    
}
