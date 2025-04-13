package com.example.real_estate.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.real_estate.api.model.BookConsultation;

@Repository
public interface BookConsultationRepository extends JpaRepository<BookConsultation, Integer> { 
}
