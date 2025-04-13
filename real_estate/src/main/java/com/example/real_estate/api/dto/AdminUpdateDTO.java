package com.example.real_estate.api.dto;

import com.example.real_estate.api.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.*;

@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminUpdateDTO {

    // ✅ Project Identification
    @JsonIgnore
    private Integer projectId;

    // ==== Organisation ====
   private OrganizationDTO organisation;

    // ==== Project ====
    private ProjectDTO project;

    // @JsonProperty("projectimages")
    // private List<String> projectImages;

    // ==== Project Details ====
    private ProjectDetailsDTO projectDetails;

    // ✅ Updated Amenities and Nearby
    @JsonProperty("amenities")
    private Map<String, List<String>> amenities;

    @JsonProperty("nearby")
    private Map<String, List<String>> nearby;

    // ✅ Expert Review
    @JsonProperty("expertReview")
    private ExpertReview expertReview;

    // ✅ BHK Configs
    @JsonProperty("oneBHKConfig")
    private List<OneBHKConfigDTO> oneBHKConfig;

    @JsonProperty("twoBHKConfig")
    private List<TwoBHKConfigDTO> twoBHKConfig;

    @JsonProperty("threeBHKConfig")
    private List<ThreeBHKConfigDTO> threeBHKConfig;

    @JsonProperty("fourBHKConfig")
    private List<FourBHKConfigDTO> fourBHKConfig;

    @JsonProperty("fiveBHKConfig")
    private List<FiveBHKConfigDTO> fiveBHKConfig;

    @JsonProperty("penthouseConfig")
    private List<PenthouseConfigDTO> penthouseConfig;

    // ✅ Project Timeline
    @JsonProperty("projectTimeline")
    private List<ProjectTimeLine> projectTimeline;
}
