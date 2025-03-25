package com.example.real_estate.api.dto;

import java.util.List;

import com.example.real_estate.api.model.OneBHKConfig;
import com.example.real_estate.api.model.Amenities;
import com.example.real_estate.api.model.Nearby;
import com.example.real_estate.api.model.ThreeBHKConfig;
import com.example.real_estate.api.model.TwoBHKConfig;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardDetails {

    //Project Details
    private String projectName;
    private String address;
    private List<String> projectImages;


    //PpojectDetails  details
    private Integer priceMin;
    private Integer priceMax;


   //amenities details
   private List<String> swimming_Pool;
   private List<String> gym;
   private List<String> temple;
   private List<String> park;
   private List<String> creche;
   private List<String> children_parks;
   private List<String> club_house;
   private List<String> c_hall;
   private List<String> other;

   
    // nearby details
    private List<String> schools;
    private List<String> hospitals;
    private List<String> it_parks;
    private List<String> hangouts;
    private List<String> cinemas;
    private List<String> metro;

    @JsonProperty("oneBHKConfig")
    private List<OneBHKConfig> oneBHKConfig;

    @JsonProperty("twoBHKConfig")
    private List<TwoBHKConfig> twoBHKConfig;

    @JsonProperty("threeBHKConfig")
    private List<ThreeBHKConfig> threeBHKConfig;
}
