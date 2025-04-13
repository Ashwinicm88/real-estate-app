package com.example.real_estate.api.dto;


import java.util.List;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectDetails;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.text.SimpleDateFormat;
import java.util.Collections;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class RecommendedProperty{  // 🛠️ Fixed class name
    private Integer projectId;
    private String projectName;
    private String projectAddress;
   
    private List<String> projectPictures;
    private Integer units;
    private String projectStatus;
    private Integer priceMin;
    private Integer priceMax;   
    private List<String> availableBHKs; // New field for available BHKs

 
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    // Constructor with null safety
    public RecommendedProperty(Project project, ProjectDetails projectDetails, List<String> availableBHKs) {
        this.projectId = project.getProjectId();
        this.projectName = project.getProjectName();
        this.projectAddress = project.getAddress();
        this.projectPictures = project.getProjectImages();  // 🛠️ Fix JSON to List conversion
        this.units = projectDetails.getUnits() != null ? projectDetails.getUnits() : 0;  // Default 0
        this.projectStatus = projectDetails.getProjectStatus() != null ? projectDetails.getProjectStatus() : "Unknown";
        this.priceMin = projectDetails.getPriceMin();
        this.priceMax = projectDetails.getPriceMax();
        this.availableBHKs = availableBHKs;
    }


    // Helper method to convert JSON string to List<String>
    private List<String> convertJsonToList(String json) {
        if (json == null || json.isEmpty()) {
            return Collections.emptyList(); // Return an empty list if null
        }
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList(); // Return an empty list on error
        }
    }




    // Getters and Setters

    public Integer getProjectId() { return projectId; }
    public void setProjectId(Integer projectId) { this.projectId = projectId; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }


    public String getProjectAddress() { return projectAddress; }
    public void setProjectAddress(String projectAddress) { this.projectAddress = projectAddress; }



    public List<String> getProjectPictures() { return projectPictures; }
    public void setProjectPictures(List<String> projectPictures) { this.projectPictures = projectPictures; }


    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }


    public String getProjectStatus() { return projectStatus; }
    public void setProjectStatus(String projectStatus) { this.projectStatus = projectStatus; }


    public Integer getPriceMin() { return priceMin; }
    public void setPriceMin(Integer priceMin) { this.priceMin = priceMin; }


    public Integer getPriceMax() { return priceMax; }
    public void setPriceMax(Integer priceMax) { this.priceMax = priceMax; }


    public List<String> getAvailableBHKs() { return availableBHKs; } // Getter for availableBHKs
    public void setAvailableBHKs(List<String> availableBHKs) { this.availableBHKs = availableBHKs; } // Setter for availableBHKs
}
