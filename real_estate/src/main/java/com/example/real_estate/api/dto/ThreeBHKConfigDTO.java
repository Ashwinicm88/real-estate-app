package com.example.real_estate.api.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThreeBHKConfigDTO {

    private Integer threeBhkConfigId;

    private Integer typeNumber;

    private Integer type3Bedrooms;

    private Integer type3Units;

    private Integer type3Area;

    private Integer type3Bathrooms;

    private Integer type3Balcony;

    private Integer type3Parking;

    private String hallArea;

    private String kitchenArea;

    private String bedroom1Area;

    private String bedroom2Area;

    private String bedroom3Area;

    private String bathroom1Area;

    private String bathroom2Area;

    private String bathroom3Area;
}
