package com.example.real_estate.api.service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileUploadService {

    private static final String UPLOAD_DIR = "uploads/";

    public List<String> uploadFiles(List<MultipartFile> files, Integer entityId, String entityType) {
        List<String> urls = new ArrayList<>();
        File uploadPath = new File(UPLOAD_DIR + entityType + "/" + entityId);

        if (!uploadPath.exists()) uploadPath.mkdirs(); // Create directory if not exists

        for (MultipartFile file : files) {
            try {
                String filePath = UPLOAD_DIR + entityType + "/" + entityId + "/" + file.getOriginalFilename();
                Path path = Paths.get(filePath);
                Files.write(path, file.getBytes());

                // Generate accessible URL
                String fileUrl = "http://localhost:8080/" + filePath;
                urls.add(fileUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return urls;
    }
}
