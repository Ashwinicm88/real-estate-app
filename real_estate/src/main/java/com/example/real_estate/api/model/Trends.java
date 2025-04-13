package com.example.real_estate.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trends")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Trends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="location", length = 255)
    private String location;

    @Column(name="ready_reckoner",length = 255)
    private String readyreckoner;

    @Column(name = "rate_2000")
    private Double rate2000;

    @Column(name = "rate_2005")
    private Double rate2005;

    @Column(name = "rate_2010")
    private Double rate2010;

    @Column(name = "rate_2015")
    private Double rate2015;

    @Column(name = "rate_2020")
    private Double rate2020;

    @Column(name = "rate_2025")
    private Double rate2025;

    @Column(name = "rate_2030")
    private Double rate2030;

    @Column(name = "rate_2035")
    private Double rate2035;
}
