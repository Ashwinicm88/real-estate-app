package com.example.real_estate.api.repository;
// import com.example.real_estate.api.dto.AdminSearchDTO;
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
       "))"+
       "AND (:typeProperty IS NULL OR p.propertyType=:typeProperty)")
List<Project> searchProjects(
    @Param("city") String city,
    @Param("budgetMin") Integer budgetMin,
    @Param("budgetMax") Integer budgetMax,
    @Param("bhkType") String bhkType,
    @Param("typeProperty") String typeProperty);


// @Query("SELECT new com.yourpackage.dto.ProjectSearchDTO(p.organizationName, p.projectName, p.city, p.launchDate) " +
//        "FROM Project p " +
//        "WHERE (:city IS NULL OR p.city = :city) " +
//        "AND (:projectName IS NULL OR LOWER(p.projectName) LIKE LOWER(CONCAT('%', :projectName, '%')))")
// List<AdminSearchDTO> findByProjectNameAndCity(
//     @Param("projectName") String projectName,
//     @Param("city") String city);
@Query("SELECT p FROM Project p " +
       "JOIN FETCH p.organisation o " +
       "LEFT JOIN FETCH p.projectDetails pd " +
       "WHERE (:city IS NULL OR p.city = :city) " +
       "AND (:projectName IS NULL OR p.projectName=:projectName)")

List<Project> findProjectsByNameAndCity(
    @Param("projectName") String projectName,
    @Param("city") String city);


    @Query("SELECT DISTINCT p FROM Project p " +
    "JOIN p.projectDetails pd " +
    "WHERE LOWER(p.city) = LOWER(:city) AND pd.priceMax <= :maxPrice " +
    "AND p.deleted = false")
    List<Project> findByCityAndMaxPrice(@Param("city") String city, @Param("maxPrice") Integer maxPrice);
}