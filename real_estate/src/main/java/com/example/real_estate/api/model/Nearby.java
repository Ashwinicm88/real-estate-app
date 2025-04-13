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
@Table(name="nearby")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Nearby {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nearby_id")
    private Integer nearId;
   
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    @JsonBackReference
    private Project project;


    @Column(name = "schools", columnDefinition = "TEXT")
    private String  schools;


    @Column(name="hospitals",columnDefinition = "TEXT")
    private String hospitals;


    @Column(name="it_parks",columnDefinition = "TEXT")
    private String it_parks;


    @Column(name="hangouts",columnDefinition = "TEXT")
    private String hangouts;


    @Column(name="cinemas", columnDefinition = "TEXT")
    private String cinemas;


    @Column(name="metro", columnDefinition="TEXT")
    private String metro;


    public Nearby(Project project,String schools,String hospitals,String itParks,
    String hangouts,String cinemas, String metro){
        this.project=project;
        this.schools=schools;
        this.hospitals=hospitals;
        this.it_parks=itParks;
        this.hangouts=hangouts;
        this.cinemas=cinemas;
        this.metro=metro;
    }


    public Nearby orElse(Nearby nearby) {
        
        throw new UnsupportedOperationException("Unimplemented method 'orElse'");
    }


    public Nearby orElseGet(Object object) {
       
        throw new UnsupportedOperationException("Unimplemented method 'orElseGet'");
    }
   
}


