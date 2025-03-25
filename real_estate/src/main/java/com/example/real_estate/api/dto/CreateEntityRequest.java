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

    @JsonProperty("projectimages")
    private List<String> projectImages;

    // @JsonProperty("schools")
    // private List<String> schools;

    // @JsonProperty("hospitals")
    // private List<String> hospitals;

    // @JsonProperty("malls")
    // private List<String> malls;

    // @JsonProperty("movieTheaters")
    // private List<String> movieTheaters;

    // @JsonProperty("itParks")
    // private List<String> itParks;

    // @JsonProperty("hangouts")
    // private List<String> hangouts;

    // @JsonProperty("metro")
    // private List<String> metro;


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


    //Amenities Details
    @JsonProperty("swimming_pool")
    private List<String> swimming_pool;

    @JsonProperty("temple")
    private List<String> temple;

    @JsonProperty("gym")
    private List<String> gym;

    @JsonProperty("creche")
    private List<String> creche;

    @JsonProperty("children_parks")
    private List<String> children_parks;

    @JsonProperty("park")
    private List<String> park;

    @JsonProperty("club_house")
    private List<String> club_house;

    @JsonProperty("c_hall")
    private List<String> c_hall;

    @JsonProperty("other")
    private List<String> other;

    //Nearby Details

    @JsonProperty("schools")
    private List<String> schools;

    @JsonProperty("hospitals")
    private List<String> hospitals;

    @JsonProperty("malls")
    private List<String> malls;

    @JsonProperty("itParks")
    private List<String> it_parks;

    @JsonProperty("hangouts")
    private List<String> hangouts;

    @JsonProperty("cinemas")
    private List<String> cinemas;

    @JsonProperty("metro")
    private List<String> metro;

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
