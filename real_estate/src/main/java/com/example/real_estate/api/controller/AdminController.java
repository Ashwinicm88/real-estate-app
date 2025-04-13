package com.example.real_estate.api.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.http.MediaType;
import com.example.real_estate.api.service.AdminService;
// import com.example.real_estate.api.service.ProjectService;
import com.example.real_estate.api.dto.AdminAllDTO;
import com.example.real_estate.api.dto.AdminSearchDTO;
// import com.example.real_estate.api.dto.AdminUpdateDTO;
// import com.example.real_estate.api.dto.CardDetails;
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // @Autowired
    // private ProjectService projectService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

     @GetMapping("/searchByNameAndCity")
    public List<AdminSearchDTO> searchByNameAndCity(
        @RequestParam(required = false) String projectName,
        @RequestParam(required = false) String city) {

        return adminService.searchByProjectNameAndCity(projectName, city);
            
}

@GetMapping("/{id}")
public ResponseEntity<AdminAllDTO> getProjectById(@PathVariable Integer id) {
    AdminAllDTO allDetails = adminService.getProjectById(id);
    return ResponseEntity.ok(allDetails);
}
   
   
//     @PutMapping(value = "/projects/{projectId}", consumes = MediaType.APPLICATION_JSON_VALUE)
//     public ResponseEntity<String> updateProject(
//         @PathVariable Integer projectId,
//         @RequestBody AdminUpdateDTO request) {

//     try {
//         projectService.updateProjectById(projectId, request);
//         return ResponseEntity.ok("Project updated successfully.");
//     } catch (Exception e) {
//         return ResponseEntity.status(500).body("Error updating project: " + e.getMessage());
//     }
// }


}
