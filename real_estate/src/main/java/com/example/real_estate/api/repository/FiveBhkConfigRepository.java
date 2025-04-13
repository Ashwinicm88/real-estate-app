package com.example.real_estate.api.repository;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.real_estate.api.model.FiveBHKConfig;
import com.example.real_estate.api.model.Project;

/**
 * Repository for managing Organisation entities.
 */
@Repository
public interface FiveBhkConfigRepository extends JpaRepository<FiveBHKConfig,Integer > {
List<FiveBHKConfig> findByProject(Project project);
Optional<FiveBHKConfig> findByProjectAndTypeNumber(Project project, Integer typeNumber);
void deleteByProject_ProjectId(Integer projectId);
Optional<FiveBHKConfig> findByProject_ProjectIdAndTypeNumber(Integer projectId, Integer typeNumber);

}

