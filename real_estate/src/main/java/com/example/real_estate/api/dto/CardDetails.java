package com.example.real_estate.api.dto;
import java.util.List;

import com.example.real_estate.api.model.FourBHKConfig;
import com.example.real_estate.api.model.OneBHKConfig;
// import com.example.real_estate.api.model.Amenities;
// import com.example.real_estate.api.model.Nearby;
import com.example.real_estate.api.model.ThreeBHKConfig;
import com.example.real_estate.api.model.TwoBHKConfig;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class CardDetails {  

    //Project Details
    private Integer projectId;
    private String projectName;
    private String address;
    private List<String> projectImages;
    private List<String> projectVideoLink;
    private String reralink;
    private String city;

    //PpojectDetails  details
    private Integer priceMin;
    private Integer priceMax;

    // Amenities inside "details"
    @JsonProperty("Amenities")
    private AmenitiesDto amenities;


    @JsonProperty("Nearby")
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
