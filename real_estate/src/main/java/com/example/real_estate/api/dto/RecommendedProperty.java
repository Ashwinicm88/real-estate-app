package com.example.real_estate.api.dto;

import java.util.List;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectDetails;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.text.SimpleDateFormat;
import java.util.Collections;

public class RecommendedProperty{  // 🛠️ Fixed class name

    private String projectName;
    private String projectAddress;
    private String projectVideo;
    private List<String> projectPictures;
    private Integer units;
    private String projectStatus;
    private String projectLaunch;
    private String projectPlannedEnd;
    private Integer priceMin;
    private Integer priceMax;
    private Boolean allInclusive;
    private String Amenities;
    private String coveredParking;
    private Boolean bankApproved;
    private List<String> banks;
 
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    // Constructor with null safety
    public RecommendedProperty(Project project, ProjectDetails projectDetails) {
        this.projectName = project.getProjectName();
        this.projectAddress = project.getAddress();
        this.projectVideo = project.getProjectVideoLink();
        this.projectPictures = project.getProjectImages();  // 🛠️ Fix JSON to List conversion
        this.units = projectDetails.getUnits() != null ? projectDetails.getUnits() : 0;  // Default 0
        this.projectStatus = projectDetails.getProjectStatus() != null ? projectDetails.getProjectStatus() : "Unknown";
        // this.projectLaunch = projectDetails.getProjectLaunch();
        // this.projectPlannedEnd = projectDetails.getProjectPlannedEnd();
        this.priceMin = projectDetails.getPriceMin();
        this.priceMax = projectDetails.getPriceMax();
        // this.priceMin = projectDetails.getPriceMin() != null ? projectDetails.getPriceMin() : 0.0;
        // this.priceMax = projectDetails.getPriceMax() != null ? projectDetails.getPriceMax() : 0.0;
        this.allInclusive = projectDetails.getAllInclusive();
        this.Amenities = projectDetails.getAmenities();
        // this.coveredParking = projectDetails.getCoveredParking() != null ? projectDetails.getCoveredParking() : 0;
        this.coveredParking = projectDetails.getCoveredParking();
        this.bankApproved = projectDetails.getBankApproved();
        this.banks = convertJsonToList(projectDetails.getBanks());
        // this.priceStartingFrom = this.priceMin; 
    
        this.projectLaunch = projectDetails.getProjectLaunch() != null 
            ? sdf.format(projectDetails.getProjectLaunch()) 
            : null; // Convert Date to String

        this.projectPlannedEnd = projectDetails.getProjectPlannedEnd() != null 
            ? sdf.format(projectDetails.getProjectPlannedEnd()) 
            : null; // Convert Date to String
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
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public String getProjectAddress() { return projectAddress; }
    public void setProjectAddress(String projectAddress) { this.projectAddress = projectAddress; }

    public String getProjectVideo() { return projectVideo; }
    public void setProjectVideo(String projectVideo) { this.projectVideo = projectVideo; }

    public List<String> getProjectPictures() { return projectPictures; }
    public void setProjectPictures(List<String> projectPictures) { this.projectPictures = projectPictures; }

    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }

    public String getProjectStatus() { return projectStatus; }
    public void setProjectStatus(String projectStatus) { this.projectStatus = projectStatus; }

    public String getProjectLaunch() { return projectLaunch; }
    public void setProjectLaunch(String projectLaunch) { this.projectLaunch = projectLaunch; }

    public String getProjectPlannedEnd() { return projectPlannedEnd; }
    public void setProjectPlannedEnd(String projectPlannedEnd) { this.projectPlannedEnd = projectPlannedEnd; }

    public Integer getPriceMin() { return priceMin; }
    public void setPriceMin(Integer priceMin) { this.priceMin = priceMin; }

    public Integer getPriceMax() { return priceMax; }
    public void setPriceMax(Integer priceMax) { this.priceMax = priceMax; }

    // public Boolean getAllInclusive() { return allInclusive; }
    // public void setAllInclusive(String allInclusive) { this.allInclusive = allInclusive; }

    public Boolean getAllInclusive() { return allInclusive; }
    public void setAllInclusive(Boolean allInclusive) { this.allInclusive = allInclusive; }

    public String getAmenities() { return Amenities; }
    public void setAmenities(String Amenities) { this.Amenities = Amenities; }

    // public List<String> getAllInclusiveAmenities() { return allInclusive; }
    // public void setAllInclusiveAmenities(List<String> allInclusiveAmenities) { this.allInclusiveAmenities = allInclusiveAmenities; }

    public String getCoveredParking() { return coveredParking; }
    public void setCoveredParking(String coveredParking) { this.coveredParking = coveredParking; }

    public Boolean getBankApproved() { return bankApproved; }
    public void setBankApproved(Boolean bankApproved) { this.bankApproved = bankApproved; }

    public List<String> getBanks() { return banks; }
    public void setBanks(List<String> banks) { this.banks = banks; }
}
