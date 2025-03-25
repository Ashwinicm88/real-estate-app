package com.example.real_estate.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.real_estate.api.model.Nearby;

public interface NearbyRepository extends JpaRepository<Nearby, Integer> {
    Nearby findByProject_ProjectId(Integer projectId); // Return a list if multiple entries exis 
}
