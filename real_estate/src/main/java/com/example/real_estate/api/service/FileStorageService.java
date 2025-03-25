package com.example.real_estate.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
// import com.example.real_estate.api.controller.EntityController;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.base-url:/uploads/}") // Base URL for accessing stored files
    private String baseUrl;

    /**
     * Saves a single file in the specified folder.
     */
    public String saveFile(MultipartFile file,String folder) {
        try {
            // Create the upload directory if it doesn't exist
            if(file==null || file.isEmpty()) return null;
            File directory = new File(uploadDir+"/"+folder);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique filename
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, folder,fileName);
            
            // Save the file
            Files.write(filePath, file.getBytes());

            // Return the file's URL (relative path)
            // return "/uploads/" +folder+"/"+ fileName;
            return baseUrl + folder + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
     /**
     * General method to upload images for any BHK type.
     *
     * @param images   List of MultipartFile images.
     * @param bhkType  The BHK type (onebhk, twobhk, etc.).
     * @return List of uploaded image URLs.
     */
    public List<String> uploadBHKImages(List<MultipartFile> images, String bhkType) {
        return uploadFiles(images, bhkType + "_images");
    }
    /**
     * General method to upload floor plans for any BHK type.
     *
     * @param floorPlans List of MultipartFile floor plans.
     * @param bhkType    The BHK type (onebhk, twobhk, etc.).
     * @return List of uploaded floor plan URLs.
     */
    public List<String> uploadBHKFloorPlans(List<MultipartFile> floorPlans, String bhkType) {
        return uploadFiles(floorPlans, bhkType + "_floorplans");
    }
      /**
     * Handles uploading multiple files to a specific folder.
     */
    private List<String> uploadFiles(List<MultipartFile> files, String folder) {
        List<String> fileUrls = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                String fileUrl = saveFile(file, folder);
                if (fileUrl != null) fileUrls.add(fileUrl);
            }
        }
        return fileUrls;
    }
     /**
     * Uploads general images (not specific to a BHK).
     */
    public List<String> uploadSingleImages(List<MultipartFile> images) {
        return uploadFiles(images, "images");
    }
    public List<String> uploadImages(List<MultipartFile> images) {
        List<String> imageUrls = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                String imageUrl=saveFile(image,"images");
                if(imageUrl!=null) imageUrls.add(imageUrl);
                // imageUrls.add(saveFile(image, "images"));
            }
        }
        return imageUrls;
    }
    public String uploadVideo(MultipartFile video) {
        return saveFile(video, "videos");
    }
//     public List<String> uploadOneBHKImages(List<MultipartFile> images) {
//     List<String> imageUrls = new ArrayList<>();
//     for (MultipartFile image : images) {
//         String imageUrl = saveFile(image, "onebhk"); // Store images in "onebhk" folder
//         imageUrls.add(imageUrl);
//     }
//     return imageUrls;
// }
// public List<String> uploadOneBHKFloorPlans(List<MultipartFile> floorPlans) {
//     List<String> floorPlanUrls = new ArrayList<>();
//     for (MultipartFile floorPlan : floorPlans) {
//         String floorPlanUrl = saveFile(floorPlan, "onebhk_floorplans"); // Store floorplans separately
//         floorPlanUrls.add(floorPlanUrl);
//     }
//     return floorPlanUrls;
// }

// public List<String> uploadTwoBHKImages(List<MultipartFile> images) {
//     List<String> imageUrls = new ArrayList<>();
//     for (MultipartFile image : images) {
//         String imageUrl = saveFile(image, "twobhk"); // Store images in "onebhk" folder
//         imageUrls.add(imageUrl);
//     }
//     return imageUrls;
// }
// public List<String> uploadTwoBHKFloorPlans(List<MultipartFile> floorPlans) {
//     List<String> floorPlanUrls = new ArrayList<>();
//     for (MultipartFile floorPlan : floorPlans) {
//         String floorPlanUrl = saveFile(floorPlan, "twobhk_floorplans"); // Store floorplans separately
//         floorPlanUrls.add(floorPlanUrl);
//     }
//     return floorPlanUrls;
// }

}
