package com.example.real_estate.api.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OneBHKConfigDTO {
    private Integer oneBhkConfigId;
    private Integer typeNumber;
    private Integer type1Units;
    private Integer type1Area;
   
    private Integer type1Bathrooms;
    private Integer type1Balcony;
    private Integer type1Parking;
    private String hallArea;
    private String kitchenArea;
    private String bedroom1Area;
    private String bathroom1Area;
    private String bathroom2Area;
}
