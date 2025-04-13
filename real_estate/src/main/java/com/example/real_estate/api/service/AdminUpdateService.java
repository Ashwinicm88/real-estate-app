package com.example.real_estate.api.service;

import com.example.real_estate.api.dto.AdminUpdateDTO;
// import com.example.real_estate.api.dto.AmenitiesDto;
import com.example.real_estate.api.dto.FiveBHKConfigDTO;
import com.example.real_estate.api.dto.FourBHKConfigDTO;
import com.example.real_estate.api.dto.OneBHKConfigDTO;
import com.example.real_estate.api.dto.PenthouseConfigDTO;
import com.example.real_estate.api.dto.ThreeBHKConfigDTO;
import com.example.real_estate.api.dto.TwoBHKConfigDTO;
import com.example.real_estate.api.dto.OrganizationDTO;
import com.example.real_estate.api.dto.ProjectDetailsDTO;
import com.example.real_estate.api.dto.ProjectDTO;
import com.example.real_estate.api.model.*;
import com.example.real_estate.api.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// import com.example.real_estate.api.service.ProjectService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

@Service
public class AdminUpdateService implements ProjectService {

      private static final Logger logger = LoggerFactory.getLogger(AdminUpdateService.class);
        
    @Autowired private ProjectRepository projectRepository;
    @Autowired private OrganisationRepository organisationRepository;
    @Autowired private ProjectDetailsRepository projectDetailsRepository;
    @Autowired private AmenitiesRepository amenitiesRepository;
    @Autowired private NearbyRepository nearbyRepository;
    @Autowired private ExpertReviewRepository expertReviewRepository;
    @Autowired private OneBhkConfigRepository oneBHKConfigRepository;
    @Autowired private TwoBhkConfigRepository twoBHKConfigRepository;
    @Autowired private ThreeBhkConfigRepository threeBHKConfigRepository;
    @Autowired private FourBhkConfigRepository fourBHKConfigRepository;
    @Autowired private FiveBhkConfigRepository fiveBHKConfigRepository;
    @Autowired private PenthouseConfigRepository penthouseConfigRepository;
    
    private String convertListToJson(List<String> list) {
    if (list == null || list.isEmpty()) return "[]";
    try {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(list);
    } catch (JsonProcessingException e) {
        e.printStackTrace();
        return "[]";
    }
}

    @Override
    @Transactional
    
    public void updateProjectById(Integer projectId, AdminUpdateDTO request) {
      
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
                //Create a logger instance
               
        // === Update or Create Organisation ===
        OrganizationDTO organisationDTO = request.getOrganisation();
        if (organisationDTO != null) {
            logger.info("Received OrganisationDTO: {}", organisationDTO);
            Organisation organisation = existingProject.getOrganisation();
            if (organisation == null) {
                organisation = new Organisation();
                existingProject.setOrganisation(organisation); // link from Project side
        }
        if (organisationDTO.getOrgName() != null)
        organisation.setOrgName(organisationDTO.getOrgName());
        logger.info("Set OrgName: {}", organisationDTO.getOrgName());

        if (organisationDTO.getOrgCin() != null)
        organisation.setOrgCin(organisationDTO.getOrgCin());
        logger.info("Set OrgCin: {}", organisationDTO.getOrgCin());

        if (organisationDTO.getOrgOwners() != null)
        organisation.setOrgOwners(organisationDTO.getOrgOwners());
        logger.info("Set OrgOwners: {}", organisationDTO.getOrgOwners());
    

        if (organisationDTO.getProjectCompleted() != null)
        organisation.setProjectsCompleted(organisationDTO.getProjectCompleted());
        logger.info("Set ProjectsCompleted: {}", organisationDTO.getProjectCompleted());
        organisationRepository.save(organisation);
        }


        // === Update Project ===
      
        ProjectDTO projectDTO = request.getProject();
       

if (existingProject == null) {
    existingProject = new Project(); // create new
}


        if (projectDTO != null) {
            if (projectDTO.getProjectName() != null)
                existingProject.setProjectName(projectDTO.getProjectName());
        
            if (projectDTO.getCity() != null)
                existingProject.setCity(projectDTO.getCity());
        
            if (projectDTO.getLocality() != null)
                existingProject.setLocality(projectDTO.getLocality());
        
            if (projectDTO.getAddress() != null)
                existingProject.setAddress(projectDTO.getAddress());
        
            if (projectDTO.getLatitude() != null)
                existingProject.setLatitude(projectDTO.getLatitude());
        
            if (projectDTO.getLongitude() != null)
                existingProject.setLongitude(projectDTO.getLongitude());
        
            if (projectDTO.getPropertyAreaSqmt() != null)
                existingProject.setPropertyAreaSqmt(projectDTO.getPropertyAreaSqmt());
        
            if (projectDTO.getReraNumber() != null)
                existingProject.setReraNumber(projectDTO.getReraNumber());
        
            if (projectDTO.getReralink() != null)
                existingProject.setReraLink(projectDTO.getReralink());
        
            if (projectDTO.getProjectVideoLink() != null)
                existingProject.setProjectVideoLink(projectDTO.getProjectVideoLink());
        
        
            if (projectDTO.getPropertyType() != null)
                existingProject.setPropertyType(projectDTO.getPropertyType());
        
            projectRepository.save(existingProject); // save after update
        }
        
        
        // === Project Details ===
       
        ProjectDetailsDTO projectDetailsDTO = request.getProjectDetails();
        if (projectDetailsDTO != null) {
            List<ProjectDetails> detailsList = existingProject.getProjectDetails();
            ProjectDetails details;
        
            if (detailsList == null || detailsList.isEmpty()) {
                // Create a new ProjectDetails if none exists
                details = new ProjectDetails();
                details.setProject(existingProject);
        
                detailsList = new ArrayList<>();
                detailsList.add(details);
                existingProject.setProjectDetails(detailsList);
            } else {
                // Use the first ProjectDetails from the list
                details = detailsList.get(0);
            }
        
            // ✅ Now map the DTO fields to the entity
            if (projectDetailsDTO.getUnits() != null)
                details.setUnits(projectDetailsDTO.getUnits());
        
            if (projectDetailsDTO.getProjectStatus() != null)
                details.setProjectStatus(projectDetailsDTO.getProjectStatus());
        
            if (projectDetailsDTO.getProjectLaunch() != null)
                details.setProjectLaunch(projectDetailsDTO.getProjectLaunch());
        
            if (projectDetailsDTO.getProjectPlannedEnd() != null)
                details.setProjectPlannedEnd(projectDetailsDTO.getProjectPlannedEnd());
        
            if (projectDetailsDTO.getPriceMin() != null)
                details.setPriceMin(projectDetailsDTO.getPriceMin());
        
            if (projectDetailsDTO.getPriceMax() != null)
                details.setPriceMax(projectDetailsDTO.getPriceMax());
        
            if (projectDetailsDTO.getAllInclusive() != null)
                details.setAllInclusive(projectDetailsDTO.getAllInclusive());
        
            if (projectDetailsDTO.getCoveredParking() != null)
                details.setCoveredParking(projectDetailsDTO.getCoveredParking());
        
            if (projectDetailsDTO.getBankApproved() != null)
                details.setBankApproved(projectDetailsDTO.getBankApproved());
        
            if (projectDetailsDTO.getBanks() != null)
                details.setBanks(projectDetailsDTO.getBanks());
        
            // ✅ Save the ProjectDetails entity
            projectDetailsRepository.save(details);
        }
          

// === Amenities ===
Map<String, List<String>> amenitiesDto = request.getAmenities();

if (amenitiesDto != null) {
    Amenities amenitiesEntity = amenitiesRepository.findByProject_ProjectId(projectId);
    Amenities amenities = amenitiesEntity != null ? amenitiesEntity : new Amenities();
    amenities.setProject(existingProject);

    if (amenitiesDto.containsKey("swimming_pool") && !amenitiesDto.get("swimming_pool").isEmpty()) {
        amenities.setSwimming_pool(convertListToJson(amenitiesDto.get("swimming_pool")));
    }

    if (amenitiesDto.containsKey("temple") && !amenitiesDto.get("temple").isEmpty()) {
        amenities.setTemple(convertListToJson(amenitiesDto.get("temple")));
    }

    if (amenitiesDto.containsKey("gym") && !amenitiesDto.get("gym").isEmpty()) {
        amenities.setGym(convertListToJson(amenitiesDto.get("gym")));
    }

    if (amenitiesDto.containsKey("creche") && !amenitiesDto.get("creche").isEmpty()) {
        amenities.setCreche(convertListToJson(amenitiesDto.get("creche")));
    }

    if (amenitiesDto.containsKey("children_parks") && !amenitiesDto.get("children_parks").isEmpty()) {
        amenities.setChildren_parks(convertListToJson(amenitiesDto.get("children_parks")));
    }

    if (amenitiesDto.containsKey("park") && !amenitiesDto.get("park").isEmpty()) {
        amenities.setPark(convertListToJson(amenitiesDto.get("park")));
    }

    if (amenitiesDto.containsKey("club_house") && !amenitiesDto.get("club_house").isEmpty()) {
        amenities.setClub_house(convertListToJson(amenitiesDto.get("club_house")));
    }

    if (amenitiesDto.containsKey("c_hall") && !amenitiesDto.get("c_hall").isEmpty()) {
        amenities.setC_hall(convertListToJson(amenitiesDto.get("c_hall")));
    }

    if (amenitiesDto.containsKey("other") && !amenitiesDto.get("other").isEmpty()) {
        amenities.setOther(convertListToJson(amenitiesDto.get("other")));
    }

    amenitiesRepository.save(amenities);
}


        // // === Nearby ===
       
        // Map<String, List<String>> nearbyDto = request.getNearby();

        // if (nearbyDto != null) {
        //     Nearby nearbyEntity = nearbyRepository.findByProject_ProjectId(projectId);
        //     Nearby nearby = nearbyEntity != null ? nearbyEntity : new Nearby();
        //     nearby.setProject(existingProject);
        
        //     if (nearbyDto.containsKey("schools") && !nearbyDto.get("schools").isEmpty()) {
        //         nearby.setSchools(convertListToJson(nearbyDto.get("schools")));
        //     }
        
        //     if (nearbyDto.containsKey("hospitals") && !nearbyDto.get("hospitals").isEmpty()) {
        //         nearby.setHospitals(convertListToJson(nearbyDto.get("hospitals")));
        //     }
        
        //     if (nearbyDto.containsKey("it_parks") && !nearbyDto.get("it_Parks").isEmpty()) {
        //         nearby.setIt_Parks(convertListToJson(nearbyDto.get("it_Parks")));
        //     }
        
        //     if (nearbyDto.containsKey("hangouts") && !nearbyDto.get("hangouts").isEmpty()) {
        //         nearby.setHangouts(convertListToJson(nearbyDto.get("hangouts")));
        //     }
        
        //     if (nearbyDto.containsKey("cinemas") && !nearbyDto.get("cinemas").isEmpty()) {
        //         nearby.setCinemas(convertListToJson(nearbyDto.get("cinemas")));
        //     }
        
        //     if (nearbyDto.containsKey("metro") && !nearbyDto.get("metro").isEmpty()) {
        //         nearby.setMetro(convertListToJson(nearbyDto.get("metro")));
        //     }
        
        //     nearbyRepository.save(nearby);
        // }
        // === Nearby ===
Map<String, List<String>> nearbyDto = request.getNearby();

if (nearbyDto != null) {
    Nearby nearbyEntity = nearbyRepository.findByProject_ProjectId(projectId);
    Nearby nearby = nearbyEntity != null ? nearbyEntity : new Nearby();
    nearby.setProject(existingProject);

    // Check and set 'schools' if not null and not empty
    if (nearbyDto.containsKey("schools") && nearbyDto.get("schools") != null && !nearbyDto.get("schools").isEmpty()) {
        nearby.setSchools(convertListToJson(nearbyDto.get("schools")));
    }

    // Check and set 'hospitals' if not null and not empty
    if (nearbyDto.containsKey("hospitals") && nearbyDto.get("hospitals") != null && !nearbyDto.get("hospitals").isEmpty()) {
        nearby.setHospitals(convertListToJson(nearbyDto.get("hospitals")));
    }

    // Check and set 'it_parks' if not null and not empty (fix the key mismatch)
    if (nearbyDto.containsKey("it_parks") && nearbyDto.get("it_parks") != null && !nearbyDto.get("it_parks").isEmpty()) {
        nearby.setIt_parks(convertListToJson(nearbyDto.get("it_parks")));
        logger.info("Set it_parks: {}", nearbyDto.get("it_parks"));
    }

    // Check and set 'hangouts' if not null and not empty
    if (nearbyDto.containsKey("hangouts") && nearbyDto.get("hangouts") != null && !nearbyDto.get("hangouts").isEmpty()) {
        nearby.setHangouts(convertListToJson(nearbyDto.get("hangouts")));
    }

    // Check and set 'cinemas' if not null and not empty
    if (nearbyDto.containsKey("cinemas") && nearbyDto.get("cinemas") != null && !nearbyDto.get("cinemas").isEmpty()) {
        nearby.setCinemas(convertListToJson(nearbyDto.get("cinemas")));
    }

    // Check and set 'metro' if not null and not empty
    if (nearbyDto.containsKey("metro") && nearbyDto.get("metro") != null && !nearbyDto.get("metro").isEmpty()) {
        nearby.setMetro(convertListToJson(nearbyDto.get("metro")));
    }

    nearbyRepository.save(nearby);
}


        // === Expert Review ===
        if (request.getExpertReview() != null) {
            ExpertReview updatedExpertReviewDto = request.getExpertReview();
        
            ExpertReview existingReviewOpt = expertReviewRepository
                    .findByProject_ProjectId(existingProject.getProjectId());
        
            ExpertReview expertReview= existingReviewOpt!=null?existingReviewOpt:new ExpertReview();
        
            // Apply only non-null fields from DTO
            if (updatedExpertReviewDto.getReviewText() != null) {
                expertReview.setReviewText(updatedExpertReviewDto.getReviewText());
            }
        
            // Ensure the relationship is always maintained
            expertReview.setProject(existingProject);
        
            // Save the updated or new entity
            expertReviewRepository.save(expertReview);
        }
        

      // === OneBHK Config ===
       // 1. Get the Project from DB using ID
    Project project = projectRepository.findById(projectId)
    .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
   
List<OneBHKConfig> oneBHKConfigs = new ArrayList<>();

if (request.getOneBHKConfig() != null) {
    for (OneBHKConfigDTO dto : request.getOneBHKConfig()) {
        Optional<OneBHKConfig> existingConfigOpt = oneBHKConfigRepository
            .findByProject_ProjectIdAndTypeNumber(project.getProjectId(), dto.getTypeNumber());

        OneBHKConfig config;

        if (existingConfigOpt.isPresent()) {
            config = existingConfigOpt.get(); // Update existing
        } else {
            config = new OneBHKConfig();      // Create new
            config.setProject(project);
            config.setTypeNumber(dto.getTypeNumber());
        }

        // Safe field-by-field update only if not null (partial update support)
        if (dto.getType1Units() != null) config.setType1Units(dto.getType1Units());
        if (dto.getType1Area() != null) config.setType1Area(dto.getType1Area());
        
        if (dto.getType1Bathrooms() != null) config.setType1Bathrooms(dto.getType1Bathrooms());
        if (dto.getType1Balcony() != null) config.setType1Balcony(dto.getType1Balcony());
        if (dto.getType1Parking() != null) config.setType1Parking(dto.getType1Parking());

        if (dto.getHallArea() != null) config.setHallArea(dto.getHallArea());
        if (dto.getKitchenArea() != null) config.setKitchenArea(dto.getKitchenArea());
        if (dto.getBedroom1Area() != null) config.setBedroom1Area(dto.getBedroom1Area());
        if (dto.getBathroom1Area() != null) config.setBathroom1Area(dto.getBathroom1Area());
        if (dto.getBathroom2Area() != null) config.setBathroom2Area(dto.getBathroom2Area());

        oneBHKConfigs.add(config); // Add to list for saving
    }
    // ✅ Wrap the save in try-catch to catch validation errors
    try {
        oneBHKConfigRepository.saveAll(oneBHKConfigs);
    } catch (jakarta.validation.ConstraintViolationException e) {
        for (var violation : e.getConstraintViolations()) {
            System.out.println("🔴 Validation failed:");
            System.out.println("  ➤ Entity: " + violation.getRootBeanClass().getSimpleName());
            System.out.println("  ➤ Property: " + violation.getPropertyPath());
            System.out.println("  ➤ Message: " + violation.getMessage());
            System.out.println("  ➤ Invalid Value: " + violation.getInvalidValue());
        }
        throw e;
    }
}

// Save all updated or newly created configs at once
oneBHKConfigRepository.saveAll(oneBHKConfigs);


// === TwoBHK Config ===
List<TwoBHKConfig> twoBHKConfigs = new ArrayList<>();

if (request.getTwoBHKConfig() != null) {
    for (TwoBHKConfigDTO dto : request.getTwoBHKConfig()) {
        Optional<TwoBHKConfig> existingConfigOpt = twoBHKConfigRepository
            .findByProject_ProjectIdAndTypeNumber(project.getProjectId(), dto.getTypeNumber());

        TwoBHKConfig config;

        if (existingConfigOpt.isPresent()) {
            // Update existing - partial update
            config = existingConfigOpt.get();
        } else {
            // Create new
            config = new TwoBHKConfig();
            config.setProject(project); // set project only for new ones
            config.setTypeNumber(dto.getTypeNumber());
        }

        // Set fields only if not null (safe partial update)
        if (dto.getType2Units() != null) config.setType2Units(dto.getType2Units());
        if (dto.getType2Area() != null) config.setType2Area(dto.getType2Area());
        if (dto.getType2Bedrooms() != null) config.setType2Bedrooms(dto.getType2Bedrooms());
        if (dto.getType2Bathrooms() != null) config.setType2Bathrooms(dto.getType2Bathrooms());
        if (dto.getType2Balcony() != null) config.setType2Balcony(dto.getType2Balcony());
        if (dto.getType2Parking() != null) config.setType2Parking(dto.getType2Parking());

        if (dto.getHallArea() != null) config.setHallArea(dto.getHallArea());
        if (dto.getKitchenArea() != null) config.setKitchenArea(dto.getKitchenArea());
        if (dto.getBedroom1Area() != null) config.setBedroom1Area(dto.getBedroom1Area());
        if (dto.getBedroom2Area() != null) config.setBedroom2Area(dto.getBedroom2Area());
        if (dto.getBathroom1Area() != null) config.setBathroom1Area(dto.getBathroom1Area());
        if (dto.getBathroom2Area() != null) config.setBathroom2Area(dto.getBathroom2Area());

        // Only add to the list if it's new or updated
        twoBHKConfigs.add(config);
    }
}

// Save all updated or new TwoBHKConfigs
twoBHKConfigRepository.saveAll(twoBHKConfigs);

   
// === ThreeBHK Config ===
List<ThreeBHKConfig> threeBHKConfigs = new ArrayList<>();

if (request.getThreeBHKConfig() != null) {
    for (ThreeBHKConfigDTO dto : request.getThreeBHKConfig()) {
        Optional<ThreeBHKConfig> existingConfigOpt = threeBHKConfigRepository
                .findByProject_ProjectIdAndTypeNumber(project.getProjectId(), dto.getTypeNumber());

        ThreeBHKConfig config;

        if (existingConfigOpt.isPresent()) {
            // Update the existing one
            config = existingConfigOpt.get();
        } else {
            // Create new one
            config = new ThreeBHKConfig();
            config.setProject(project); // Set project only for new record
        }

        // Set/update common fields
        config.setTypeNumber(dto.getTypeNumber());
        if (dto.getType3Bedrooms() != null) config.setType3Bedrooms(dto.getType3Bedrooms());
        if (dto.getType3Units() != null) config.setType3Units(dto.getType3Units());
        if (dto.getType3Area() != null) config.setType3Area(dto.getType3Area());
       
        if (dto.getType3Bathrooms() != null) config.setType3Bathrooms(dto.getType3Bathrooms());
        if (dto.getType3Balcony() != null) config.setType3Balcony(dto.getType3Balcony());
        if (dto.getType3Parking() != null) config.setType3Parking(dto.getType3Parking());
        if (dto.getHallArea() != null) config.setHallArea(dto.getHallArea());
        if (dto.getKitchenArea() != null) config.setKitchenArea(dto.getKitchenArea());
        if (dto.getBedroom1Area() != null) config.setBedroom1Area(dto.getBedroom1Area());
        if (dto.getBedroom2Area() != null) config.setBedroom2Area(dto.getBedroom2Area());
        if (dto.getBedroom3Area() != null) config.setBedroom3Area(dto.getBedroom3Area());
        if (dto.getBathroom1Area() != null) config.setBathroom1Area(dto.getBathroom1Area());
        if (dto.getBathroom2Area() != null) config.setBathroom2Area(dto.getBathroom2Area());
        if (dto.getBathroom3Area() != null) config.setBathroom3Area(dto.getBathroom3Area());


        threeBHKConfigs.add(config);
    }
}

// Save all at once
threeBHKConfigRepository.saveAll(threeBHKConfigs);


// === FourBHK Config ===
List<FourBHKConfig> fourBHKConfigs = new ArrayList<>();

if (request.getFourBHKConfig() != null) {
    for (FourBHKConfigDTO dto : request.getFourBHKConfig()) {
        Optional<FourBHKConfig> existingConfigOpt = fourBHKConfigRepository
            .findByProject_ProjectIdAndTypeNumber(project.getProjectId(), dto.getTypeNumber());

        FourBHKConfig config;

        if (existingConfigOpt.isPresent()) {
            config = existingConfigOpt.get(); // Existing → update only non-null
        } else {
            config = new FourBHKConfig();     // New → set required fields
            config.setProject(project);
            
        }

        // Safe partial updates
        config.setTypeNumber(dto.getTypeNumber());
        System.out.println("fourbhk type number: " + dto.getTypeNumber());
        if(dto.getType4Bedrooms() != null) config.setType4Bedrooms(dto.getType4Bedrooms());
        if (dto.getType4Units() != null) config.setType4Units(dto.getType4Units());
        if (dto.getType4Area() != null) config.setType4Area(dto.getType4Area());
       
        if (dto.getType4Bathrooms() != null) config.setType4Bathrooms(dto.getType4Bathrooms());
        if (dto.getType4Balcony() != null) config.setType4Balcony(dto.getType4Balcony());
        if (dto.getType4Parking() != null) config.setType4Parking(dto.getType4Parking());

        if (dto.getHallArea() != null) config.setHallArea(dto.getHallArea());
        if (dto.getKitchenArea() != null) config.setKitchenArea(dto.getKitchenArea());
        if (dto.getBedroom1Area() != null) config.setBedroom1Area(dto.getBedroom1Area());
        if (dto.getBedroom2Area() != null) config.setBedroom2Area(dto.getBedroom2Area());
        if (dto.getBedroom3Area() != null) config.setBedroom3Area(dto.getBedroom3Area());
        if (dto.getBedroom4Area() != null) config.setBedroom4Area(dto.getBedroom4Area());
        if (dto.getBathroom1Area() != null) config.setBathroom1Area(dto.getBathroom1Area());
        if (dto.getBathroom2Area() != null) config.setBathroom2Area(dto.getBathroom2Area());
        if (dto.getBathroom3Area() != null) config.setBathroom3Area(dto.getBathroom3Area());
        if (dto.getBathroom4Area() != null) config.setBathroom4Area(dto.getBathroom4Area());
        fourBHKConfigs.add(config);
    }
}

// Save everything at once
fourBHKConfigRepository.saveAll(fourBHKConfigs);

// === FiveBHK Config ===

List<FiveBHKConfig> fiveBHKConfigs = new ArrayList<>();

if (request.getFiveBHKConfig() != null) {
    for (FiveBHKConfigDTO dto : request.getFiveBHKConfig()) {
        Optional<FiveBHKConfig> existingConfigOpt = fiveBHKConfigRepository
            .findByProject_ProjectIdAndTypeNumber(project.getProjectId(), dto.getTypeNumber());

        FiveBHKConfig config;

        if (existingConfigOpt.isPresent()) {
            config = existingConfigOpt.get(); // Update existing
        } else {
            config = new FiveBHKConfig();    // Create new
            config.setProject(project);
            config.setTypeNumber(dto.getTypeNumber());
        }

        // Safe partial updates
        if (dto.getType5Bedrooms() != null) config.setType5Bedrooms(dto.getType5Bedrooms());
        if (dto.getType5Units() != null) config.setType5Units(dto.getType5Units());
        if (dto.getType5Area() != null) config.setType5Area(dto.getType5Area());
       
        if (dto.getType5Bathrooms() != null) config.setType5Bathrooms(dto.getType5Bathrooms());
        if (dto.getType5Balcony() != null) config.setType5Balcony(dto.getType5Balcony());
        if (dto.getType5Parking() != null) config.setType5Parking(dto.getType5Parking());

        if (dto.getHallArea() != null) config.setHallArea(dto.getHallArea());
        if (dto.getKitchenArea() != null) config.setKitchenArea(dto.getKitchenArea());
        if (dto.getBedroom1Area() != null) config.setBedroom1Area(dto.getBedroom1Area());
        if (dto.getBedroom2Area() != null) config.setBedroom2Area(dto.getBedroom2Area());
        if (dto.getBedroom3Area() != null) config.setBedroom3Area(dto.getBedroom3Area());
        if (dto.getBedroom4Area() != null) config.setBedroom4Area(dto.getBedroom4Area());
        if (dto.getBedroom5Area() != null) config.setBedroom5Area(dto.getBedroom5Area());

        if (dto.getBathroom1Area() != null) config.setBathroom1Area(dto.getBathroom1Area());
        if (dto.getBathroom2Area() != null) config.setBathroom2Area(dto.getBathroom2Area());
        if (dto.getBathroom3Area() != null) config.setBathroom3Area(dto.getBathroom3Area());
        if (dto.getBathroom4Area() != null) config.setBathroom4Area(dto.getBathroom4Area());
        if (dto.getBathroom5Area() != null) config.setBathroom5Area(dto.getBathroom5Area());

        fiveBHKConfigs.add(config);
    }
}

// Save all at once
fiveBHKConfigRepository.saveAll(fiveBHKConfigs);


       // === Penthouse Config ===
       List<PenthouseConfig> penthouseConfigs = new ArrayList<>();

       if (request.getPenthouseConfig() != null) {
           for (PenthouseConfigDTO dto : request.getPenthouseConfig()) {
               Optional<PenthouseConfig> existingConfigOpt = penthouseConfigRepository
                   .findByProject_ProjectIdAndTypeNumber(project.getProjectId(), dto.getTypeNumber());
       
               PenthouseConfig config;
       
               if (existingConfigOpt.isPresent()) {
                   config = existingConfigOpt.get(); // update
               } else {
                   config = new PenthouseConfig();   // create
                   config.setProject(project);
                   config.setTypeNumber(dto.getTypeNumber());
               }
       
               // Set only non-null fields (partial update support)
               if (dto.getPenthouseBedrooms() != null) config.setPenthouseBedrooms(dto.getPenthouseBedrooms());
               if (dto.getPenthouseBathrooms() != null) config.setPenthouseBathrooms(dto.getPenthouseBathrooms());
               if (dto.getPenthouseBalcony() != null) config.setPenthouseBalcony(dto.getPenthouseBalcony());
               if (dto.getPenthouseParking() != null) config.setPenthouseParking(dto.getPenthouseParking());
            
               if (dto.getPenthouseArea() != null) config.setPenthouseArea(dto.getPenthouseArea());
       
               if (dto.getHallArea() != null) config.setHallArea(dto.getHallArea());
               if (dto.getKitchenArea() != null) config.setKitchenArea(dto.getKitchenArea());
       
               if (dto.getBedroom1Area() != null) config.setBedroom1Area(dto.getBedroom1Area());
               if (dto.getBedroom2Area() != null) config.setBedroom2Area(dto.getBedroom2Area());
               if (dto.getBedroom3Area() != null) config.setBedroom3Area(dto.getBedroom3Area());
               if (dto.getBedroom4Area() != null) config.setBedroom4Area(dto.getBedroom4Area());
               if (dto.getBedroom5Area() != null) config.setBedroom5Area(dto.getBedroom5Area());
               if (dto.getBedroom6Area() != null) config.setBedroom6Area(dto.getBedroom6Area());
       
               if (dto.getBathroom1Area() != null) config.setBathroom1Area(dto.getBathroom1Area());
               if (dto.getBathroom2Area() != null) config.setBathroom2Area(dto.getBathroom2Area());
               if (dto.getBathroom3Area() != null) config.setBathroom3Area(dto.getBathroom3Area());
               if (dto.getBathroom4Area() != null) config.setBathroom4Area(dto.getBathroom4Area());
               if (dto.getBathroom5Area() != null) config.setBathroom5Area(dto.getBathroom5Area());
               if (dto.getBathroom6Area() != null) config.setBathroom6Area(dto.getBathroom6Area());
       
               penthouseConfigs.add(config);
           }
       }
       
       // Save all at once
       penthouseConfigRepository.saveAll(penthouseConfigs);
    }
    
    // private String getSingleValue(List<String> list) {
    //     return (list != null && !list.isEmpty()) ? list.get(0) : null;
    // }
    
    
}
