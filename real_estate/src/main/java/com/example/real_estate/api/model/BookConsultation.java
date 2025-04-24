package com.example.real_estate.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "bookconsultations")
@Getter
@Setter
public class BookConsultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "consultation_date", nullable = false)
    private LocalDate consultationDate;

    @Column(name = "time_slot", nullable = false, length = 20)
    private String timeSlot;

    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "consultation_name")
    private String consultationName;

    // ✅ New: phone_no (10 digits only)
    @Column(name = "phone_no", length = 10, nullable = false)
    private String phoneNo;

    // ✅ New: confirmed flag (defaults to false)
    @Column(name = "confirmed", nullable = false)
    private Boolean confirmed = false;

    // ✅ New: phone ISD code (default "091", 3 digits)
    @Column(name = "phone_isd", length = 3, nullable = false)
    private String phoneIsd = "091";
}
