package com.example.real_estate.api.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PenthouseConfigDTO {

    private Integer penthouseConfigId;

    private Integer typeNumber;

    private Integer penthouseBedrooms;

    private Integer penthouseUnits;

    private Integer penthouseArea;

    private List<String> penthouseFloorPlan;

    private List<String> penthouseImages;

    private Integer penthouseBathrooms;

    private Integer penthouseBalcony;

    private Integer penthouseParking;

    private String hallArea;

    private String kitchenArea;

    private String bedroom1Area;

    private String bedroom2Area;

    private String bedroom3Area;

    private String bedroom4Area;

    private String bedroom5Area;

    private String bedroom6Area;

    private String bathroom1Area;

    private String bathroom2Area;

    private String bathroom3Area;

    private String bathroom4Area;

    private String bathroom5Area;

    private String bathroom6Area;
}
