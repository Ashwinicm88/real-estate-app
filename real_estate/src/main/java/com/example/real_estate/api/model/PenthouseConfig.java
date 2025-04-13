

package com.example.real_estate.api.model;
import org.hibernate.annotations.JdbcTypeCode;
// import org.hibernate.annotations.processing.SQL;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Represents the configuration details for Penthouse units in a real estate project.
 * This entity is linked to the {@link Project} entity.
 */
@Entity
@Table(name = "penthouse_config",uniqueConstraints = @UniqueConstraint(columnNames = {"project_id","type_number"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PenthouseConfig {

    /**
     * Unique identifier for the Penthouse configuration.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "penthouse_config_id")
    private Integer penthouseConfigId; // Changed from Integer to Long

     /**
     * The project to which this configuration belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // Added Lazy Fetch
    @JoinColumn(name = "project_id", nullable = false)
    @JsonBackReference
    private Project project;
    /**
     * The project to which this Penthouse configuration belongs.
     */


    @Min(value = 1, message = "Type number must be greater than 0")
    @Column(name = "type_number")
    private Integer typeNumber;

    @Min(value = 1, message = "Bedrooms must be greater than 0")
    @NotNull(message = "Bedrooms cannot be null")
    @Column(name = "penthouse_bedrooms")
    private Integer penthouseBedrooms;
    /**
     * Number of penthouse units available in this configuration.
     */
    @NotNull(message = "Units cannot be null")
    @Min(value = 1, message = "Units must be greater than 0")
    @Column(name = "penthouse_units", nullable = false)
    private Integer penthouseUnits;

    /**
     * Total area of the penthouse unit (in square feet).
     */
    @NotNull(message = "Area cannot be null")
    @Min(value = 1, message = "Area must be greater than 0")
    @Column(name = "penthouse_area", nullable = false)
    private Integer penthouseArea;

    /**
     * Floor plan details for the penthouse unit.
     */
    @JdbcTypeCode(SqlTypes.JSON)// Changed from columnDefinition = "TEXT"
    @Column(name = "penthouse_floor_plan")
    private List<String> penthouseFloorPlan=new ArrayList<>();

    /**
     * Image URLs for the penthouse unit.
     */
    // Changed from columnDefinition = "TEXT"
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "penthouse_images")
    private List<String> penthouseImages=new ArrayList<>();

    /**
     * Number of bathrooms in the penthouse unit.
     */
    @NotNull(message = "Number of bathrooms cannot be null")
    @Min(value = 1, message = "Bathrooms must be at least 1")
    @Max(value = 8, message = "Bathrooms cannot exceed 8") // Logical limit
    @Column(name = "penthouse_bathrooms", nullable = false)
    private Integer penthouseBathrooms;

    /**
     * Number of balconies in the penthouse unit.
     */
    @NotNull(message = "Number of balconies cannot be null")
    @Min(value = 0, message = "Balconies must be 0 or more")
    @Max(value = 10, message = "Balconies cannot exceed 10") // Logical limit
    @Column(name = "penthouse_balcony", nullable = false)
    private Integer penthouseBalcony;

    /**
     * Number of parking spaces available for the penthouse unit.
     */
    @NotNull(message = "Number of parking spaces cannot be null")
    @Min(value = 0, message = "Parking spaces must be 0 or more")
    @Max(value = 5, message = "Parking spaces cannot exceed 5") // Logical limit
    @Column(name = "penthouse_parking", nullable = false)
    private Integer penthouseParking;

     // Hall area in square feet.
    
   @Column(name = "hall_area")
   private String hallArea; 

   /**
    * Kitchen area in square feet.
    */
   @Column(name = "kitchen_area")
   private String kitchenArea;
/**
    * Area of the first bedroom.
    */
    @Column(name = "bedroom_1_area")
    private String bedroom1Area;
 /**
    * Area of the first bedroom.
    */
    @Column(name = "bedroom_2_area")
    private String bedroom2Area;

    @Column(name = "bedroom_3_area")
    private String bedroom3Area;

    @Column(name = "bedroom_4_area")
    private String bedroom4Area;

    @Column(name = "bedroom_5_area")
    private String bedroom5Area;

    @Column(name = "bedroom_6_area")
    private String bedroom6Area;
    /**
     * Area of the first bathroom.
     */
    @Column(name = "bathroom_1_area")
    private String bathroom1Area;
 
    /**
     * Area of the second bathroom (if applicable).
     */
    @Column(name = "bathroom_2_area")
    private String bathroom2Area;

    @Column(name = "bathroom_3_area")
    private String bathroom3Area;

    @Column(name = "bathroom_4_area")
    private String bathroom4Area;

    @Column(name = "bathroom_5_area")
    private String bathroom5Area;    

    @Column(name = "bathroom_6_area")
    private String bathroom6Area;    
}

