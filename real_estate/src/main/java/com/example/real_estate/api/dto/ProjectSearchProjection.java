package com.example.real_estate.api.dto;
import java.util.List;


public class ProjectSearchProjection {
    private Integer projectId;
    private String projectName;
    private int projectAreaSqmt;
    private List<String> projectImages;
    private Double latitude;
    private Double longitude;
    private String city;
    private String address;
    private int units;
    private int priceMin;
    private int priceMax;
    private List<String> availableBHKs;


    // ✅ No-argument constructor (for frameworks like Jackson, JPA)
    public ProjectSearchProjection() {}


    // ✅ Correct Constructor (Removed `int` return type)
    public ProjectSearchProjection(Integer projectId, String projectName, int projectAreaSqmt, List<String> projectImages,Double latitude, Double longitude,
                                   String city, String address,int units, int priceMin, int priceMax, List<String> availableBHKs) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectAreaSqmt = projectAreaSqmt;
        this.projectImages = projectImages;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.address=address;
        this.units = units;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.availableBHKs=availableBHKs;
    }


    // ✅ Getters & Setters


    public Integer getProjectId() { return projectId; }
    public void setProjectId(Integer projectId) { this.projectId = projectId; }
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }


    public int getProjectAreaSqmt() { return projectAreaSqmt; }
    public void setProjectAreaSqmt(int projectAreaSqmt) { this.projectAreaSqmt = projectAreaSqmt; }


    public List<String> getProjectImages() { return projectImages; }
    public void setProjectImages(List<String> projectImages) { this.projectImages = projectImages; }


    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }


    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude){this.longitude=longitude;}


    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }


    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }


    public int getUnits() { return units; }
    public void setUnits(int units) { this.units = units; }


    public int getPriceMin() { return priceMin; }
   
    public void setPriceMin(int priceMin) { this.priceMin = priceMin; }


    public int getPriceMax() { return priceMax; }
    public void setPriceMax(int priceMax) { this.priceMax = priceMax; }


    public List<String> getAvailableBHKs() { return availableBHKs; }
    public void setAvailableBHKs(List<String> availableBHKs) { this.availableBHKs = availableBHKs; }
}


