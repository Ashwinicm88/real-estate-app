package com.example.real_estate.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.real_estate.api.repository.AmenitiesRepository;
import com.example.real_estate.api.repository.ExpertReviewRepository;
// import com.example.real_estate.api.repository.FiveBhkConfigRepository;
import com.example.real_estate.api.repository.FourBhkConfigRepository;
import com.example.real_estate.api.repository.NearbyRepository;
import com.example.real_estate.api.repository.OneBhkConfigRepository;
// import com.example.real_estate.api.repository.OrganisationRepository;
// import com.example.real_estate.api.repository.PenthouseConfigRepository;
import com.example.real_estate.api.repository.ProjectDetailsRepository;
import com.example.real_estate.api.repository.ProjectRepository;
// import com.example.real_estate.api.repository.ProjectTimeLineRepository;
import com.example.real_estate.api.repository.ThreeBhkConfigRepository;
import com.example.real_estate.api.repository.TwoBhkConfigRepository;
import com.example.real_estate.api.dto.*;
import com.example.real_estate.api.model.Amenities;
import com.example.real_estate.api.model.ExpertReview;
// import com.example.real_estate.api.model.FiveBHKConfig;
import com.example.real_estate.api.model.FourBHKConfig;
import com.example.real_estate.api.model.Nearby;
import com.example.real_estate.api.model.OneBHKConfig;
import com.example.real_estate.api.model.Organisation;
// import com.example.real_estate.api.model.PenthouseConfig;
import com.example.real_estate.api.model.Project;
import com.example.real_estate.api.model.ProjectDetails;
// import com.example.real_estate.api.model.ProjectTimeLine;
import com.example.real_estate.api.model.ThreeBHKConfig;
import com.example.real_estate.api.model.TwoBHKConfig;

// import java.util.Collections;
// import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



@Service
public class AdminService {
    
    @Autowired
    private ProjectRepository projectRepository;

    // @Autowired
    // private OrganisationRepository organisationRepository;

    @Autowired
    private ProjectDetailsRepository projectDetailsRepository;


    @Autowired
    private OneBhkConfigRepository oneBHKConfigRepository;


    @Autowired
    private TwoBhkConfigRepository twoBHKConfigRepository;


    @Autowired
    private ThreeBhkConfigRepository threeBHKConfigRepository;


    @Autowired
    private FourBhkConfigRepository fourBHKConfigRepository;


    // @Autowired
    // private FiveBhkConfigRepository fiveBHKConfigRepository;


    // @Autowired
    // private PenthouseConfigRepository penthouseConfigRepository;


    // @Autowired
    // private ProjectTimeLineRepository projectTimeLineRepository;


    @Autowired
    private NearbyRepository nearbyRepository;


    @Autowired
    private AmenitiesRepository amenitiesRepository;


    @Autowired
    private ExpertReviewRepository expertReviewRepository;

    
    public List<AdminSearchDTO> searchByProjectNameAndCity(String projectName, String city) {
        List<Project> projects = projectRepository.findProjectsByNameAndCity(projectName, city);
    
        return projects.stream()
            .map(p -> {
                // ProjectDetails firstDetail = p.getProjectDetails().isEmpty() ? null : p.getProjectDetails().get(0);
                // Date createdAt = (firstDetail != null) ? firstDetail.getProjectLaunch() : null;
    
                return new AdminSearchDTO(
                    p.getProjectId(),
                    p.getOrganisation().getOrgName(),
                    p.getProjectName(),
                    p.getCity(),
                    p.getLocality(),
                    p.getCreatedAt()
                );
            })
            .collect(Collectors.toList());
    }

    public AdminAllDTO getProjectById(Integer id) {
   
        Project project = projectRepository.findByProjectId(id);
        if (project == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found with id: " + id);
        }
    // Fetch related entities
    ProjectDetails projectDetailsList = projectDetailsRepository.findByProjectId(id);
    Amenities amenities = amenitiesRepository.findByProject_ProjectId(id);
    Nearby nearby = nearbyRepository.findByProject_ProjectId(id);
    List<OneBHKConfig> oneBHKConfig = oneBHKConfigRepository.findByProject_ProjectId(id);
    List<TwoBHKConfig> twoBHKConfig = twoBHKConfigRepository.findByProject_ProjectId(id);
    List<ThreeBHKConfig> threeBHKConfig = threeBHKConfigRepository.findByProject_ProjectId(id);
    List<FourBHKConfig> fourBHKConfig = fourBHKConfigRepository.findByProject_ProjectId(id);
    Organisation organisation = project.getOrganisation();
    ExpertReview expertReview = expertReviewRepository.findByProject_ProjectId(id);

    // Construct response DTO
    AdminAllDTO allDetails = new AdminAllDTO();
    
    // ✅ Set Project Details (nested inside ProjectDTO)
    ProjectDTO projectDTO = new ProjectDTO();
    projectDTO.setProjectId(project.getProjectId());
    projectDTO.setProjectName(project.getProjectName());
    projectDTO.setCity(project.getCity());
    projectDTO.setLocality(project.getLocality());
    projectDTO.setLatitude(project.getLatitude());
    projectDTO.setLongitude(project.getLongitude());
    projectDTO.setPropertyAreaSqmt(project.getPropertyAreaSqmt());
    projectDTO.setReraNumber(project.getReraNumber());
    projectDTO.setAddress(project.getAddress());
    projectDTO.setProjectVideoLink(project.getProjectVideoLink());
    projectDTO.setPropertyType(project.getPropertyType());
    projectDTO.setProjectImages(project.getProjectImages());
    projectDTO.setReralink(project.getReraLink());
    allDetails.setProject(projectDTO);
 // ✅ Set Organization Details (nested inside OrganizationDTO)
OrganizationDTO organizationDTO = new OrganizationDTO();
if (organisation != null) {
    organizationDTO.setOrgName(organisation.getOrgName());
    organizationDTO.setOrgCin(organisation.getOrgCin());
    organizationDTO.setOrgOwners(organisation.getOrgOwners());
    organizationDTO.setProjectCompleted(organisation.getProjectsCompleted());

    
}
allDetails.setOrganization(organizationDTO);


 

    // set extra details in projectDTO
    if (projectDetailsList != null) {
        ProjectDetailsDTO projectDetailsDTO = new ProjectDetailsDTO();
        projectDetailsDTO.setUnits(projectDetailsList.getUnits());
        projectDetailsDTO.setProjectStatus(projectDetailsList.getProjectStatus());
        projectDetailsDTO.setProjectLaunch(projectDetailsList.getProjectLaunch());
        projectDetailsDTO.setProjectPlannedEnd(projectDetailsList.getProjectPlannedEnd());
        projectDetailsDTO.setPriceMin(projectDetailsList.getPriceMin());
        projectDetailsDTO.setPriceMax(projectDetailsList.getPriceMax());
        projectDetailsDTO.setAllInclusive(projectDetailsList.getAllInclusive());
        projectDetailsDTO.setBankApproved(projectDetailsList.getBankApproved());
        projectDetailsDTO.setCoveredParking(projectDetailsList.getCoveredParking());
        projectDetailsDTO.setBanks(projectDetailsList.getBanks());
    
        // If you're setting a single object:
        allDetails.setProjectDetails(projectDetailsDTO);
    
        // If you're supposed to set a list of DTOs:
        // allDetails.setProjectDetailsList(Collections.singletonList(projectDetailsDTO));
    }
    
 
    // Set amenities details
    if (amenities != null) {
        AmenitiesDto amenitiesDTO = new AmenitiesDto();
        amenitiesDTO.setSwimmingPool(amenities.getSwimming_pool());
        amenitiesDTO.setGym(amenities.getGym());
        amenitiesDTO.setTemple(amenities.getTemple());
        amenitiesDTO.setPark(amenities.getPark());
        amenitiesDTO.setCreche(amenities.getCreche());
        amenitiesDTO.setChildrenParks(amenities.getChildren_parks());
        amenitiesDTO.setClubHouse(amenities.getClub_house());
        amenitiesDTO.setCHall(amenities.getC_hall());
        amenitiesDTO.setOther(amenities.getOther());
       
        allDetails.setAmenities(amenitiesDTO);
    }
    
    // Set nearby places
    if (nearby != null) {
        NearbyDTO nearbyDTO = new NearbyDTO();
        nearbyDTO.setSchools(nearby.getSchools());
        nearbyDTO.setHospitals(nearby.getHospitals());
        nearbyDTO.setIt_parks(nearby.getIt_parks());
        nearbyDTO.setHangouts(nearby.getHangouts());
        nearbyDTO.setCinemas(nearby.getCinemas());
        nearbyDTO.setMetro(nearby.getMetro());

        allDetails.setNearby(nearbyDTO);
    }
     
    ExpertReviewDto expertReviewDto = new ExpertReviewDto();
    expertReviewDto.setReviewText(expertReview.getReviewText());


    allDetails.setExpertReview(expertReviewDto);


    // Set BHK configurations
    allDetails.setOneBHKConfig(oneBHKConfig);
    allDetails.setTwoBHKConfig(twoBHKConfig);
    allDetails.setThreeBHKConfig(threeBHKConfig);
    allDetails.setFourBHKConfig(fourBHKConfig);

    return allDetails;
}
    
}



