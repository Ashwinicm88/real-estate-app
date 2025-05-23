package com.example.real_estate.api.service;


import com.example.real_estate.api.model.*;
import com.example.real_estate.api.repository.*;
import com.example.real_estate.api.config.CorsConfig;
import com.example.real_estate.api.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
// import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import com.example.real_estate.api.exception.ResourceNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
// import com.example.real_estate.api.service.FileUploadService;
// import com.example.real_estate.api.service.FileStorageService;
import jakarta.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// import jakarta.persistence.criteria.Predicate;


// import org.springframework.web.multipart.MultipartFile;


@Service
@Transactional // ✅ Apply at the class level to ensure consistency
public class EntityService {
    // @Autowired
    // private final WebMvcConfigurer corsConfigurer;
    private static final Logger logger = LoggerFactory.getLogger(EntityService.class);


    private final FileStorageService fileStorageService;


    private final CorsConfig corsConfig;


    @Autowired
    private OrganisationRepository organisationRepository;


    @Autowired
    private ProjectRepository projectRepository;


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


    @Autowired
    private FiveBhkConfigRepository fiveBHKConfigRepository;


    @Autowired
    private PenthouseConfigRepository penthouseConfigRepository;


    @Autowired
    private ProjectTimeLineRepository projectTimeLineRepository;


    @Autowired
    private NearbyRepository nearbyRepository;


    @Autowired
    private AmenitiesRepository amenitiesRepository;


    @Autowired
    private ExpertReviewRepository expertReviewRepository;


    private final ObjectMapper objectMapper = new ObjectMapper();
   public EntityService(CorsConfig corsConfig, FileStorageService fileStorageService) {
        this.corsConfig = corsConfig;
        this.fileStorageService = fileStorageService;
        // this.corsConfigurer = corsConfigurer;
    } // JSON converter
// public void createEntity(String jsonData,List <String>imageUrls,String videoUrl,Map<Integer,List<String>> oneBHKType1ImageUrls,Map<Integer,List<String>>oneBHKType1FloorPlanUrls,Map<Integer, List<String>> twoBHKType2ImageUrls,
// Map<Integer, List<String>> twoBHKType2FloorPlanUrls,Map<Integer,List<String>>threeBHKTy ) throws JsonProcessingException{
    public void createEntity(String jsonData,List <String>imageUrls,List <String> videoUrl,Map<Integer,List<String>> oneBHKType1ImageUrls,Map<Integer,List<String>>oneBHKType1FloorPlanUrls, Map<Integer, List<String>> twoBHKType2ImageUrls,
    Map<Integer, List<String>> twoBHKType2FloorPlanUrls,
    Map<Integer, List<String>> threeBHKType3ImageUrls,
    Map<Integer, List<String>> threeBHKType3FloorPlanUrls,
    Map<Integer, List<String>> fourBHKType4ImageUrls, Map<Integer, List<String>> fourBHKType4FloorPlanUrls,
    Map<Integer,List<String>>fiveBHKType5ImageUrls,Map<Integer,List<String>>fiveBHKType5FloorPlanUrls,
    Map<Integer,List<String>>penthouseTypeImageUrls,Map<Integer,List<String>>penthouseTypeFloorPlanUrls) throws JsonProcessingException {
        CreateEntityRequest request= objectMapper.readValue(jsonData, CreateEntityRequest.class);
       System.out.println("Received Request: " + request);
        // ✅ Save Organisation
        Organisation organisation = new Organisation(
                request.getOrganisationCin(),
                request.getOrganisationName(),
                request.getOrganisationOwners(),
                request.getProjectsCompleted());


        organisation = organisationRepository.save(organisation);
        System.out.println("✅ Organisation Saved with ID: " + organisation.getOrgId());


        // ✅ Convert List<String> to JSON String or CSV format
        // String projectImages = convertListToJson(request.getProjectImages());
   


        // ✅ Save Project
        Project project = new Project(
                organisation,
                request.getProjectName(),
                request.getCity(),
                request.getLocality(),
                request.getAddress(),
                request.getLatitude(),
                request.getLongitude(),
                request.getPropertyAreaSqmt()!=null ? request.getPropertyAreaSqmt().intValue():0, // Ensure Integer type
                request.getReraNumber(),
                request.getReraLink(),
                videoUrl,
                imageUrls,
                // request.getProjectVideoLink(),
                // new ArrayList<>(),
                // request.getProjectImages(),
                // schools,
                // hospitals,
                // malls,
                // movieTheaters,
                // itParks,
                // hangouts,
                // metro,
                request.getPreferred() != null ? request.getPreferred() : "N", // Default preferred to 'N' if not provided
                false,
                request.getPropertyType()// Default 'deleted' to false
             


        );


        project = projectRepository.save(project);
       // ✅ Upload Images and Update the Project
// List<String> projectImageUrls = fileUploadService.uploadFiles(request.getProjectImages()); // Make sure request.getProjectImages() is a List<MultipartFile>
// project.setProjectImages(projectImageUrls);
       
        System.out.println("✅ Project Saved with ID: " + project.getProjectId());


        // ✅ Save ProjectDetails
        ProjectDetails projectDetails = new ProjectDetails(
                project,
                request.getUnits(),
                request.getProjectStatus(),
                request.getProjectLaunch(),
                request.getProjectPlannedEnd(),
                request.getPriceMin(),
                request.getPriceMax(),
                request.getAllInclusive(),
                // request.getAmenities(),
                request.getCoveredParking(),
                request.getBankApproved(),
                request.getBanks()
        );


        // Save to database
        projectDetails = projectDetailsRepository.save(projectDetails);
        System.out.println("✅ Project Details Saved with ID: " + projectDetails.getDetailId());


        // String Swimming_pool= convertListToJson(request.getSwimming_pool());
        // String Gym= convertListToJson(request.getGym());
        // String Temple= convertListToJson(request.getTemple());
        // String Creche= convertListToJson(request.getCreche());
        // String Park= convertListToJson(request.getPark());
        // String Children_parks= convertListToJson(request.getChildren_parks());
        // String Club_house= convertListToJson(request.getClub_house());
        // String C_hall= convertListToJson(request.getC_hall());
        // String other= convertListToJson(request.getOther());
        // Amenities amenities = new Amenities(
        //     project,
        //     Swimming_pool,
        //     Gym,
        //     Temple,
        //     Creche,
        //     Park,
        //     Children_parks,
        //     Club_house,
        //     C_hall,
        //     other
        //     );
        // amenities = amenitiesRepository.save(amenities);
        // System.out.println("✅ Amenities Saved with ID: " + amenities.getAmenityId());

  // ✅ Extract Amenities from Map
  Map<String, List<String>> amenitiesMap = request.getAmenities();
  Amenities amenities = new Amenities();
  amenities.setProject(project);
  amenities.setSwimming_pool(convertListToJson(amenitiesMap.get("swimming_pool")));
  amenities.setGym(convertListToJson(amenitiesMap.get("gym")));
  amenities.setClub_house(convertListToJson(amenitiesMap.get("club_house")));
  amenities.setCreche(convertListToJson(amenitiesMap.get("creche")));
  amenities.setChildren_parks(convertListToJson(amenitiesMap.get("children_parks")));
  amenities.setPark(convertListToJson(amenitiesMap.get("park")));
  amenities.setC_hall(convertListToJson(amenitiesMap.get("c_hall")));
  amenities.setTemple(convertListToJson(amenitiesMap.get("temple")));
  amenities.setOther(convertListToJson(amenitiesMap.get("other")));

  amenities = amenitiesRepository.save(amenities);
  System.out.println("✅ Amenities Saved with ID: " + amenities.getAmenityId());

  // ✅ Extract Nearby from Map
  Map<String, List<String>> nearbyMap = request.getNearby();
  Nearby nearby = new Nearby();
  nearby.setProject(project);
  nearby.setSchools(convertListToJson(nearbyMap.get("schools")));
  nearby.setHospitals(convertListToJson(nearbyMap.get("hospitals")));
//   nearby.setIt_Parks(convertListToJson(nearbyMap.get(" it_Parks")));
  nearby.setIt_parks(convertListToJson(nearbyMap.get("it_parks")));
  logger.info("It Parks: {}", nearbyMap.get("it_parks"));

  nearby.setHangouts(convertListToJson(nearbyMap.get("hangouts")));
  nearby.setCinemas(convertListToJson(nearbyMap.get("cinemas")));
  nearby.setMetro(convertListToJson(nearbyMap.get("metro")));

  nearby = nearbyRepository.save(nearby);
  System.out.println("✅ Nearby Saved with ID: " + nearby.getNearId());
       

        // ExpertReview expert = new ExpertReview(
        //     project,
        //     request.getReviewText() // ❌ Removed extra comma
        // );
        // expert = expertReviewRepository.save(expert);
        // System.out.println("✅ Expert Review Saved with ID: " + expert.getReviewId());
       // ✅ Save Expert Review if provided
        if (request.getExpertReview() != null && request.getExpertReview().getReviewText() != null) {
            ExpertReview expertReview = new ExpertReview();
            expertReview.setProject(project);
            expertReview.setReviewText(request.getExpertReview().getReviewText());

            expertReview = expertReviewRepository.save(expertReview);
            System.out.println("✅ Expert Review Saved with ID: " + expertReview.getReviewId());
        } else {
            System.out.println("⚠️ No expert review provided.");
        }
       
        // ExpertReview expert= new ExpertReview(
        //     project,
        //     request.getReviewText()
        // );
        // expert = expertReviewRepository.save(expert);
        // System.out.println("✅ Expert Review Saved with ID: " + expert.getReviewId());
       


        if (request.getOneBHKConfig() != null && !request.getOneBHKConfig().isEmpty()) {
            // int index=0; //track file index
            for (OneBHKConfig config : request.getOneBHKConfig()) {
                if (config != null) { // Additional null check for safety
                    OneBHKConfig entity = new OneBHKConfig();
                    entity.setProject(project);
                    entity.setTypeNumber(config.getTypeNumber()); // Allows multiple types for 1BHK
                    // entity.setType1Bedrooms(config.getType1Bedrooms());
                    entity.setType1Units(config.getType1Units());
                    entity.setType1Area(config.getType1Area());
                   /// ✅ Fetch images based on typeNumber (handling null cases)
            List<String> OneBHKimageUrls = oneBHKType1ImageUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            entity.setType1Images(OneBHKimageUrls);


            // ✅ Fetch floor plans based on typeNumber (handling null cases)
            List<String> floorPlanUrls = oneBHKType1FloorPlanUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            entity.setType1FloorPlan(floorPlanUrls);
                    entity.setType1Bathrooms(config.getType1Bathrooms());
                    entity.setType1Balcony(config.getType1Balcony());
                    entity.setType1Parking(config.getType1Parking());
                    entity.setHallArea(config.getHallArea());
                    entity.setKitchenArea(config.getKitchenArea());
                    entity.setBedroom1Area(config.getBedroom1Area());
                    entity.setBathroom1Area(config.getBathroom1Area());
                    entity.setBathroom2Area(config.getBathroom2Area());
       
                    // Save to database only if it's valid
                    entity = oneBHKConfigRepository.save(entity);
                    System.out.println("✅ One BHK Config Saved with ID: " + entity.getOneBhkConfigId());
                    // index++;
                }
            }
        } else {
            System.out.println("❌ No One BHK Config found. Skipping save.");
        }


        if (request.getTwoBHKConfig() != null && !request.getTwoBHKConfig().isEmpty()) {
            for (TwoBHKConfig config : request.getTwoBHKConfig()) {
                if (config != null) { // Additional null check for safety
                    TwoBHKConfig twobhk = new TwoBHKConfig();
                    twobhk.setProject(project);
                    twobhk.setTypeNumber(config.getTypeNumber()); // Allows multiple types for 2BHK
                    twobhk.setType2Bedrooms(config.getType2Bedrooms());
                    twobhk.setType2Units(config.getType2Units());
                    twobhk.setType2Area(config.getType2Area());
                    List<String> TwoBHKimageUrls = twoBHKType2ImageUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
                    twobhk.setType2Images(TwoBHKimageUrls);


            // ✅ Fetch floor plans based on typeNumber (handling null cases)
                    List<String> floorPlanUrls = twoBHKType2FloorPlanUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
                    twobhk.setType2FloorPlan(floorPlanUrls);
                    // twobhk.setType2FloorPlan(config.getType2FloorPlan() != null ? config.getType2FloorPlan() : new ArrayList<>());
                    // twobhk.setType2Images(config.getType2Images() != null ? config.getType2Images() : new ArrayList<>());
                    twobhk.setType2Bathrooms(config.getType2Bathrooms());
                    twobhk.setType2Balcony(config.getType2Balcony());
                    twobhk.setType2Parking(config.getType2Parking());
                    twobhk.setHallArea(config.getHallArea());
                    twobhk.setKitchenArea(config.getKitchenArea());
                    twobhk.setBedroom1Area(config.getBedroom1Area());
                    twobhk.setBedroom2Area(config.getBedroom2Area());
                    twobhk.setBathroom1Area(config.getBathroom1Area());
                    twobhk.setBathroom2Area(config.getBathroom2Area()); // This line was duplicated, now fixed
       
                    // Save to database only if valid
                    twobhk = twoBHKConfigRepository.save(twobhk);
                    System.out.println("✅ Two BHK Config Saved with ID: " + twobhk.getTwoBhkConfigId());  
                }
            }
        } else {
            System.out.println("❌ No Two BHK Config found. Skipping save.");
        }
       
       
        // Save Three BHK Configurations
if (request.getThreeBHKConfig() != null && !request.getThreeBHKConfig().isEmpty()) {
    for (ThreeBHKConfig config : request.getThreeBHKConfig()) {
        if (config != null) {
            ThreeBHKConfig threebhk = new ThreeBHKConfig();
            threebhk.setProject(project);
            threebhk.setTypeNumber(config.getTypeNumber());
            threebhk.setType3Bedrooms(config.getType3Bedrooms());
            threebhk.setType3Units(config.getType3Units());
            threebhk.setType3Area(config.getType3Area());
            // threebhk.setType3FloorPlan(config.getType3FloorPlan() != null ? config.getType3FloorPlan() : new ArrayList<>());
            // threebhk.setType3Images(config.getType3Images() != null ? config.getType3Images() : new ArrayList<>());
            List<String> threeBHKImageUrls = threeBHKType3ImageUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            threebhk.setType3Images(threeBHKImageUrls);


            List<String> floorPlanUrls = threeBHKType3FloorPlanUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            threebhk.setType3FloorPlan(floorPlanUrls);
            threebhk.setType3Bathrooms(config.getType3Bathrooms());
            threebhk.setType3Balcony(config.getType3Balcony());
            threebhk.setType3Parking(config.getType3Parking());
            threebhk.setHallArea(config.getHallArea());
            threebhk.setKitchenArea(config.getKitchenArea());
            threebhk.setBedroom1Area(config.getBedroom1Area());
            threebhk.setBedroom2Area(config.getBedroom2Area());
            threebhk.setBedroom3Area(config.getBedroom3Area());
            threebhk.setBathroom1Area(config.getBathroom1Area());
            threebhk.setBathroom2Area(config.getBathroom2Area());
            threebhk.setBathroom3Area(config.getBathroom3Area());
            threebhk = threeBHKConfigRepository.save(threebhk);
            System.out.println("✅ Three BHK Config Saved with ID: " + threebhk.getThreeBhkConfigId());
        }
    }
} else {
    System.out.println("❌ No Three BHK Config found. Skipping save.");
}


        // Save Four BHK Configurations
if (request.getFourBHKConfig() != null && !request.getFourBHKConfig().isEmpty()) {
    for (FourBHKConfig config : request.getFourBHKConfig()) {
        if (config != null) {
            FourBHKConfig fourbhk = new FourBHKConfig();
            fourbhk.setProject(project);
            fourbhk.setTypeNumber(config.getTypeNumber());
            fourbhk.setType4Bedrooms(config.getType4Bedrooms());
            fourbhk.setType4Units(config.getType4Units());
            fourbhk.setType4Area(config.getType4Area());
            List<String> fourBHKImageUrls = fourBHKType4ImageUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            fourbhk.setType4Images(fourBHKImageUrls);


            List<String> floorPlanUrls = fourBHKType4FloorPlanUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            fourbhk.setType4FloorPlan(floorPlanUrls);
            // fourbhk.setType4FloorPlan(config.getType4FloorPlan() != null ? config.getType4FloorPlan() : new ArrayList<>());
            // fourbhk.setType4Images(config.getType4Images() != null ? config.getType4Images() : new ArrayList<>());
            fourbhk.setType4Bathrooms(config.getType4Bathrooms());
            fourbhk.setType4Balcony(config.getType4Balcony());
            fourbhk.setType4Parking(config.getType4Parking());
            fourbhk.setHallArea(config.getHallArea());
            fourbhk.setKitchenArea(config.getKitchenArea());
            fourbhk.setBedroom1Area(config.getBedroom1Area());
            fourbhk.setBedroom2Area(config.getBedroom2Area());
            fourbhk.setBedroom3Area(config.getBedroom3Area());
            fourbhk.setBedroom4Area(config.getBedroom4Area());
            fourbhk.setBathroom1Area(config.getBathroom1Area());
            fourbhk.setBathroom2Area(config.getBathroom2Area());
            fourbhk.setBathroom3Area(config.getBathroom3Area());
            fourbhk.setBathroom4Area(config.getBathroom4Area());


            fourbhk = fourBHKConfigRepository.save(fourbhk);
            System.out.println("✅ Four BHK Config Saved with ID: " + fourbhk.getFourBhkConfigId());
        }
    }
} else {
    System.out.println("❌ No Four BHK Config found. Skipping save.");
}


       
       
// Save Five BHK Configurations
if (request.getFiveBHKConfig() != null && !request.getFiveBHKConfig().isEmpty()) {
    for (FiveBHKConfig config : request.getFiveBHKConfig()) {
        if (config != null) {
            FiveBHKConfig fivebhk = new FiveBHKConfig();
            fivebhk.setProject(project);
            fivebhk.setTypeNumber(config.getTypeNumber());
            fivebhk.setType5Bedrooms(config.getType5Bedrooms());
            fivebhk.setType5Units(config.getType5Units());
            fivebhk.setType5Area(config.getType5Area());
            List<String> fiveBHKImageUrls = fiveBHKType5ImageUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            fivebhk.setType5Images(fiveBHKImageUrls);


            List<String> floorPlanUrls = fiveBHKType5FloorPlanUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            fivebhk.setType5FloorPlan(floorPlanUrls);
            // fivebhk.setType5FloorPlan(config.getType5FloorPlan() != null ? config.getType5FloorPlan() : new ArrayList<>());
            // fivebhk.setType5Images(config.getType5Images() != null ? config.getType5Images() : new ArrayList<>());
            fivebhk.setType5Bathrooms(config.getType5Bathrooms());
            fivebhk.setType5Balcony(config.getType5Balcony());
            fivebhk.setType5Parking(config.getType5Parking());
            fivebhk.setHallArea(config.getHallArea());
            fivebhk.setKitchenArea(config.getKitchenArea());
            fivebhk.setBedroom1Area(config.getBedroom1Area());
            fivebhk.setBedroom2Area(config.getBedroom2Area());
            fivebhk.setBedroom3Area(config.getBedroom3Area());
            fivebhk.setBedroom4Area(config.getBedroom4Area());
            fivebhk.setBedroom5Area(config.getBedroom5Area());
            fivebhk.setBathroom1Area(config.getBathroom1Area());
            fivebhk.setBathroom2Area(config.getBathroom2Area());
            fivebhk.setBathroom3Area(config.getBathroom3Area());
            fivebhk.setBathroom4Area(config.getBathroom4Area());
            fivebhk.setBathroom5Area(config.getBathroom5Area());


            fivebhk = fiveBHKConfigRepository.save(fivebhk);
            System.out.println("✅ Five BHK Config Saved with ID: " + fivebhk.getFiveBhkConfigId());
        }
    }
} else {
    System.out.println("❌ No Five BHK Config found. Skipping save.");
}


// Save Penthouse Configurations
if (request.getPenthouseConfig() != null && !request.getPenthouseConfig().isEmpty()) {
    for (PenthouseConfig config : request.getPenthouseConfig()) {
        if (config != null) {
            PenthouseConfig ph = new PenthouseConfig();
            ph.setProject(project);
            ph.setTypeNumber(config.getTypeNumber());
            ph.setPenthouseBedrooms(config.getPenthouseBedrooms());
            ph.setPenthouseUnits(config.getPenthouseUnits());
            ph.setPenthouseArea(config.getPenthouseArea());


            List<String> penthouseImageUrls = penthouseTypeImageUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            ph.setPenthouseImages(penthouseImageUrls);


            List<String> floorPlanUrls = penthouseTypeFloorPlanUrls.getOrDefault(config.getTypeNumber(), new ArrayList<>());
            ph.setPenthouseFloorPlan(floorPlanUrls);
            // ph.setPenthouseFloorPlan(config.getPenthouseFloorPlan() != null ? config.getPenthouseFloorPlan() : new ArrayList<>());
            // ph.setPenthouseImages(config.getPenthouseImages() != null ? config.getPenthouseImages() : new ArrayList<>());
            ph.setPenthouseBathrooms(config.getPenthouseBathrooms());
            ph.setPenthouseBalcony(config.getPenthouseBalcony());
            ph.setPenthouseParking(config.getPenthouseParking());
            ph.setHallArea(config.getHallArea());
            ph.setKitchenArea(config.getKitchenArea());
            ph.setBedroom1Area(config.getBedroom1Area());
            ph.setBedroom2Area(config.getBedroom2Area());
            ph.setBedroom3Area(config.getBedroom3Area());
            ph.setBedroom4Area(config.getBedroom4Area());
            ph.setBedroom5Area(config.getBedroom5Area());
            ph.setBedroom6Area(config.getBedroom6Area());
            ph.setBathroom1Area(config.getBathroom1Area());
            ph.setBathroom2Area(config.getBathroom2Area());
            ph.setBathroom3Area(config.getBathroom3Area());
            ph.setBathroom4Area(config.getBathroom4Area());
            ph.setBathroom5Area(config.getBathroom5Area());
            ph.setBathroom6Area(config.getBathroom6Area());


            ph = penthouseConfigRepository.save(ph);
            System.out.println("✅ Penthouse Config Saved with ID: " + ph.getPenthouseConfigId());
        }
    }
} else {
    System.out.println("❌ No Penthouse Config found. Skipping save.");
}


// Save Project Timelines
if (request.getProjectTimeline() != null && !request.getProjectTimeline().isEmpty()) {
    for (ProjectTimeLine timeline : request.getProjectTimeline()) {
        if (timeline != null) {
            ProjectTimeLine pt = new ProjectTimeLine();
            pt.setProject(project);
            pt.setMilestoneDate1(timeline.getMilestoneDate1());
            pt.setMilestoneStatus1(timeline.getMilestoneStatus1());


            pt.setMilestoneDate2(timeline.getMilestoneDate2());
            pt.setMilestoneStatus2(timeline.getMilestoneStatus2());


            pt.setMilestoneDate3(timeline.getMilestoneDate3());
            pt.setMilestoneStatus3(timeline.getMilestoneStatus3());


            pt.setMilestoneDate4(timeline.getMilestoneDate4());
            pt = projectTimeLineRepository.save(pt);
            System.out.println("✅ Project Timeline Saved with ID: " + pt.getId());
        }
    }
} else {
    System.out.println("❌ No Project Timeline found. Skipping save.");
}




// catch(JsonProcessingException e){
//     throw new RuntimeException("Failed to to parse JSON",e);
// }
}
    public List<GetEntityResponse> getAllEntities() {
        List<Organisation> organisations = organisationRepository.findAll();
        List<GetEntityResponse> responseList = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");




        for (Organisation organisation : organisations) {
            List<Project> projects = projectRepository.findByOrganisation(organisation);


            for (Project project : projects) {
                // ✅ FIX: Ensure projectDetails is fetched correctly
                ProjectDetails projectDetailsList = projectDetailsRepository.findByProject(project);
                

                GetEntityResponse response = new GetEntityResponse();
                response.setOrganisationName(organisation.getOrgName());
                response.setOrganisationCin(organisation.getOrgCin());
                response.setOrganisationOwners(organisation.getOrgOwners());
                response.setProjectsCompleted(organisation.getProjectsCompleted());


                response.setProjectName(project.getProjectName());
                response.setCity(project.getCity());
                response.setLocality(project.getLocality());
                response.setAddress(project.getAddress());
                response.setLatitude(project.getLatitude());
                response.setLongitude(project.getLongitude());
                response.setPropertyAreaSqmt(project.getPropertyAreaSqmt());
                response.setReraNumber(project.getReraNumber());
                response.setReraLink(project.getReraLink());
                response.setProjectVideoLink(project.getProjectVideoLink());
                response.setProjectImages(project.getProjectImages());
                // response.setProjectImages(Arrays.asList(project.getProjectImages()));
                // response.setSchools(Arrays.asList(project.getSchools().split(",")));
                // response.setHospitals(Arrays.asList(project.getHospitals().split(",")));
                // response.setMalls(Arrays.asList(project.getMalls().split(",")));
                // response.setMovieTheaters(Arrays.asList(project.getMovieTheaters().split(",")));


                if (projectDetailsList != null) {
                    response.setUnits(projectDetailsList.getUnits());
                    response.setProjectStatus(projectDetailsList.getProjectStatus());
                    response.setProjectLaunch(projectDetailsList.getProjectLaunch() != null
                            ? dateFormat.format(projectDetailsList.getProjectLaunch())
                            : null);


                    response.setProjectPlannedEnd(projectDetailsList.getProjectPlannedEnd() != null
                            ? dateFormat.format(projectDetailsList.getProjectPlannedEnd())
                            : null);
                    response.setPriceMin(projectDetailsList.getPriceMin());
                    response.setPriceMax(projectDetailsList.getPriceMax());
                    response.setAllInclusive(projectDetailsList.getAllInclusive());
                    // response.setAmenities(projectDetails.getAmenities());
                    response.setCoveredParking(projectDetailsList.getCoveredParking());
                    response.setBankApproved(projectDetailsList.getBankApproved());
                    response.setBanks(projectDetailsList.getBanks());
                }


                // ✅ FIX: Ensure correct handling of list-based repository results
                List<OneBHKConfig> oneBHKConfigs = oneBHKConfigRepository.findByProject(project);
                response.setOneBHKConfig(!oneBHKConfigs.isEmpty() ? oneBHKConfigs.get(0) : null);


                List<TwoBHKConfig> twoBHKConfigs = twoBHKConfigRepository.findByProject(project);
                response.setTwoBHKConfig(!twoBHKConfigs.isEmpty() ? twoBHKConfigs.get(0) : null);


                List<ThreeBHKConfig> threeBHKConfigs = threeBHKConfigRepository.findByProject(project);
                response.setThreeBHKConfig(!threeBHKConfigs.isEmpty() ? threeBHKConfigs.get(0) : null);


                List<FourBHKConfig> fourBHKConfigs = fourBHKConfigRepository.findByProject(project);
                response.setFourBHKConfig(!fourBHKConfigs.isEmpty() ? fourBHKConfigs.get(0) : null);


                List<FiveBHKConfig> fiveBHKConfigs = fiveBHKConfigRepository.findByProject(project);
                response.setFiveBHKConfig(!fiveBHKConfigs.isEmpty() ? fiveBHKConfigs.get(0) : null);


                List<PenthouseConfig> penthouseConfigs = penthouseConfigRepository.findByProject(project);
                response.setPenthouseConfig(!penthouseConfigs.isEmpty() ? penthouseConfigs.get(0) : null);


                List<ProjectTimeLine> projectTimelines = projectTimeLineRepository.findByProject(project);
                response.setProjectTimeLine(!projectTimelines.isEmpty() ? projectTimelines.get(0):null);


                responseList.add(response);
            }
        }


        return responseList;
    }
    
   
    // ✅ Convert List<String> to JSON
    private String convertListToJson(List<String> list) {
        try {
            return list != null ? objectMapper.writeValueAsString(list) : "[]";
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting list to JSON", e);
        }
    }
public List<ProjectSearchProjection> searchProjects(Integer budgetMin, Integer budgetMax, String city, String bhkType, String typeProperty) {
    List<Project> projects = projectRepository.searchProjects(city, budgetMin, budgetMax, bhkType, typeProperty);
    return projects.stream().map(this::convertToDTO).collect(Collectors.toList());
}


private ProjectSearchProjection convertToDTO(Project project) {
    ProjectSearchProjection dto = new ProjectSearchProjection();
    dto.setProjectId(project.getProjectId());
    dto.setProjectName(project.getProjectName());
    dto.setProjectAreaSqmt(project.getPropertyAreaSqmt());
    dto.setProjectImages(project.getProjectImages());
    dto.setLatitude(project.getLatitude());
    dto.setLongitude(project.getLongitude());
    dto.setCity(project.getCity());
    dto.setAddress(project.getAddress());




    // Handling List<ProjectDetails>
    if (project.getProjectDetails() != null && !project.getProjectDetails().isEmpty()) {
        // Assuming you want the first ProjectDetails (modify as needed)
        ProjectDetails details = project.getProjectDetails().get(0);
        dto.setPriceMin(details.getPriceMin());
        dto.setPriceMax(details.getPriceMax());
        dto.setUnits(details.getUnits());
    }
     // ✅ Dynamically check available BHK types
     List<String> availableBHKs = new ArrayList<>();


     List<OneBHKConfig> oneBHKConfigs = oneBHKConfigRepository.findByProject_ProjectId(project.getProjectId());
     List<TwoBHKConfig> twoBHKConfigs = twoBHKConfigRepository.findByProject_ProjectId(project.getProjectId());
     List<ThreeBHKConfig> threeBHKConfigs = threeBHKConfigRepository.findByProject_ProjectId(project.getProjectId());
     List<FourBHKConfig> fourBHKConfigs = fourBHKConfigRepository.findByProject_ProjectId(project.getProjectId());

     // Check if valid data exists
if (!oneBHKConfigs.isEmpty() && hasValidData(oneBHKConfigs.get(0))) availableBHKs.add("1BHK");
if (!twoBHKConfigs.isEmpty() && hasValidData(twoBHKConfigs.get(0))) availableBHKs.add("2BHK");
if (!threeBHKConfigs.isEmpty() && hasValidData(threeBHKConfigs.get(0))) availableBHKs.add("3BHK");
if (!fourBHKConfigs.isEmpty() && hasValidData(fourBHKConfigs.get(0))) availableBHKs.add("4BHK");


    //  if (project.getOneBhkConfig() != null && hasValidData(project.getOneBhkConfig())) availableBHKs.add("1BHK");
    //  if (project.getTwoBhkConfig() != null && hasValidData(project.getTwoBhkConfig())) availableBHKs.add("2BHK");
    //  if (project.getThreeBhkConfig() != null && hasValidData(project.getThreeBhkConfig())) availableBHKs.add("3BHK");
     dto.setAvailableBHKs(availableBHKs);


     
    return dto;
}



public CardDetails getProjectById(Integer id) {
    // Project project = projectRepository.findById(id)
    // .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
//    Project project= projectRepository.findByProjectId(id)
//     .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found with id: " + id));
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

    ExpertReview expertReview = expertReviewRepository.findByProject_ProjectId(id);


    // Construct response DTO
    CardDetails cardDetails = new CardDetails();
    cardDetails.setProjectName(project.getProjectName());
    cardDetails.setAddress(project.getAddress());
    cardDetails.setProjectImages(project.getProjectImages());
    cardDetails.setProjectVideoLink(project.getProjectVideoLink());
    cardDetails.setReralink(project.getReraLink());
    cardDetails.setCity(project.getCity());


    // Set price range
    if (projectDetailsList != null) {
        cardDetails.setPriceMin(projectDetailsList.getPriceMin());
        cardDetails.setPriceMax(projectDetailsList.getPriceMax());
    }
    

    // List<String> availableBHKs = new ArrayList<>();
    //   // Check if valid data exists
    // if (!oneBHKConfig.isEmpty() && hasValidData(oneBHKConfig.get(0))) availableBHKs.add("1BHK");
    // if (!twoBHKConfig.isEmpty() && hasValidData(twoBHKConfig.get(0))) availableBHKs.add("2BHK");
    // if (!threeBHKConfig.isEmpty() && hasValidData(threeBHKConfig.get(0))) availableBHKs.add("3BHK");




    // cardDetails.setAvailableBHKs(availableBHKs);




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
       
        cardDetails.setAmenities(amenitiesDTO);
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
        // System.out.println("IT Parks in Request: " + nearbyDTO.getItParks());

        cardDetails.setNearby(nearbyDTO);
    }
     
    ExpertReviewDto expertReviewDto = new ExpertReviewDto();
    expertReviewDto.setReviewText(expertReview.getReviewText());


    cardDetails.setExpertReview(expertReviewDto);


    // Set BHK configurations
    cardDetails.setOneBHKConfig(oneBHKConfig);
    cardDetails.setTwoBHKConfig(twoBHKConfig);
    cardDetails.setThreeBHKConfig(threeBHKConfig);
    cardDetails.setFourBHKConfig(fourBHKConfig);

    return cardDetails;
}
public List<RecommendedProperty> getRecommendedProperties() {
    List<Project> projects = projectRepository.findByPreferred("Y"); // Fetch only preferred projects
    return projects.stream()
    .map(project -> {
        ProjectDetails details = projectDetailsRepository.findByProjectId(project.getProjectId());
        if (details != null) {
            return convertToRecommendedPropertyDTO(project, details);
        }
        return null; // or filter out null later
    })
    .filter(Objects::nonNull)
    .collect(Collectors.toList());
}

// private RecommendedProperty convertToRecommendedPropertyDTO(Project project, ProjectDetails details) {
//     // Fetch available BHKs for the current project
//     List<String> availableBHKs = getAvailableBHKsForProject(project.getProjectId());

//     // Create and return the RecommendedProperty DTO
//     return new RecommendedProperty(project, details, availableBHKs);
// }

// // Example method to get available BHKs for a project
// private List<String> getAvailableBHKsForProject(Integer projectId) {
//     List<String> availableBHKs = new ArrayList<>();

//     // Assuming you have a way to check for available BHKs
//     List<OneBHKConfig> oneBHKConfigs = oneBHKConfigRepository.findByProject_ProjectId(projectId);
//     List<TwoBHKConfig> twoBHKConfigs = twoBHKConfigRepository.findByProject_ProjectId(projectId);
//     List<ThreeBHKConfig> threeBHKConfigs = threeBHKConfigRepository.findByProject_ProjectId(projectId);

//     // Check if valid data exists
//     if (!oneBHKConfigs.isEmpty() && hasValidData(oneBHKConfigs.get(0))) availableBHKs.add("1 BHK");
//     if (!twoBHKConfigs.isEmpty() && hasValidData(twoBHKConfigs.get(0))) availableBHKs.add("2 BHK");
//     if (!threeBHKConfigs.isEmpty() && hasValidData(threeBHKConfigs.get(0))) availableBHKs.add("3 BHK");

//     return availableBHKs;
// }
private RecommendedProperty convertToRecommendedPropertyDTO(Project project, ProjectDetails details) {
    if (project == null || details == null) {
        return null; // Handle null case
    }

    // Fetch available BHKs for the current project
    List<String> availableBHKs = getAvailableBHKsForProject(project.getProjectId());

    // Create and return the RecommendedProperty DTO
    return new RecommendedProperty(project, details, availableBHKs);
}

public List<String> getAvailableBHKsForProject(Integer projectId) {
    List<String> availableBHKs = new ArrayList<>();

    List<OneBHKConfig> oneBHKConfigs = oneBHKConfigRepository.findByProject_ProjectId(projectId);
    List<TwoBHKConfig> twoBHKConfigs = twoBHKConfigRepository.findByProject_ProjectId(projectId);
    List<ThreeBHKConfig> threeBHKConfigs = threeBHKConfigRepository.findByProject_ProjectId(projectId);
    List<FourBHKConfig> fourBHKConfigs = fourBHKConfigRepository.findByProject_ProjectId(projectId);

    // Check if valid data exists
    if (!oneBHKConfigs.isEmpty() && hasValidData(oneBHKConfigs.get(0))) availableBHKs.add("1BHK");
    if (!twoBHKConfigs.isEmpty() && hasValidData(twoBHKConfigs.get(0))) availableBHKs.add("2BHK");
    if (!threeBHKConfigs.isEmpty() && hasValidData(threeBHKConfigs.get(0))) availableBHKs.add("3BHK");
    if (!fourBHKConfigs.isEmpty() && hasValidData(fourBHKConfigs.get(0))) availableBHKs.add("4BHK");

    return availableBHKs;
}
private boolean hasValidData(BHKConfig config) {
    return config !=null && config.getProject()!=null && config.getProject().getProjectId() != null;
}


public boolean projectExistsByCityAndPrice(String city, Integer maxPrice) {
    List<Project> matched = projectRepository.findByCityAndMaxPrice(city, maxPrice);
    return !matched.isEmpty();
}
}

