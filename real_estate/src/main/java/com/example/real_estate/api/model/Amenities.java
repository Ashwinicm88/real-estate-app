package com.example.real_estate.api.model;


import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="amenities")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Amenities {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_id")
    private Integer amenityId;
   
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonBackReference
    private Project project;


    @Column(name = "swimming_pool", columnDefinition = "TEXT")
    private String  swimming_pool;


    @Column(name="temple",columnDefinition = "TEXT")
    private String temple;


    @Column(name="gym",columnDefinition = "TEXT")
    private String gym;


    @Column(name="creche",columnDefinition = "TEXT")
    private String creche;


    @Column(name="children_parks", columnDefinition = "TEXT")
    private String children_parks;


    @Column(name="park", columnDefinition="TEXT")
    private String park;


    @Column(name="club_house", columnDefinition = "TEXT")
    private String club_house;


    @Column(name="c_hall", columnDefinition = "TEXT")
    private String c_hall;


    @Column(name="other", columnDefinition = "TEXT")
    private String other;


    public Amenities(Project project,String swimming_pool,String temple,String gym,
    String creche,String children_parks, String park, String club_house, String c_hall, String other){
        this.project=project;
        this.swimming_pool=swimming_pool;
        this.temple=temple;
        this.gym=gym;
        this.creche=creche;
        this.children_parks=children_parks;
        this.park=park;
        this. club_house=club_house;
        this.c_hall=c_hall;
        this.other=other;
    }
   
}


