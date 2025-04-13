package com.example.real_estate.api.dto;

import lombok.*;


@Getter
@Setter
public class OrganizationDTO {
    private Integer orgId;
    private String orgName;
    private String orgCin;
    private String orgOwners;
    private Integer projectCompleted;
}
