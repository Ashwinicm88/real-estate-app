package com.example.real_estate.api.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "expertreview")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpertReview {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;


    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonBackReference
    private Project project;


    @Column( name="review_text",columnDefinition = "TEXT")
    private String reviewText;
    public ExpertReview(Project project, String reviewText) {
        this.project = project;
        this.reviewText = reviewText;
    }
   


}


