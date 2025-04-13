package com.example.real_estate.api.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FourBHKConfigDTO {

    private Integer fourBhkConfigId;

    private Integer typeNumber;

    private Integer type4Bedrooms;

    private Integer type4Units;

    private Integer type4Area;

    private Integer type4Bathrooms;

    private Integer type4Balcony;

    private Integer type4Parking;

    private String hallArea;

    private String kitchenArea;

    private String bedroom1Area;

    private String bedroom2Area;

    private String bedroom3Area;

    private String bedroom4Area;

    private String bathroom1Area;

    private String bathroom2Area;

    private String bathroom3Area;

    private String bathroom4Area;
}
