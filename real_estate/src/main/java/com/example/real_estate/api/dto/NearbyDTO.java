package com.example.real_estate.api.dto;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;


// import java.util.List;


@Getter
@Setter
public class NearbyDTO {
    private String schools;
    private String hospitals;
    //  @JsonProperty("it_parks") // mapping frontend 'it_parks' to 'it_Parks'
    private String it_parks;
    private String hangouts;
    private String cinemas;
    private String metro;
}
