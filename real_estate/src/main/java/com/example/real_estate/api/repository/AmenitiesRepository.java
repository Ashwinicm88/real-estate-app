package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.real_estate.api.model.Amenities;

@Repository
public interface AmenitiesRepository extends JpaRepository<Amenities, Integer> {
    
}
