package com.example.real_estate.api.dto;
// import java.util.Date;
import java.util.List;
import java.util.Map;

import com.example.real_estate.api.model.FourBHKConfig;
import com.example.real_estate.api.model.OneBHKConfig;
// import com.example.real_estate.api.model.ProjectDetails;
// import com.example.real_estate.api.model.Amenities;
// import com.example.real_estate.api.model.Nearby;
import com.example.real_estate.api.model.ThreeBHKConfig;
import com.example.real_estate.api.model.TwoBHKConfig;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AdminAllDTO {  

   private OrganizationDTO organization;

    //Project Details
    private ProjectDTO project;

    //PpojectDetails  details
    private ProjectDetailsDTO projectDetails;

// Amenities inside "details"
@JsonProperty("amenities")
    private AmenitiesDto amenities;

    @JsonProperty("nearby")
    private NearbyDTO nearby;


    @JsonProperty("oneBHKConfig")
    private List<OneBHKConfig> oneBHKConfig;



    @JsonProperty("twoBHKConfig")
    private List<TwoBHKConfig> twoBHKConfig;


    @JsonProperty("threeBHKConfig")
    private List<ThreeBHKConfig> threeBHKConfig;

    @JsonProperty("fourBHKConfig")
    private List<FourBHKConfig> fourBHKConfig;

    @JsonProperty("expertReview")
    private ExpertReviewDto expertReview;


    public void setAvailableBHKs(List<String> availableBHKs) {
        throw new UnsupportedOperationException("Unimplemented method 'setAvailableBHKs'");
    }

}
