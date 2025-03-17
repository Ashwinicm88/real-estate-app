package com.example.real_estate.api.controller;

import com.example.real_estate.api.dto.*;
// import com.example.real_estate.api.model.Organisation;
import com.example.real_estate.api.service.EntityService;
import com.example.real_estate.api.service.FileStorageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.http.MediaType;
/**
 * REST Controller for managing multiple entity types dynamically.
 */
@RestController
@RequestMapping("/api/entities")
@RequiredArgsConstructor
@Validated
public class EntityController {

    // private static final Logger logger = LoggerFactory.getLogger(EntityController.class);
    private final EntityService entityService;
    private final FileStorageService fileStorageService;

    

    // private final EntityQueryService entityQueryService;

    /**
     * API to create a new entity dynamically.
     *
     * @param request The entity details.
     * @return A success response.
    //  
     * @throws JsonProcessingException */
    // @PostMapping("/create")
    // public ResponseEntity<String> createEntity(@Valid @RequestBody CreateEntityRequest request,Binding result) {
    //     entityService.createEntity(request);
    //     return ResponseEntity.ok("Entity saved successfully!");
    // }
@CrossOrigin(origins = "http://localhost:3000") // Allow only React frontend
@PostMapping(value="/create", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<Map<String, String>> createEntity(
        // @Valid @RequestBody CreateEntityRequest request, BindingResult result
        @RequestPart("data") String jsonData,
        @RequestPart(value="images",required = false) List<MultipartFile>images,
        @RequestPart(value = "video",required = false) MultipartFile video,
        @RequestParam Map<String, MultipartFile> allFiles // Capture all dynamic files
        // @RequestPart(value="oneBHKType1Images", required=false) List<MultipartFile> oneBHKType1Images,
        // @RequestPart(value="oneBHKType1FloorPlanImages", required=false) List<MultipartFile> oneBHKType1FloorPlanImages
        ) throws JsonProcessingException {
    
    // if (result.hasErrors()) {
    //     Map<String, String> errors = new HashMap<>();
    //     for (FieldError error : result.getFieldErrors()) {
    //         errors.put(error.getField(), error.getDefaultMessage());
    //     }
    //     return ResponseEntity.badRequest().body(errors);
    // }

    // logger.info("Received request to create entity: {}", request);

    // entityService.createEntity(request);
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


     // Upload OneBHK Type1 Images
    // List<String> oneBHKType1ImageUrls = (oneBHKType1Images != null && !oneBHKType1Images.isEmpty()) 
    // ? fileStorageService.uploadImages(oneBHKType1Images) 
    // : new ArrayList<>();

// Upload OneBHK Type1 Floor Plan Images
// List<String> oneBHKType1FloorPlanUrls = (oneBHKType1FloorPlanImages != null && !oneBHKType1FloorPlanImages.isEmpty()) 
//     ? fileStorageService.uploadImages(oneBHKType1FloorPlanImages) 
//     : new ArrayList<>();
     // Pass URLs to the EntityService
      // ✅ Extract OneBHKConfig images dynamically from request params




// ✅ Extract OneBHKConfig images dynamically
// for (Map.Entry<String, MultipartFile> entry : allFiles.entrySet()) {
//     String key = entry.getKey();
//     MultipartFile file = entry.getValue();

//     if (file != null && !file.isEmpty()) {
//         try {
//             // ✅ Extract typeNumber safely
//             String[] parts = key.split("_");
//             if (parts.length < 2) continue; // Skip invalid keys
//             int typeNumber = Integer.parseInt(parts[1]);

//             if (key.startsWith("oneBHKType1Images_")) {
//                 oneBHKType1ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "onebhk_images"));

//             } else if (key.startsWith("oneBHKType1FloorPlanImages_")) {
//                 oneBHKType1FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "onebhk_floorplans"));
//             }

//             // ✅ TwoBHK
//             else if (key.startsWith("twoBHKType2Images_")) {
//                 twoBHKType2ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "twobhk_images"));
//             } else if (key.startsWith("twoBHKType2FloorPlanImages_")) {
//                 twoBHKType2FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "twobhk_floorplans"));
//             }
//             // ✅ ThreeBHK
//             else if (key.startsWith("threeBHKType3Images_")) {
//                 threeBHKType3ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "threebhk_images"));
//             } else if (key.startsWith("threeBHKType3FloorPlanImages_")) {
//                 threeBHKType3FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "threebhk_floorplans"));
//             }
//              // ✅ FourBHK
//              else if (key.startsWith("fourBHKType4Images_")) {
//                 fourBHKType4ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "fourbhk_images"));
//             } else if (key.startsWith("fourBHKType4FloorPlanImages_")) {
//                 fourBHKType4FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "fourbhk_floorplans"));
//             }
//              // ✅ FiveBHK
//              else if (key.startsWith("fiveBHKType5Images_")) {
//                 fiveBHKType5ImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "fivebhk_images"));
//             } else if (key.startsWith("fiveBHKType5FloorPlanImages_")) {
//                 fiveBHKType5FloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "fivebhk_floorplans"));
//             }

//             // ✅ Penthousef
//             else if (key.startsWith("penthouseTypeImages_")) {
//                 penthouseTypeImageUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "penthouse_images"));
//             } else if (key.startsWith("penthouseTypeFloorPlanImages_")) {
//                 penthouseBHKTypeFloorPlanUrls.computeIfAbsent(typeNumber, k -> new ArrayList<>())
//                         .add(fileStorageService.saveFile(file, "penthouse_floorplans"));
//             }
//         } catch (NumberFormatException e) {
//             System.err.println("❌ Error parsing typeNumber from key: " + key);
//         }
//     }
// }

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

    @GetMapping("/latest")
    public ResponseEntity<GetEntityResponse> getLatestEntity() {
    GetEntityResponse latestEntity = entityService.getLatestEntity();
    return latestEntity != null
            ? ResponseEntity.ok(latestEntity)
            : ResponseEntity.notFound().build();
}
    
}