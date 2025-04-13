package com.example.real_estate.api.dto;


import com.example.real_estate.api.model.*;
import com.fasterxml.jackson.annotation.JsonProperty;


// import jakarta.validation.constraints.*;
import lombok.*;


import java.util.*;


/**
 * DTO class for dynamically saving data into different tables.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateEntityRequest {

    //Organisation
    private Integer projectId;
    private String organisationName;
    private String organisationCin;
    private String organisationOwners;
    private Integer projectsCompleted;

    //Project
    private String projectName;
    private String city;
    private String locality;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double propertyAreaSqmt;
    private String reraNumber;
    private String reraLink;
    private String projectVideoLink;
    private String preferred;
    private String propertyType;


    @JsonProperty("projectimages")
    private List<String> projectImages;
    
     // Project Details Fields
     private Integer units;
     private String projectStatus;
     private Date projectLaunch;
     private Date projectPlannedEnd;
     private Integer priceMin;
     private Integer priceMax;
     private Boolean allInclusive;
     
    //  private String amenities;
     private String coveredParking;
     private Boolean bankApproved;
     private String banks;

      // **Updated Amenities Structure**
    @JsonProperty("amenities")
    private Map<String, List<String>> amenities;

    // **Updated Nearby Structure**
    @JsonProperty("nearby")
    private Map<String, List<String>> nearby;


    @JsonProperty("expertReview")
    private ExpertReview expertReview;
    // private String reviewText;


    // BHK Configurations
    @JsonProperty("oneBHKConfig")
    private List<OneBHKConfig> oneBHKConfig;
   


    @JsonProperty("twoBHKConfig")
    private List<TwoBHKConfig> twoBHKConfig;


    @JsonProperty("threeBHKConfig")
    private List<ThreeBHKConfig> threeBHKConfig;


    @JsonProperty("fourBHKConfig")
    private List<FourBHKConfig> fourBHKConfig;


    @JsonProperty("fiveBHKConfig")
    private List<FiveBHKConfig> fiveBHKConfig;


    @JsonProperty("penthouseConfig")
    private List<PenthouseConfig> penthouseConfig;


    // New Field: Project Timeline
    @JsonProperty("projectTimeline")
    private List<ProjectTimeLine> projectTimeline;


   
}
