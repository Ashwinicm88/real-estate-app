package com.example.real_estate.api.repository;

import com.example.real_estate.api.model.Trends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrendsRepository extends JpaRepository<Trends, Integer> {
}
