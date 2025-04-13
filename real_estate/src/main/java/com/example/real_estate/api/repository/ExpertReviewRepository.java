package com.example.real_estate.api.repository;
 
// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 import com.example.real_estate.api.model.ExpertReview;
// import com.example.real_estate.api.model.Project;
  
@Repository
public interface ExpertReviewRepository extends JpaRepository<ExpertReview, Integer> {
 
    // ExpertReview findByProject_ProjectId(Integer id); // Return a list if multiple entries exis

    void deleteByProject_ProjectId(Integer projectId);

    ExpertReview findByProject_ProjectId(Integer projectId);
   
}
