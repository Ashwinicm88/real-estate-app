package com.example.real_estate.api.controller;

import com.example.real_estate.api.dto.*;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectDetails;
// import com.example.real_estate.api.model.Project;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.service.EntityService;
import com.example.real_estate.api.service.FileStorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import com.example.real_estate.api.repository.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

/**
 * REST Controller for managing multiple entity types dynamically.
 */

@RestController
@RequestMapping("/api/entities")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class EntityController {

    // private static final Logger logger = LoggerFactory.getLogger(EntityController.class);
    private final EntityService entityService;
    private final FileStorageService fileStorageService;

    @Autowired
    private ProjectDetailsRepository projectDetailsRepository;

    @Autowired
    private ProjectRepository projectRepository;
    

   
    @PostMapping(value="/create", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> createEntity(
            // @Valid @RequestBody CreateEntityRequest request, BindingResult result
            @RequestPart("data") String jsonData,
            @RequestPart(value="images",required = false) List<MultipartFile>images,
            @RequestPart(value = "video",required = false) MultipartFile video,
            @RequestParam Map<String, MultipartFile> allFiles // Capture all dynamic files
    
    
            ) throws JsonProcessingException {
    
        // Send files to FileUploadController and get URLs
        List<String> imageUrls = (images !=null && !images.isEmpty())? fileStorageService.uploadSingleImages(images):new ArrayList<>();
        String videoUrl = (video != null && !video.isEmpty()) ? fileStorageService.uploadVideo(video) : null;
    
        // ✅ Prepare OneBHKConfig Image Maps
        Map<Integer, List<String>> oneBHKType1ImageUrls = new HashMap<>();
        Map<Integer, List<String>> oneBHKType1FloorPlanUrls = new HashMap<>();
    
        Map<Integer, List<String>> twoBHKType2ImageUrls = new HashMap<>();  // ✅ Declare TwoBHK map
        Map<Integer, List<String>> twoBHKType2FloorPlanUrls = new HashMap<>();  // ✅ Declare TwoBHK floor plan map
    
    
        Map<Integer, List<String>> threeBHKType3ImageUrls = new HashMap<>();  // ✅ Declare TwoBHK map
        Map<Integer, List<String>> threeBHKType3FloorPlanUrls = new HashMap<>();  // ✅ Declare TwoBHK floor plan map
    
    
        
        Map<Integer, List<String>> fourBHKType4ImageUrls = new HashMap<>();  // ✅ Declare TwoBHK map
        Map<Integer, List<String>> fourBHKType4FloorPlanUrls = new HashMap<>();  // ✅ Declare TwoBHK floor plan map
    
    
        
        Map<Integer, List<String>> fiveBHKType5ImageUrls = new HashMap<>();  // ✅ Declare TwoBHK map
        Map<Integer, List<String>> fiveBHKType5FloorPlanUrls = new HashMap<>();  // ✅ Declare TwoBHK floor plan map
    
    
        
        Map<Integer, List<String>> penthouseTypeImageUrls = new HashMap<>();  // ✅ Declare TwoBHK map
        Map<Integer, List<String>> penthouseTypeFloorPlanUrls = new HashMap<>();  // ✅ Declare TwoBHK floor plan map
    
    
        for (Map.Entry<String, MultipartFile> entry : allFiles.entrySet()) {
            String key = entry.getKey();
            MultipartFile file = entry.getValue();
    
    
            if (key.startsWith("oneBHKType1Images_")) {
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                oneBHKType1ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if (key.startsWith("oneBHKType1FloorPlanImages_")) {
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                oneBHKType1FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if (key.startsWith("twoBHKType2Images_")) {
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                twoBHKType2ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if (key.startsWith("twoBHKType2FloorPlanImages_")) {
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                twoBHKType2FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if (key.startsWith("threeBHKType3Images_")) {
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                threeBHKType3ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if (key.startsWith("threeBHKType3FloorPlanImages_")) {
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                threeBHKType3FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));  
            }
            else if(key.startsWith("fourBHKType4Images_")){
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                fourBHKType4ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if(key.startsWith("fourBHKType4FloorPlanImages_")){
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                fourBHKType4FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if(key.startsWith("fiveBHKType5Images_")){
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                fiveBHKType5ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if(key.startsWith("fiveBHKType5FloorPlanImages_")){
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                fiveBHKType5FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if(key.startsWith("penthouseTypeImages_")){
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                penthouseTypeImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            else if(key.startsWith("penthouseTypeFloorPlanImages_")){
                int typeNumber = Integer.parseInt(key.split("_")[1]); // Extract typeNumber
                penthouseTypeFloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
                        .add(fileStorageService.uploadImages(Collections.singletonList(file)).get(0));
            }
            // else if(key.startsWith("twoBHKTyp2Images_")){
            //     int typeNumber=Integer.parseInt(key)
            // }
        }
        entityService.createEntity(jsonData, imageUrls, videoUrl,oneBHKType1ImageUrls,oneBHKType1FloorPlanUrls,twoBHKType2ImageUrls,twoBHKType2FloorPlanUrls,threeBHKType3ImageUrls,threeBHKType3FloorPlanUrls,fourBHKType4ImageUrls,fourBHKType4FloorPlanUrls,
        fiveBHKType5ImageUrls,fiveBHKType5FloorPlanUrls,penthouseTypeImageUrls,penthouseTypeFloorPlanUrls);
        //  ,twoBHKType2ImageUrls,twoBHKType2FloorPlanUrls
        //  ,threeBHKType3ImageUrls,threeBHKType3FloorPlanUrls,fourBHKType4ImageUrls,fourBHKType4FloorPlanUrls,fiveBHKType5ImageUrls,fiveBHKType5FloorPlanUrls
        //  ,penthouseTypeImageUrls,penthouseBHKTypeFloorPlanUrls);
    
    
    
        return ResponseEntity.ok(Map.of("message", "Entity created successfully!"));
    }
    
 

     /**
     * API to fetch all entities dynamically.
     *
     * @return A list of entities.
     */
    // ✅ Add GET method for fetching all entities
   @GetMapping("/all")
    public ResponseEntity<List<GetEntityResponse>> getAllEntities() {
        List<GetEntityResponse> response = entityService.getAllEntities();
        return ResponseEntity.ok(response);
    }


@GetMapping("/search")
public ResponseEntity<?> searchProjects(
        @RequestParam(required = false) Integer budgetMin,
        @RequestParam(required = false) Integer budgetMax,
        @RequestParam(required = false) String city,
        @RequestParam(required = false) String bhkType,
        @RequestParam(required = false) String typeProperty) {

    // 1️⃣ Validate budgetMin and budgetMax
    if (budgetMin != null && budgetMax != null && budgetMin > budgetMax) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("error", "budgetMin cannot be greater than budgetMax"));
    }

    // 2️⃣ Fetch search results from service
    List<ProjectSearchProjection> result = entityService.searchProjects(budgetMin, budgetMax, city, bhkType,typeProperty);

    // 3️⃣ Handle case where no results match
    if (result.isEmpty()) {
        StringBuilder errorMessage = new StringBuilder("No properties found for the given search criteria: ");
        List<String> appliedFilters = new ArrayList<>();

        if (bhkType != null) appliedFilters.add("BHK Type: " + bhkType);
        if (city != null) appliedFilters.add("City: " + city);
        if (budgetMin != null) appliedFilters.add("Min Budget: " + budgetMin);
        if (budgetMax != null) appliedFilters.add("Max Budget: " + budgetMax);
        if (typeProperty != null) appliedFilters.add("Type Property: " + typeProperty);

        if (appliedFilters.isEmpty()) {
            errorMessage.append("No filters applied.");
        } else {
            errorMessage.append(String.join(", ", appliedFilters));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message", errorMessage.toString()));
    }

    // 4️⃣ Return successful response with matching properties
    return ResponseEntity.ok(result);
}

@GetMapping("/recommended-properties")
public ResponseEntity<List<RecommendedProperty>> getRecommendedProperties() {
    List<Project> projects = projectRepository.findByPreferred("Y"); // Fetch only preferred projects
    List<RecommendedProperty> recommendedProperties = new ArrayList<>();

    for (Project project : projects) {
        ProjectDetails projectDetailsList = projectDetailsRepository.findByProjectId(project.getProjectId());
        if ( projectDetailsList!=null) {
                List<String> availableBHKs = entityService.getAvailableBHKsForProject(project.getProjectId());
                 // Assuming you have a method to get available BHKs for the project
                RecommendedProperty dto = new RecommendedProperty(project, projectDetailsList,availableBHKs);
                recommendedProperties.add(dto);
            }
        }
    

    return ResponseEntity.ok(recommendedProperties);
}
// Example method to get available BHKs for a project

// @GetMapping("/project/{id}")
// public ResponseEntity<GetEntityResponse> getProjectById(@PathVariable Long id) {
//     GetEntityResponse response = entityService.getProjectById(id);
//     return response != null
//             ? ResponseEntity.ok(response)
//             : ResponseEntity.notFound().build();
// }
@GetMapping("/{id}")
public ResponseEntity<CardDetails> getProjectById(@PathVariable Integer id) {
    CardDetails cardDetails = entityService.getProjectById(id);
    return ResponseEntity.ok(cardDetails);
}

@GetMapping("/validate")
public ResponseEntity<Void> validateProjectByCityAndPrice(
        @RequestParam String city,
        @RequestParam Integer maxPrice) {

    boolean exists = entityService.projectExistsByCityAndPrice(city, maxPrice);
    return exists ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
}
}