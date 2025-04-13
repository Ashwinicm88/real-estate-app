package com.example.real_estate.api.dto;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TwoBHKConfigDTO {
    private Integer twoBhkConfigId;
    private Integer typeNumber;
    private Integer type2Units;
    private Integer type2Area;
    private Integer type2Bathrooms;
    private Integer type2Bedrooms;
    private Integer type2Balcony;
    private Integer type2Parking;
    private String hallArea;
    private String kitchenArea;
    private String bedroom1Area;
    private String bedroom2Area;
    private String bathroom1Area;
    private String bathroom2Area;
}
