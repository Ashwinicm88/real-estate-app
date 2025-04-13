package com.example.real_estate.api.dto;

import java.util.Date;

import lombok.*;

@Getter
@Setter
public class ProjectDetailsDTO {
    private Integer units;
    private String projectStatus;
    private Date projectLaunch;
    private Date projectPlannedEnd;
    private Integer priceMin;
    private Integer priceMax;
    private Boolean allInclusive;
    private Boolean bankApproved;
    private String coveredParking;
    private String banks;
}
