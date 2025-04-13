package com.example.real_estate.api.service;

import com.example.real_estate.api.model.BookConsultation;
import com.example.real_estate.api.repository.BookConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookConsultationService {

    @Autowired
    private BookConsultationRepository consultationRepository;

    public List<BookConsultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    public Optional<BookConsultation> getConsultationById(Integer id) {
        return consultationRepository.findById(id);
    }

    public BookConsultation saveConsultation(BookConsultation consultation) {
        return consultationRepository.save(consultation);
    }

    public void deleteConsultation(Integer id) {
        consultationRepository.deleteById(id);
    }


    public Optional<BookConsultation> updateConsultation(Integer id, BookConsultation updatedConsultation) {
        return consultationRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedConsultation.getName());
                    existing.setEmail(updatedConsultation.getEmail());
                    existing.setConsultationDate(updatedConsultation.getConsultationDate());
                    existing.setTimeSlot(updatedConsultation.getTimeSlot());
                    existing.setConsultationName(updatedConsultation.getConsultationName());
                    return consultationRepository.save(existing);
                });
    }
}
