package com.example.real_estate.api.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/upload")
@CrossOrigin("*") // Allow frontend access
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/projects/";

    @PostMapping("/projects/{projectId}")
    public ResponseEntity<Map<String, List<String>>> uploadProjectImages(
            @PathVariable Long projectId,
            @RequestParam("files") List<MultipartFile> files) {

        List<String> fileUrls = saveFiles(files, projectId);

        Map<String, List<String>> response = new HashMap<>();
        response.put("fileUrls", fileUrls);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private List<String> saveFiles(List<MultipartFile> files, Long projectId) {
        List<String> urls = new ArrayList<>();
        File uploadPath = new File(UPLOAD_DIR + projectId);
        if (!uploadPath.exists()) uploadPath.mkdirs(); // Create directory if it doesn't exist

        for (MultipartFile file : files) {
            try {
                String filePath = UPLOAD_DIR + projectId + "/" + file.getOriginalFilename();
                Path path = Paths.get(filePath);
                Files.write(path, file.getBytes());
                urls.add("http://localhost:8080/" + filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return urls;
    }
}
