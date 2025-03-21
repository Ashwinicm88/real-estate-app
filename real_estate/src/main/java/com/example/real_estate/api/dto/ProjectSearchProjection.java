// package com.example.real_estate.api.dto;
// import java.util.List;

// public class ProjectSearchProjection {
//     private String projectName;
//     private int projectAreaSqmt;
//     private List<String> projectImages;
//     private String city;
//     private int units;
//     private int priceMin;
//     private int priceMax;

//         // ✅ No-argument constructor (for frameworks like Jackson, JPA)
//         public ProjectSearchProjection() {}
//     // Constructor
//     public int ProjectSearchProjection(String projectName, int projectAreaSqmt, List<String> projectImages,
//                       String city, int units, int priceMin, int priceMax) {
//         this.projectName = projectName;
//         this.projectAreaSqmt = projectAreaSqmt;
//         this.projectImages = projectImages;
//         this.city = city;
//         this.units = units;
//         this.priceMin = priceMin;
//         this.priceMax = priceMax;
//     }

//     // Getters & Setters
//     public String getProjectName() { return projectName; }
//     public int getProjectAreaSqmt() { return projectAreaSqmt; }
//     public List<String> getProjectImages() { return projectImages; }
//     public String getCity() { return city; }
//     public int getUnits() { return units; }
//     public int getPriceMin() { return priceMin; }
//     public int getPriceMax() { return priceMax; }
// }
package com.example.real_estate.api.dto;
import java.util.List;

public class ProjectSearchProjection {
    private String projectName;
    private int projectAreaSqmt;
    private List<String> projectImages;
    private String city;
    private int units;
    private int priceMin;
    private int priceMax;

    // ✅ No-argument constructor (for frameworks like Jackson, JPA)
    public ProjectSearchProjection() {}

    // ✅ Correct Constructor (Removed `int` return type)
    public ProjectSearchProjection(String projectName, int projectAreaSqmt, List<String> projectImages,
                                   String city, int units, int priceMin, int priceMax) {
        this.projectName = projectName;
        this.projectAreaSqmt = projectAreaSqmt;
        this.projectImages = projectImages;
        this.city = city;
        this.units = units;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
    }

    // ✅ Getters & Setters
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public int getProjectAreaSqmt() { return projectAreaSqmt; }
    public void setProjectAreaSqmt(int projectAreaSqmt) { this.projectAreaSqmt = projectAreaSqmt; }

    public List<String> getProjectImages() { return projectImages; }
    public void setProjectImages(List<String> projectImages) { this.projectImages = projectImages; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public int getUnits() { return units; }
    public void setUnits(int units) { this.units = units; }

    public int getPriceMin() { return priceMin; }
    public void setPriceMin(int priceMin) { this.priceMin = priceMin; }

    public int getPriceMax() { return priceMax; }
    public void setPriceMax(int priceMax) { this.priceMax = priceMax; }
}
