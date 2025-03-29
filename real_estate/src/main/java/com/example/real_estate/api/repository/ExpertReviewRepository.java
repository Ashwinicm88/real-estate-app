package com.example.real_estate.api.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.example.real_estate.api.model.ExpertReview;
 
 
 
@Repository
public interface ExpertReviewRepository extends JpaRepository<ExpertReview, Integer> {
 
    ExpertReview findByProject_ProjectId(Integer projectId); // Return a list if multiple entries exis
   
}
