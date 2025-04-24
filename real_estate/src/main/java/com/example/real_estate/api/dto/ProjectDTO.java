package com.example.real_estate.api.dto;

import java.util.List;

import lombok.*;
@Getter
@Setter
public class ProjectDTO {
    private Integer projectId;
    private String projectName;
    private String city;
    private String locality;
    private Double latitude;
    private Double longitude;
    private Integer propertyAreaSqmt;
    private String reraNumber;
    private String address;
    private List<String> projectVideoLink;
    private List<String> projectImages;
    private String propertyType;
    private String reralink;
}
