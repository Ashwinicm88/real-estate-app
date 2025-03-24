package com.example.real_estate.api.repository;
// import com.example.real_estate.api.dto.ProjectSearchProjection;
import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;
/**
 * Repository for managing Projects entities.
*/
@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>, JpaSpecificationExecutor<Project> {
    List<Project> findByOrganisation(Organisation organisation);
    Project findTopByOrderByProjectIdDesc();
    List<Project> findByPreferred(String preferred);
    Project findByProjectId(Integer projectId);
@Query("SELECT p FROM Project p " +
       "LEFT JOIN p.projectDetails pd " +
       "LEFT JOIN p.oneBhkConfig one " +
       "LEFT JOIN p.twoBhkConfig two " +
       "LEFT JOIN p.threeBhkConfig three " +
       "WHERE " +
       "(:city IS NULL OR (p.city)=(:city)) " +  // Ensures city filter is applied
       "AND (:budgetMin IS NULL OR pd.priceMin >= :budgetMin) " +
       "AND (:budgetMax IS NULL OR pd.priceMax <= :budgetMax) " +
       "AND (:bhkType IS NULL OR ( " +
       "    (one IS NOT NULL AND :bhkType = '1BHK') " +
       "    OR (two IS NOT NULL AND :bhkType = '2BHK') " +
       "    OR (three IS NOT NULL AND :bhkType = '3BHK') " +
       "))")
List<Project> searchProjects(
    @Param("city") String city,
    @Param("budgetMin") Integer budgetMin,
    @Param("budgetMax") Integer budgetMax,
    @Param("bhkType") String bhkType);
}