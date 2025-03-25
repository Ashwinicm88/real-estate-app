package com.example.real_estate.api.dto;

import com.example.real_estate.api.model.*;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetEntityResponse {
    //Organisation detials
    private String organisationName;
    private String organisationCin;
    private String organisationOwners;
    private int projectsCompleted;


    //project details
    private String projectName;
    private String city;
    private String locality;
    private String address;
    private double latitude;
    private double longitude;
    private int propertyAreaSqmt;
    private String reraNumber;
    private String reraLink;
    private String projectVideoLink;
    private List<String> projectImages;
    private Boolean preferred;

    //project_details details
    private int units;
    private String projectStatus;
    private String projectLaunch;
    private String projectPlannedEnd;
    private double priceMin;
    private double priceMax;
    private boolean allInclusive;
    // private String amenities;
    private String coveredParking;
    private boolean bankApproved;
    private String banks;

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
    private List<String> malls;
    private List<String> cinemas;
    private List<String> metro;


    private OneBHKConfig oneBHKConfig;
    private TwoBHKConfig twoBHKConfig;
    private ThreeBHKConfig threeBHKConfig;
    private FourBHKConfig fourBHKConfig;
    private FiveBHKConfig fiveBHKConfig;
    private PenthouseConfig penthouseConfig;
    private ProjectTimeLine projectTimeLine;
}
