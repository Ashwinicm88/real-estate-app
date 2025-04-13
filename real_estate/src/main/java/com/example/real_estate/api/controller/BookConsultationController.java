package com.example.real_estate.api.controller;

import com.example.real_estate.api.dto.AdminUpdateDTO;
import com.example.real_estate.api.model.BookConsultation;
import com.example.real_estate.api.service.BookConsultationService;
import com.example.real_estate.api.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class BookConsultationController {

    @Autowired
    private BookConsultationService consultationService;

    
    @Autowired
    private ProjectService projectService;

    public BookConsultationController(BookConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @GetMapping
  
    public List<BookConsultation> getAllConsultations() {
        return consultationService.getAllConsultations();
    }

    @GetMapping("/{id}")
    public Optional<BookConsultation> getConsultationById(@PathVariable Integer id) {
        return consultationService.getConsultationById(id);
    }

    @PostMapping
    public BookConsultation createConsultation(@RequestBody BookConsultation consultation) {
        System.out.println("Received Request: " + consultation);
        return consultationService.saveConsultation(consultation);
    }

    @DeleteMapping("/{id}")
    public String deleteConsultation(@PathVariable Integer id) {
        consultationService.deleteConsultation(id);
        return "Consultation deleted successfully!";
    }


    @PutMapping("/{id}")
    public ResponseEntity<BookConsultation> updateConsultation(
            @PathVariable Integer id,
            @RequestBody BookConsultation updatedConsultation
    ) {
        return consultationService.updateConsultation(id, updatedConsultation)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

     @PutMapping(value = "/projects/{projectId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateProject(
        @PathVariable Integer projectId,
        @RequestBody AdminUpdateDTO request) {

    try {
        request.setProjectId(projectId);
        projectService.updateProjectById(projectId, request);
        return ResponseEntity.ok("Project updated successfully.");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error updating project: " + e.getMessage());
    }
}

}
