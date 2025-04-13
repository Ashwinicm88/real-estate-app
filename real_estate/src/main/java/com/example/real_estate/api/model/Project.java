package com.example.real_estate.api.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
// import org.apache.olingo.commons.api.edm.geo.SRID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.*;


// import org.hibernate.annotations.JdbcType;
@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"projectDetails", "oneBhkConfig", "twoBhkConfig", "threeBhkConfig", "fourBhkConfig", "fiveBhkConfig", "penthouseBhkConfig", "timelines", "expertReviews", "amenities", "nearby"})
public class Project {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer projectId;


    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false)
    @JsonIgnore
    private Organisation organisation;


    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProjectDetails> projectDetails;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Amenities> amenities;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Nearby> nearby;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "oneBhkConfig")
    private List<OneBHKConfig> oneBhkConfig;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TwoBHKConfig> twoBhkConfig;


    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ThreeBHKConfig> threeBhkConfig;


    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FourBHKConfig> fourBhkConfig;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FiveBHKConfig> fiveBhkConfig;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PenthouseConfig> penthouseBhkConfig;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectTimeLine> timelines;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExpertReview> expertReviews;

    @NotNull(message = "Project name is required")
    @Column(name = "projectname", length = 200, nullable = false)
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    private String projectName;


    @NotNull(message = "City is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    @Column(name = "city", length = 50, nullable = false, columnDefinition = "VARCHAR(50)")
    private String city;


    @NotNull(message = "Locality is required")
    @Pattern(regexp = "^[A-Za-z\s]+$", message = "Invalid format")
    @Column(name = "locality", length = 100, nullable = false)
    private String locality;


    @NotNull(message = "Address is required")
    @Pattern(regexp = "^[A-Za-z0-9.,&\\s]+$", message = "Invalid format")
    @Column(name = "address", length = 500, nullable = false)
    private String address;


    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;


    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;


    @NotNull(message = "Property area is required")
    @Column(name = "propertyarea_sqmt", nullable = false)
    @Max(value = 999, message = "Property area is too high")
    private Integer propertyAreaSqmt;


    @Pattern(message = "RERA number should contain only numbers and letters", regexp = "^[A-Za-z0-9]+$")
    @Column(name = "reranumber")
    private String reraNumber;


    @Column(name = "reralink", length = 255)
    private String reraLink;


    @Column(name = "projectvideolink", length = 255)
    private String projectVideoLink;


    // @JdbcTypeCode(SqlTypes.JSON)


    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "projectimages")
    private List<String> projectImages = new ArrayList<>();

    @Column(columnDefinition = "TEXT DEFAULT 'N'")
    private String preferred="N";  
   
    @Column(name = "deleted", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean deleted = false;

    @Column(name="typeproperty")
    private String propertyType;

    @CreationTimestamp
    @Column(name = "created_at",updatable=false)
    @Temporal(TemporalType.DATE)
    private Date createdAt;    

    // ✅ Corrected Constructor
    public Project(Organisation organisation, String projectName, String city, String locality, String address,
            Double latitude, Double longitude, Integer propertyAreaSqmt,
            String reraNumber, String reraLink, String projectVideoLink,
            List<String> projectImages, String preferred, Boolean deleted, String propertyType) {


        this.organisation = organisation;
        this.projectName = projectName;
        this.city = city;
        this.locality = locality;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.propertyAreaSqmt = propertyAreaSqmt;
        this.reraNumber = reraNumber;
        this.reraLink = reraLink;
        this.projectVideoLink = projectVideoLink;
        this.projectImages = projectImages;
        this.preferred = preferred;
        this.deleted = deleted; // Now correctly assigned
        this.propertyType=propertyType;
    }
    // public Project orElse(Object object) {
     
    //     throw new UnsupportedOperationException("Unimplemented method 'orElse'");
    // }
    // public Project orElseThrow(Object object) {
    //     throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    // }

}


