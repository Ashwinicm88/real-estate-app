package com.example.real_estate.api.repository;
// import com.example.real_estate.api.dto.ProjectDetailsDTO;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectDetails;
// import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface ProjectDetailsRepository extends JpaRepository<ProjectDetails, Integer> {
@Query("SELECT pd FROM ProjectDetails pd WHERE pd.project.projectId = :projectId")
ProjectDetails findByProjectId(@Param("projectId") Integer projectId);

// If you need only one record (Optional<ProjectDetails>)
@Query("SELECT pd FROM ProjectDetails pd WHERE pd.project.projectId = :projectId")
ProjectDetails findFirstByProjectId(@Param("projectId") Integer projectId);
// Fetch project details using a Project entity
ProjectDetails findByProject(Project project);

}


