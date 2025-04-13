import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

import {
  Button,
  Typography,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  // TextField,
  Grid,
  FormGroup,
} from "@mui/material";
import InputField from "../Components/InputField";
import DropdownField from "../Components/DropdownField";
import DatePicker from "../Components/DateController";
import CheckBox from "../Components/CheckBoxControl";
import Header from "./Header";
import ImageUpload from "../Components/ImageUpload";
import VideoUpload from "../Components/VideoUpload";
import TextArea from "../Components/TextAreaC";

// Step Titles
const initialSteps = [
  "Add Organization", //stage 0
  "Add Project", 
  "Add Amenities",
  "Add Near by Places",
  "Add Expert Review",
  "Add Project Details", 
  "Add One BHK", 
  "Add Two BHK", 
  "Add Three BHK", 
  "Add Four BHK", 
  "Add Five BHK", 
  "Add PentHouse", 
  "Review Details", 
];

const validationSchema = yup.object().shape({
  organization: yup.object({
    orgName: yup
      .string()
      .required("Organization name is required")
      .max(100, "Organization name cannot exceed 100 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    orgCIN: yup
      .string()
      .max(21, "CIN cannot exceed 21 characters")
      .matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
    orgOwners: yup
      .string()
      .matches(
        /^[A-Za-z\\s]+(,[A-Za-z\\s]+)*$/,
        "Owner Name must contain only letters"
      ),
    projectsCompleted: yup
      .number()
      .required("Projects Completed is required")
      .typeError("Projects Completed must be a number")
      .min(0, "Projects completed cannot be negative")
      .max(999, "Projects completed cannot exceed 999"),
  }),
  project: yup
    .object({
      projectname: yup
        .string()
        .max(200, "Project Name cannot exceed 100 characters")
        .required("Project Name is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        ),
      city: yup
        .string()
        .required("City is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        )
        .max(50, "City cannot exceed 50 characters"),
      locality: yup
        .string()
        .required("Locality is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        )
        .max(100, "City cannot exceed 100 characters"),
      TypeofProperty: yup
        .string()
        .required("Type of Property is required")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Type of property contains unsupported characters"
        )
        .max(100, "City cannot exceed 100 characters"),
      address: yup.string().required("Address is required"),
      latitude: yup
        .number()
        .required("Latitude is required")
        .min(-90, "Latitude must be between -90 and 90") // Minimum value
        .max(90, "Latitude must be between -90 and 90")
        .typeError("please enter a valid number"),
      longitude: yup
        .number()
        .required("Longitude is required")
        .typeError("please enter a valid number")
        .min(-180, "Latitude must be between -180 and 180") // Minimum value
        .max(180, "Latitude must be between -180 and 180"),
      area: yup
        .number()
        .required("Area is required")
        .typeError("Area must be a number")
        .max(999, "Area cannot exceed 3 digits"),
      reranumber: yup
        .string()
        .matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
      reralink: yup.string(),
      projectvideolink: yup.string(),
      projectimages: yup.string(),
      Images: yup
        .array()

        .of(
          yup
            .mixed()
            .required("Image is required")
            .test(
              "fileType",
              "Only images are allowed",
              (file) =>
                file &&
                ["image/jpeg", "image/png", "image/webp"].includes(file.type)
            )
            .test("fileSize", "File size too large (max: 5MB)", (file) =>
              file ? file.size <= 5 * 1024 * 1024 : true
            )
        )
        .min(1, "You must upload at least 1 image")
        .max(1, "You can upload up to 5 images"),

      videos: yup
        .array()
        .of(
          yup
            .mixed()
            .required("A video is required")
            .test(
              "fileType",
              "Only video files are allowed (mp4, webm, ogg)",
              (file) =>
                file &&
                ["video/mp4", "video/webm", "video/ogg"].includes(file.type)
            )
            .test(
              "fileSize",
              "Video size must be less than 50MB",
              (file) => file && file.size <= 50 * 1024 * 1024
            )
        )
        .min(1, "At least one video is required")
        .max(1, "You can upload up to 5 videos"),
    })
    .default(() => ({ videos: [] })),
  Amenities: yup.object({
    swimming_pool: yup.string().typeError("Please enter in letters"),
    temple: yup.string(),
    gym: yup.string().typeError("Please enter in letters"),
    creche: yup.string(),
    children_parks: yup.string(),
    park: yup.string(),
    club_house: yup.string(),
    c_hall: yup.string(),
    other: yup.string(),
  }),
  NearbyPlaces: yup.object({
    schools: yup.string(),
    hospitals: yup.string(),
    it_parks: yup.string(),
    hangouts: yup.string(),
    cinemas: yup.string(),
    metro: yup.string(),
  }),
  ExpertReview:yup.object({
    expertReview: yup.string(),
  }),
  projectDetails: yup.object({
    units: yup
      .number()
      .required("Units is required")
      .typeError("Units must be a number")
      .min(0, "Units cannot be negative"),
    projectstatus: yup
      .string()
      .required("Project Status is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    projectlaunch: yup.date().required("Project Launch Date is required"),
    ProjectPlannedEnd: yup
      .date()
      .required("Project Planned End Date is required"),
    pricemin: yup
      .number()
      .required("Price Min is required")
      .typeError("Price Min must be a number")
      .min(0, "Price Min cannot be negative"),

    pricemax: yup
      .number()
      .typeError("Price Max must be a number")
      .min(0, "Price Max cannot be negative")
      .required("Price Max is required"),
    allInclusive: yup.boolean().required("All Inclusive is required"),
    coveredparking: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    bankapproved: yup.boolean().oneOf([true], "You must accept the terms."),
    banks: yup
      .string()
      .typeError("Banks must be a string")
      .matches(
        /^[A-Za-z\\s]+(,[A-Za-z\\s]+)*$/,
        "Organization name contains unsupported characters"
      ),
    // bhk1: yup.boolean(),
  }),
  oneBHKConfig:yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("typeNumber is required").typeError("please dispaly"),
      type1Units: yup.string().required("type1Units is required"),
      type1area: yup.string().required("type1area is required"),
      type1floorplan: yup.array().of(yup.string()).required("type1floorplan is required"),
      type1images: yup.array().of(yup.string()).required("type1images is required"),
      type1BedroomArea: yup.string().required("type1BedroomArea is required"),
      type1HallArea: yup.string().required("type1HallArea is required"),
      type1KitchenArea: yup.string().required("type1KitchenArea is required"),
      type1bathrooms: yup.string().required("type1bathrooms is required"),
      type1bathroom1: yup.string().required("type1bathroom1 is required"),
      type1bathroom2: yup.string().nullable(), // Optional field
      type1balcony: yup.string().required("type1balcony is required"),
      type1parking: yup.string().required("type1parking is required"),
      enableconfig: yup.boolean().required("enableconfig is required"),
    })
  ),
  twoBHKConfig: yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("Type Number is required"),
      type2Units: yup.number().required("Type 2 Units is required").min(0, "Type 2 Units cannot be negative"),
      type2area: yup.number().required("Type 2 Area is required").min(0, "Type 2 Area cannot be negative"),
      type2floorplan: yup.array().of(yup.string()).required("Type 2 Floor Plan is required"),
      type2images: yup.array().of(yup.string()).required("Type 2 Images are required"),
      type2bathrooms: yup.number().required("Type 2 Bathrooms is required").min(0, "Type 2 Bathrooms cannot be negative"),
      type2balcony: yup.number().required("Type 2 Balcony is required").min(0, "Type 2 Balcony cannot be negative"),
      type2parking: yup.number().required("Type 2 Parking is required").min(0, "Type 2 Parking cannot be negative"),
    })
  ),
  threeBHKConfig: yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("Type Number is required"),
      type3Units: yup.number().required("Type 3 Units is required").min(0, "Type 3 Units cannot be negative"),
      type3area: yup.number().required("Type 3 Area is required").min(0, "Type 3 Area cannot be negative"),
      type3floorplan: yup.array().of(yup.string()).required("Type 3 Floor Plan is required"),
      type3images: yup.array().of(yup.string()).required("Type 3 Images are required"),
      type3bathrooms: yup.number().required("Type 3 Bathrooms is required").min(0, "Type 3 Bathrooms cannot be negative"),
      type3balcony: yup.number().required("Type 3 Balcony is required").min(0, "Type 3 Balcony cannot be negative"),
      type3parking: yup.number().required("Type 3 Parking is required").min(0, "Type 3 Parking cannot be negative"),
    })
  ),
  fourBHKConfig: yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("Type Number is required"),
      type4Units: yup.number().required("Type 4 Units is required").min(0, "Type 4 Units cannot be negative"),
      type4area: yup.number().required("Type 4 Area is required").min(0, "Type 4 Area cannot be negative"),
      type4floorplan: yup.array().of(yup.string()).required("Type 4 Floor Plan is required"),
      type4images: yup.array().of(yup.string()).required("Type 4 Images are required"),
      type4bathrooms: yup.number().required("Type 4 Bathrooms is required").min(0, "Type 4 Bathrooms cannot be negative"),
      type4balcony: yup.number().required("Type 4 Balcony is required").min(0, "Type 4 Balcony cannot be negative"),
      type4parking: yup.number().required("Type 4 Parking is required").min(0, "Type 4 Parking cannot be negative"),
    })
  ),
  fiveBHKConfig: yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("Type Number is required"),
      type5Units: yup.number().required("Type 5 Units is required").min(0, "Type 5 Units cannot be negative"),
      type5area: yup.number().required("Type 5 Area is required").min(0, "Type 5 Area cannot be negative"),
      type5floorplan: yup.array().of(yup.string()).required("Type 5 Floor Plan is required"),
      type5images: yup.array().of(yup.string()).required("Type 5 Images are required"),
      type5bathrooms: yup.number().required("Type 5 Bathrooms is required").min(0, "Type 5 Bathrooms cannot be negative"),
      type5balcony: yup.number().required("Type 5 Balcony is required").min(0, "Type 5 Balcony cannot be negative"),
      type5parking: yup.number().required("Type 5 Parking is required").min(0, "Type 5 Parking cannot be negative"),
    })
  ),
  penthouseConfig: yup.object({
    penthouseUnits: yup
      .number()
      .typeError("Penthouse Units must be a number")
      .required("Penthouse Units is required")
      .min(1, "At least 1 penthouse unit is required"),

    penthouseArea: yup
      .number()
      .typeError("Penthouse Area must be a number")
      .required("Penthouse Area is required")
      .positive("Penthouse Area must be positive"),

    penthouseFloorPlan: yup
      .array()
      .min(1, "At least one floor plan is required")
      .required("Floor plan is required"),

    penthouseBathrooms: yup
      .number()
      .typeError("Penthouse Bathrooms must be a number")
      .required("Number of bathrooms is required")
      .min(1, "At least 1 bathroom is required"),

    penthouseBalcony: yup.string().required("Balcony details are required"),

    penthouseParking: yup.string().required("Parking information is required"),

    penthouseImages: yup
      .array()
      .min(1, "At least one penthouse image is required")
      .required("Penthouse images are required"),

    typeNumber: yup.string().when("enableconfig", {
      is: true,
      then: (schema) =>
        schema.required(
          "Type number is required when additional config is enabled"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),

    hallArea: yup
      .number()
      .typeError("Hall Area must be a number")
      .required("Hall Area is required")
      .positive("Hall Area must be positive"),

    kitchenArea: yup
      .number()
      .typeError("Kitchen Area must be a number")
      .required("Kitchen Area is required")
      .positive("Kitchen Area must be positive"),

    // Dynamic bedroom areas (bedroom1Area to bedroom6Area)
    ...Array.from({ length: 6 }, (_, i) => i + 1).reduce((acc, num) => {
      acc[`bedroom${num}Area`] = yup
        .number()
        .typeError(`Bedroom ${num} Area must be a number`)
        .required(`Bedroom ${num} Area is required`)
        .positive(`Bedroom ${num} Area must be positive`);
      return acc;
    }, {}),

    // Dynamic bathroom areas (bathroom1Area to bathroom6Area)
    ...Array.from({ length: 6 }, (_, i) => i + 1).reduce((acc, num) => {
      acc[`bathroom${num}Area`] = yup
        .number()
        .typeError(`Bathroom ${num} Area must be a number`)
        .required(`Bathroom ${num} Area is required`)
        .positive(`Bathroom ${num} Area must be positive`);
      return acc;
    }, {}),

    enableconfig: yup.boolean(),

    // Conditional fields for additional configuration
    penthouseFloorPlan2: yup.array().when("enableconfig", {
      is: true,
      then: (schema) =>
        schema
          .min(
            1,
            "Floor plan for Type 2 is required when additional config is enabled"
          )
          .required("Floor plan for Type 2 is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    penthouseImages2: yup.array().when("enableconfig", {
      is: true,
      then: (schema) =>
        schema
          .min(
            1,
            "Penthouse images for Type 2 are required when additional config is enabled"
          )
          .required("Penthouse images for Type 2 are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});

const MultiStageForm = () => {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      oneBHKConfig: prev.oneBHKConfig || [{}],
      twoBHKConfig: prev.twoBHKConfig || [{}],
      threeBHKConfig: prev.threeBHKConfig || [{}],
      fourBHKConfig: prev.fourBHKConfig || [{}],
      fiveBHKConfig: prev.fiveBHKConfig || [{}], // Ensure array is initialized
    }));
  }, []);

  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({
    organization: {
      orgName: "",
      orgCIN: "",
      orgOwners: "",
      projectsCompleted: "",
    },

    project: {
      projectname: "",
      city: "Pune",
      locality: "",
      TypeofProperty: "",
      address: "",
      latitude: "",
      longitude: "",
      area: "",
      reranumber: "",
      reralink: "",
      projectvideolink: "",
      projectimages: "",
      Images: [],
      Videos: [],
    },
    Amenities: {
      swimming_pool: "",
      temple: "",
      gym: "",
      creche: "",
      children_parks: "",
      park: "",
      club_house: "",
      c_hall: "",
      other: "",
    },
    NearbyPlaces: {
      schools: "",
      hospitals: "",
      it_parks: "",
      hangouts: "",
      cinemas: "",
      metro: "",
    },
    ExpertReview:{
      expertReview:"",
    },
    projectDetails: {
      units: "",
      allInclusive: false,
      projectstatus: "",
      projectlaunch: null,
      ProjectPlannedEnd: null,
      pricemin: "",
      pricemax: "",
      coveredparking: "",
      bankapproved: false,
      banks: "",
      deleted: false,
    },
    oneBHKConfig: [
      {
        typeNumber: 1,
        type1Units: "",
        type1area: "",
        type1floorplan: [],
        type1images: [],
        type1BedroomArea: "",
        type1HallArea: "",
        type1KitchenArea: "",
        type1bathrooms: "",
        type1bathroom1: "",
        type1bathroom2: "",
        type1balcony: "",
        type1parking: "",
        enableconfig: false,
      },
    ],
    twoBHKConfig: [
      {
        typeNumber: 1,
        type2Units: "",
        type2area: "",
        type2floorplan: [],
        type2images: [],
        type2Bedrooms: "",
        type2Bedroom1: "",
        type2Bedroom2: "",
        type2HallArea: "",
        type2KitchenArea: "",
        type2bathrooms: "",
        type2bathroom1: "",
        type2bathroom2: "",
        type2balcony: "",
        type2parking: "",
        enableconfig: false,
      },
    ],

    threeBHKConfig: [
      {
        typeNumber: 1,
        type3Units: "",
        type3area: "",
        type3floorplan: [],
        type3images: [],
        type3Bedroom1: "",
        type3Bedroom2: "",
        type3Bedroom3: "",
        type3Bedrooms: "",
        type3HallArea: "",
        type3KitchenArea: "",
        type3bathrooms: "",
        type3bathroom1: "",
        type3bathroom2: "",
        type3bathroom3: "",
        type3balcony: "",
        type3parking: "",
        enableconfig: false,
      },
    ],
    fourBHKConfig: [
      {
        typeNumber: 1,
        type4Units: "",
        type4area: "",
        type4floorplan: [],
        type4images: [],
        type4Bedrooms: "",
        type4Bedroom1: "",
        type4Bedroom2: "",
        type4Bedroom3: "",
        type4Bedroom4: "",
        type4HallArea: "",
        type4KitchenArea: "",
        type4bathrooms: "",
        type4bathroom1: "",
        type4bathroom2: "",
        type4bathroom3: "",
        type4bathroom4: "",
        type4balcony: "",
        type4parking: "",
        enableconfig: false,
      },
    ],

    fiveBHKConfig: [
      {
        typeNumber: 1,
        type5Units: "",
        type5area: "",
        type5images: [],
        type5floorplan: [],
        type5Bedrooms: "",
        type5Bedroom1: "",
        type5Bedroom2: "",
        type5Bedroom3: "",
        type5Bedroom5: "",
        type5Bedroom4: "",
        type5HallArea: "",
        type5KitchenArea: "",
        type5bathrooms: "",
        type5bathroom1: "",
        type5bathroom2: "",
        type5bathroom3: "",
        type5bathroom4: "",
        type5bathroom5: "",
        type5balcony: "",
        type5parking: "",
        enableconfig: false,
      },
    ],
    penthouseConfig: [
      {
        typeNumber: 1,
        penthouseUnits: "",
        penthouseArea: "",
        penthouseFloorPlan: [],
        penthouseBathrooms: "",
        penthouseBedrooms: "",
        penthouseBalcony: "",
        penthouseParking: "",
        penthouseImages: [],
        hallArea: "",
        kitchenArea: "",
        bedrooms: "",
        bedroom1Area: "",
        bedroom2Area: "",
        bedroom3Area: "",
        bedroom4Area: "",
        bedroom5Area: "",
        bedroom6Area: "",
        bathroom1Area: "",
        bathroom2Area: "",
        bathroom3Area: "",
        bathroom4Area: "",
        bathroom5Area: "",
        bathroom6Area: "",
        enableconfig: false,
      },
    ],
  });

  const [cachedData, setCachedData] = useState({
    organization: {},
    project: {},
    projectDetails: {},
    Amenities: {},
    NearbyPlaces: {},
    ExpertReview:{},
    oneBHKConfig: {},
    twoBHKConfig: {},
    threeBHKConfig: {},
    fourBHKConfig: {},
    fiveBHKConfig: {},
    PentHouse: {},
  });

  const [warnings, setWarnings] = useState({});
  const [proceedToOneBHK, setProceedToOneBHK] = useState(false);
  const [proceedToTwoBHK, setProceedToTwoBHK] = useState(false);
  const [proceedToThreeBHK, setProceedToThreeBHK] = useState(false);
  const [proceedToFourBHK, setProceedToFourBHK] = useState(false);
  const [proceedToFiveBHK, setProceedToFiveBHK] = useState(false);
  const [proceedToPentHouse, setProceedToPentHouse] = useState(false);
  const handleChange = (section, field, value) => {
    if (!section || !field) {
      console.error("❌ Missing parameters in handleChange:", {
        section,
        field,
      });
      return;
    }

    setFormData((prev) => {
      const updatedData = { ...prev };
  
      // Check if the section is an array (e.g., oneBHKConfig[0])
      const arrayMatch = section.match(/^(\w+)\[(\d+)\]$/);
      if (arrayMatch) {
        const [, arrayName, index] = arrayMatch;
        const arrayIndex = Number(index);
  
        updatedData[arrayName] = [...(updatedData[arrayName] || [])]; // Ensure a new array reference
        updatedData[arrayName][arrayIndex] = {
          ...(updatedData[arrayName][arrayIndex] || {}),
          [field]: value,
        };
  
         // ✅ Call validateField() like in the next stage
        validateField(arrayName, field, value, updatedData, arrayIndex);
         console.log("✅ Calling validateField for:", section, field, "Index:", index);

      } else {
        // Handle normal nested objects
        updatedData[section] = {
          ...(updatedData[section] || {}),
          [field]: value,
        };
  
        // Validate normally
        validateField(section, field, value, updatedData);
      }
  
      console.log("✅ Updated Form Data: ", updatedData);
      return { ...updatedData }; // Ensure React detects the state change
    });
  };

   const validateField = async (section, field, value, updatedData, index = null) => {
    try {
     // Validate the field using Yup schema
    console.log("🔍 Validating: ", { section, field, value });
    await validationSchema.validateAt(`${section}.${field}`, updatedData);

      // Clear the error if validation is successful
      setWarnings((prev) => {
        if (index !== null) {
          // Ensure we have an array for the section
          const arr = prev[section] ? [...prev[section]] : [];
          if (arr[index]) {
            // Remove the field error from the object at this index
            const { [field]: removed, ...rest } = arr[index];
            arr[index] = rest;
          }
          return { ...prev, [section]: arr };
        } else {
          const updatedWarnings = { ...prev };
          if (updatedWarnings[section]) {
            delete updatedWarnings[section][field];
            if (Object.keys(updatedWarnings[section]).length === 0) {
              delete updatedWarnings[section];
            }
          }
          return updatedWarnings;
        }
      });
  
      return true; // Validation passed
    } catch (error) {
      // Set error message if validation fails
      setWarnings((prev) => {
        if (index !== null) {
          const arr = prev[section] ? [...prev[section]] : [];
          arr[index] = { ...(arr[index] || {}), [field]: error.message };
          return { ...prev, [section]: arr };
        } else {
          return {
            ...prev,
            [section]: {
              ...prev[section],
              [field]: error.message,
            },
          };
        }
      });
      console.log("❌ Validation Failed:", error.message);
      return false; // Validation failed
    }
  };
  
  const nextStage = async () => {
    // const isType2Enabled = formData.oneBHKConfig.enableconfig === "yes";

    try {
      // Ensure oneBHKConfig is always an array
      if (!Array.isArray(formData.oneBHKConfig)) {
        setFormData((prev) => ({ ...prev, oneBHKConfig: [] }));
      }
      // 1. Define required fields for each stage
      const requiredFields = {
        0: ["organization.orgName", "organization.projectsCompleted"],
        1: [
          "project.projectname",
          "project.city",
          "project.locality",
          "project.address",
          "project.latitude",
          "project.longitude",
          "project.area",
        ],
        2: [
          "Amenities.swimming_pool",
          "Amenities.temple",
          "Amenities.gym",
          "Amenities.creche",
          "Amenities.children_parks",
          "Amenities.park",
          "Amenities.club_house",
          "Amenities.c_hall",
          "Amenities.other",
        ], // Stage 2
        3: [
          "NearbyPlaces.schools",
          "NearbyPlaces.hospitals",
          "NearbyPlaces.it_parks",
          "NearbyPlaces.hangouts",
          "NearbyPlaces.cinemas",
          "NearbyPlaces.metro",
        ], // Stage 3
        5: [
          "projectDetails.units",
          "projectDetails.projectstatus",
          "projectDetails.projectlaunch",
          "projectDetails.ProjectPlannedEnd",
          "projectDetails.pricemin",
          "projectDetails.pricemax",
          "projectDetails.allInclusive",
          "projectDetails.coveredparking",
          "projectDetails.bankapproved",
          "projectDetails.banks",
        ], // Stage 4
        6: [
          "oneBHKConfig[].type1Units",
          "oneBHKConfig[].type1area",
          "oneBHKConfig[].type1bathrooms",
        ], // Stage 5
        7: [
          "twoBHKConfig[].type2Units",
          "twoBHKConfig[].type2area",
          "twoBHKConfig[].type2bathrooms",
          "twoBHKConfig[].type2balcony",
          "twoBHKConfig[].type2parking",
        ], // Stage 6
        8: [
          "threeBHKConfig[].type3Units",
          "threeBHKConfig[].type3area",
          "threeBHKConfig[].type3bathrooms",
          "threeBHKConfig[].type3balcony",
          "threeBHKConfig[].type3parking",
        ], // Stage 7
        9: [
          "fourBHKConfig[].type4Units",
          "fourBHKConfig[].type4area",
          "fourBHKConfig[].type4bathrooms",
          "fourBHKConfig[].type4balcony",
          "fourBHKConfig[].type4parking",
        ], // Stage 8
        10: [
          "fiveBHKConfig[].type5Units",
          "fiveBHKConfig[].type5area",
          "fiveBHKConfig[].type5bathrooms",
          "fiveBHKConfig[].type5balcony",
          "fiveBHKConfig[].type5parking",
        ], // Stage 9
        11: [
          "penthouseConfig.typePenthouseUnits",
          "penthouseConfig.typePenthouseArea",
          "penthouseConfig.typePenthouseBathrooms",
          "penthouseConfig.typePenthouseBalcony",
          "penthouseConfig.typePenthouseParking",
        ],
      };

      const currentFields = requiredFields[stage] || [];

      // Utility to safely access nested properties
      const safeAccess = (obj, path) => {
        return path.split(".").reduce((acc, key) => {
          if (!acc) return undefined;
          if (key.endsWith("[]")) {
            const arrayKey = key.replace("[]", "");
            return Array.isArray(acc[arrayKey]) ? acc[arrayKey] : [];
          } else if (/\[\d+\]/.test(key)) {
            const [arrayKey, index] = key.match(/(\w+)\[(\d+)\]/).slice(1);
            return acc[arrayKey] ? acc[arrayKey][Number(index)] : undefined;
          }
          return acc[key];
        }, obj);
      };
      
      const validations = currentFields.flatMap((field) => {
        if (field.includes("[]")) {
          const [arrayName, property] = field.replace("[]", "").split(".");
          const arrayData = safeAccess(formData, arrayName) || [];
          return arrayData.map((item, index) =>
            validateField(arrayName, property, item?.[property], formData, index)
          );
        } else {
          const [section, key] = field.split(".");
          const value = safeAccess(formData, field);
          return [validateField(section, key, value, formData)];
        }
      });
      
      // Wait for all validations and allow navigation
      const validationResults = await Promise.all(validations);

      // Log validation results for debugging
    console.log("✅ Validation Results: ", validationResults);

    // Check if all validations passed
    if (validationResults.every(result => result === true)) {
      // Move to the next stage
      setStage((prevStage) => prevStage + 1);

      const cacheMap = {
        0: "organization",
        1: "project",
        2: "projectDetails",
        3: "Amenities",
        4: "NearbyPlaces",
        5:"ExpertReview",
        6: "oneBHKConfig",
        7: "twoBHKConfig",
        8: "threeBHKConfig",
        9: "fourBHKConfig",
        10: "fiveBHKConfig",
        11: "penthouseConfig",
      };

      if (cacheMap[stage]) {
        setCachedData((prev) => ({
          ...prev,
          [cacheMap[stage]]: formData[cacheMap[stage]],
        }));
      }

      console.log("✅ Stage data cached: ", cachedData);
      switch (stage) {
        case 0:
          setCachedData((prev) => ({
            ...prev,
            organization: formData.organization,
          }));
          break;
        case 1:
          setCachedData((prev) => ({
            ...prev,
            project: formData.project,
          }));
          break;
        case 2:
          setCachedData((prev) => ({
            ...prev,
            Amenities: formData.Amenities,
          }));
          break;
        case 3:
          setCachedData((prev) => ({
            ...prev,
            NearbyPlaces: formData.NearbyPlaces,
          }));
          break;
        case 4:
          setCachedData((prev) => ({
            ...prev,
            ExpertReview: formData.ExpertReview, // Newly added stage
          }));
          break;
        case 5:
          setCachedData((prev) => ({
            ...prev,
            projectDetails: formData.projectDetails,
          }));
          break;
        case 6:
          setCachedData((prev) => ({
            ...prev,
            oneBHKConfig: formData.oneBHKConfig,
          }));
          break;
        case 7:
          setCachedData((prev) => ({
            ...prev,
            twoBHKConfig: formData.twoBHKConfig,
          }));
          break;
        case 8:
          setCachedData((prev) => ({
            ...prev,
            threeBHKConfig: formData.threeBHKConfig,
          }));
          break;
        case 9:
          setCachedData((prev) => ({
            ...prev,
            fourBHKConfig: formData.fourBHKConfig,
          }));
          break;
        case 10:
          setCachedData((prev) => ({
            ...prev,
            fiveBHKConfig: formData.fiveBHKConfig,
          }));
          break;
        case 11:
          setCachedData((prev) => ({
            ...prev,
            penthouseConfig: formData.penthouseConfig,
          }));
          break;
        default:
          console.log("🚀 No matching stage found.");
      }
      
      // Updating stage progression logic
      switch (stage) {
        case 4: // Stage 4 (Expert Review)
          setStage(5); // Move to Project Details (Stage 5)
          break;
      
        case 5: // Stage 5 (Project Details)
          if (
            proceedToOneBHK &&
            proceedToTwoBHK &&
            proceedToThreeBHK &&
            proceedToFourBHK &&
            proceedToFiveBHK &&
            proceedToPentHouse
          ) {
            setStage(6); // Move to One BHK Config (Stage 6)
          } else if (proceedToOneBHK) {
            setStage(6);
          } else if (proceedToTwoBHK) {
            setStage(7);
          } else if (proceedToThreeBHK) {
            setStage(8);
          } else if (proceedToFourBHK) {
            setStage(9);
          } else if (proceedToFiveBHK) {
            setStage(10);
          } else if (proceedToPentHouse) {
            setStage(11);
          } else {
            setStage(12); // Move to Review Data (Stage 12)
          }
          break;
      
        case 6: // Stage 6 (One BHK Config)
          if (proceedToTwoBHK) {
            setStage(7);
          } else if (proceedToThreeBHK) {
            setStage(8);
          } else if (proceedToFourBHK) {
            setStage(9);
          } else if (proceedToFiveBHK) {
            setStage(10);
          } else if (proceedToPentHouse) {
            setStage(11);
          } else {
            setStage(12);
          }
          break;
      
        case 7: // Stage 7 (Two BHK Config)
          if (proceedToThreeBHK) {
            setStage(8);
          } else if (proceedToFourBHK) {
            setStage(9);
          } else if (proceedToFiveBHK) {
            setStage(10);
          } else if (proceedToPentHouse) {
            setStage(11);
          } else {
            setStage(12);
          }
          break;
      
        case 8: // Stage 8 (Three BHK Config)
          if (proceedToFourBHK) {
            setStage(9);
          } else if (proceedToFiveBHK) {
            setStage(10);
          } else if (proceedToPentHouse) {
            setStage(11);
          } else {
            setStage(12);
          }
          break;
      
        case 9: // Stage 9 (Four BHK Config)
          if (proceedToFiveBHK) {
            setStage(10);
          } else if (proceedToPentHouse) {
            setStage(11);
          } else {
            setStage(12);
          }
          break;
      
        case 10: // Stage 10 (Five BHK Config)
          if (proceedToPentHouse) {
            setStage(11);
          } else {
            setStage(12);
          }
          break;
      
        case 11: // Stage 11 (Penthouse Config)
          setStage(12); // Move to Review Data (Stage 12)
          break;
      
        default:
          if (stage < initialSteps.length - 1) {
            setStage(stage + 1);
          }
          break;
      }
      
    }
    } catch (error) {
      console.error("🚨 Error in nextStage: ", error);
    }
  };
  const handleSubmit = async () => {
    try {
      // Create FormData object
      // const formData = new FormData();

      const stateData = { ...formData };

      const formDataToSend = new FormData();

      // Convert JSON payload to a string and add it to FormData
      const payload = {
        organisationName: stateData.organization?.orgName || "",
        organisationCin: stateData.organization?.orgCIN || "",
        organisationOwners: stateData.organization?.orgOwners || "",
        projectsCompleted:Number(stateData.organization?.projectsCompleted) || 0,

        projectName: stateData.project?.projectname || "",
        city: stateData.project?.city || "",
        locality: stateData.project?.locality || "",
        address: stateData.project?.address || "",
        latitude: isNaN(parseFloat(stateData.project?.latitude))
          ? null
          : parseFloat(formData.project?.latitude),
        longitude: isNaN(parseFloat(stateData.project?.longitude))
          ? null
          : parseFloat(formData.project?.longitude),
        propertyAreaSqmt: isNaN(parseInt(stateData.project?.area))
          ? null
          : parseInt(formData.project?.area),

        reraNumber: stateData.project?.reranumber || "",
        reraLink: stateData.project?.reralink || "",
        propertyType:stateData.project?.TypeofProperty || "",
        units: Number(stateData.projectDetails?.units) || 0,
        projectStatus: stateData.projectDetails?.projectstatus || "",
        projectLaunch: stateData.projectDetails?.projectlaunch || "",
        projectPlannedEnd: stateData.projectDetails?.ProjectPlannedEnd || "",
        priceMin: isNaN(parseFloat(stateData.projectDetails?.pricemin))
          ? null
          : parseFloat(formData.projectDetails?.pricemin),
        priceMax: isNaN(parseFloat(stateData.projectDetails?.pricemax))
          ? null
          : parseFloat(formData.projectDetails?.pricemax),
        allInclusive: Boolean(stateData.projectDetails?.allInclusive),
        coveredParking: stateData.projectDetails?.coveredparking || "",
        bankApproved: Boolean(stateData.projectDetails?.bankapproved || ""),
        banks: stateData.projectDetails?.banks || "",
// Correctly structuring amenities
// amenities: stateData.Amenities || {},

// amenities: stateData.project?.amenities 
// ? Object.fromEntries(
//     Object.entries(stateData.project.amenities).map(([key, value]) => 
//         [key, Array.isArray(value) ? value : String(value).split(",").map(item => item.trim())]
//     )
// )
// : {},
amenities: stateData.Amenities
    ? Object.fromEntries(
        Object.entries(stateData.Amenities).map(([key, value]) => [
          key,
          Array.isArray(value) ? value : [value], // Ensure it's always an array
        ])
      )
    : {},
// Correctly structuring nearby locations
nearby: stateData.NearbyPlaces
  ? Object.fromEntries(
      Object.entries(stateData.NearbyPlaces).map(([key, value]) => [
        key,
        Array.isArray(value) ? value : [value], // Ensure it's always an array
      ])
    )
  : {},
        
  expertReview: stateData.ExpertReview
  ? { reviewText: stateData.ExpertReview.expertReview } // Create an object with the expected structure
  : null, // or {} if you prefer to send an empty object
      };
      if (proceedToOneBHK && formData.oneBHKConfig?.length) {
        payload.oneBHKConfig = formData.oneBHKConfig.map((config) => ({
          typeNumber: config.typeNumber,
          type1Units:
            Number(config.type1Units) > 0 ? Number(config.type1Units) : null,
          type1Area:
            Number(config?.type1area) > 0 ? Number(config.type1area) : null,
          type1Bathrooms: Number(config.type1bathrooms) || 0,
          type1Balcony: Number(config.type1balcony) || 0,
          type1Parking: Number(config.type1parking) || 0,
          hallArea: config.type1HallArea || "",
          kitchenArea: config.type1KitchenArea || "",
          bedroom1Area: config.type1BedroomArea || "",
          bathroom1Area: config.type1bathroom1 || "",
          bathroom2Area: config.type1bathroom2 || "",
        }));
      }
      if (proceedToTwoBHK && formData.twoBHKConfig?.length) {
        payload.twoBHKConfig = formData.twoBHKConfig.map((config) => ({
          typeNumber: config.typeNumber,
          type2Units:
            Number(config.type2Units) > 0 ? Number(config.type2Units) : null,
          type2Area:
            Number(config?.type2area) > 0 ? Number(config.type2area) : null,
          type2Bedrooms: Number(config.type2Bedrooms) || 0,
          type2Bathrooms: Number(config.type2bathrooms) || 0,
          type2Balcony: Number(config.type2balcony) || 0,
          type2Parking: Number(config.type2parking) || 0,
          hallArea: config.type2HallArea || "",
          kitchenArea: config.type2KitchenArea || "",
          bedroom1Area: config.type2Bedroom1 || "",
          bedroom2Area: config.type2Bedroom2 || "",
          bathroom1Area: config.type2bathroom1 || "",
          bathroom2Area: config.type2bathroom2 || "",
        }));
      }
      if (proceedToThreeBHK && formData.threeBHKConfig?.length) {
        payload.threeBHKConfig = formData.threeBHKConfig.map((config) => ({
          typeNumber: config.typeNumber,
          type3Units:
            Number(config.type3Units) > 0 ? Number(config.type3Units) : null,
          type3Area:
            Number(config?.type3area) > 0 ? Number(config.type3area) : null,
          type3Bedrooms: Number(config?.type3Bedrooms) || 0,
          type3Bathrooms: Number(config.type3bathrooms) || 0,
          type3Balcony: Number(config.type3balcony) || 0,
          type3Parking: Number(config.type3parking) || 0,
          hallArea: config.type3HallArea || "",
          kitchenArea: config.type3KitchenArea || "",
          bedroom1Area: config.type3Bedroom1 || "",
          bedroom2Area: config.type3Bedroom2 || "",
          bedroom3Area: config.type3Bedroom3 || "",
          bathroom1Area: config.type3bathroom1 || "",
          bathroom2Area: config.type3bathroom2 || "",
          bathroom3Area: config.type3bathroom3 || "",
        }));
      }
      if (proceedToFourBHK && formData.fourBHKConfig?.length) {
        payload.fourBHKConfig = formData.fourBHKConfig.map((config) => ({
          typeNumber: config.typeNumber,
          type4Units:
            Number(config.type4Units) > 0 ? Number(config.type4Units) : null,
          type4Area:
            Number(config?.type4area) > 0 ? Number(config.type4area) : null,
          type4Bedrooms: Number(config.type4Bedrooms) || 0,
          type4Bathrooms: Number(config.type4bathrooms) || 0,
          type4Balcony: Number(config.type4balcony) || 0,
          type4Parking: Number(config.type4parking) || 0,
          hallArea: config.type4HallArea || "",
          kitchenArea: config.type4KitchenArea || "",
          bedroom1Area: config.type4Bedroom1 || "",
          bedroom2Area: config.type4Bedroom2 || "",
          bedroom3Area: config.type4Bedroom3 || "",
          bedroom4Area: config.type4Bedroom4 || "",
          bathroom1Area: config.type4bathroom1 || "",
          bathroom2Area: config.type4bathroom2 || "",
          bathroom3Area: config.type4bathroom3 || "",
          bathroom4Area: config.type4bathroom4 || "",
        }));
      }
      if (proceedToFiveBHK && formData.fiveBHKConfig?.length) {
        payload.fiveBHKConfig = formData.fiveBHKConfig.map((config) => ({
          typeNumber: config.typeNumber,
          type5Units:
            Number(config.type5Units) > 0 ? Number(config.type5Units) : null,
          type5Area:
            Number(config?.type5area) > 0 ? Number(config.type5area) : null,
          type5Bedrooms: Number(config.type5Bedrooms) || 0,
          type5Bathrooms: Number(config.type5bathrooms) || 0,
          type5Balcony: Number(config.type5balcony) || 0,
          type5Parking: Number(config.type5parking) || 0,
          hallArea: config.type5HallArea || "",
          kitchenArea: config.type5KitchenArea || "",
          bedroom1Area: config.type5Bedroom1 || "",
          bedroom2Area: config.type5Bedroom2 || "",
          bedroom3Area: config.type5Bedroom3 || "",
          bedroom4Area: config.type5Bedroom4 || "",
          bedroom5Area: config.type5Bedroom5 || "",
          bathroom1Area: config.type5bathroom1 || "",
          bathroom2Area: config.type5bathroom2 || "",
          bathroom3Area: config.type5bathroom3 || "",
          bathroom4Area: config.type5bathroom4 || "",
          bathroom5Area: config.type5bathroom5 || "",
        }));
      }

      if (proceedToPentHouse && formData.penthouseConfig?.length) {
        payload.penthouseConfig = formData.penthouseConfig.map((config) => ({
          typeNumber: config.typeNumber,
          penthouseUnits:
            Number(config.penthouseUnits) > 0
              ? Number(config.penthouseUnits)
              : null,
          penthouseArea:
            Number(config?.penthouseArea) > 0
              ? Number(config.penthouseArea)
              : null,
          penthouseBedrooms: Number(config.penthouseBedrooms) || 0,
          penthouseBathrooms: Number(config.penthouseBathrooms) || 0,
          penthouseBalcony: Number(config.penthouseBalcony) || 0,
          penthouseParking: Number(config.penthouseParking) || 0,
          penthouseHallArea: config.hallArea || "",
          penthouseKitchenArea: config.kitchenArea || "",
          penthouseBedroom1Area: config.bedroom1Area || "",
          penthouseBedroom2Area: config.bedroom2Area || "",
          penthouseBedroom3Area: config.bedroom3Area || "",
          penthouseBedroom4Area: config.bedroom4Area || "",
          penthouseBedroom5Area: config.bedroom5Area || "",
          penthouseBedroom6Area: config.bedroom6Area || "",
          penthouseBathroom1Area: config.bathroom1Area || "",
          penthouseBathroom2Area: config.bathroom2Area || "",
          penthouseBathroom3Area: config.bathroom3Area || "",
          penthouseBathroom4Area: config.bathroom4Area || "",
          penthouseBathroom5Area: config.bathroom5Area || "",
          penthouseBathroom6Area: config.bathroom6Area || "",
        }));
      }

      console.log("State", stateData);
      console.log("Payload:", payload);
      formDataToSend.append("data", JSON.stringify(payload));
      console.log("after appending data:", formDataToSend.get("data"));
      // ✅ Append images properly
      const imageFiles = stateData.project?.Images || [];
      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // ✅ Append video file if available
      const videoFile = stateData.project?.Videos?.[0] || null;
      if (videoFile) {
        formDataToSend.append("video", videoFile);
      }

      // ✅ Append OneBHKConfig images & floor plans correctly (grouped by typeNumber)
      stateData.oneBHKConfig?.forEach((config) => {
        const typeNumber = config.typeNumber;

        // ✅ Append images for this typeNumber
        if (config.type1images?.length) {
          config.type1images.forEach((file, imgIndex) => {
            formDataToSend.append(
              `oneBHKType1Images_${typeNumber}_${imgIndex}`,
              file
            );
          });
        }
        // ✅ Append floor plans for this typeNumber
        if (config.type1floorplan?.length) {
          config.type1floorplan.forEach((file, planIndex) => {
            formDataToSend.append(
              `oneBHKType1FloorPlanImages_${typeNumber}_${planIndex}`,
              file
            );
          });
        }
      });
      stateData.twoBHKConfig?.forEach((config) => {
        const typeNumber = config.typeNumber;

        // ✅ Append images for this typeNumber
        if (config.type2images?.length) {
          config.type2images.forEach((file, imgIndex) => {
            formDataToSend.append(
              `twoBHKType2Images_${typeNumber}_${imgIndex}`,
              file
            );
          });
        }
        // Append floor plan images
        if (config.type2floorplan?.length) {
          config.type2floorplan.forEach((file, planIndex) => {
            formDataToSend.append(
              `twoBHKType2FloorPlanImages_${typeNumber}_${planIndex}`,
              file
            );
          });
        }
      });
      stateData.threeBHKConfig?.forEach((config) => {
        const typeNumber = config.typeNumber;

        // ✅ Append images for this typeNumber
        if (config.type3images?.length) {
          config.type3images.forEach((file, imgIndex) => {
            formDataToSend.append(
              `threeBHKType3Images_${typeNumber}_${imgIndex}`,
              file
            );
          });
        }
        // Append floor plan images
        if (config.type3floorplan?.length) {
          config.type3floorplan.forEach((file, planIndex) => {
            formDataToSend.append(
              `threeBHKType3FloorPlanImages_${typeNumber}_${planIndex}`,
              file
            );
          });
        }
      });
      stateData.fourBHKConfig?.forEach((config) => {
        const typeNumber = config.typeNumber;

        // ✅ Append images for this typeNumber
        if (config.type4images?.length) {
          config.type4images.forEach((file, imgIndex) => {
            formDataToSend.append(
              `fourBHKType4Images_${typeNumber}_${imgIndex}`,
              file
            );
          });
        }
        // Append floor plan images
        if (config.type4floorplan?.length) {
          config.type4floorplan.forEach((file, planIndex) => {
            formDataToSend.append(
              `fourBHKType4FloorPlanImages_${typeNumber}_${planIndex}`,
              file
            );
          });
        }
      });
      stateData.fiveBHKConfig?.forEach((config) => {
        const typeNumber = config.typeNumber;

        // ✅ Append images for this typeNumber
        if (config.type5images?.length) {
          config.type5images.forEach((file, imgIndex) => {
            formDataToSend.append(
              `fiveBHKType5Images_${typeNumber}_${imgIndex}`,
              file
            );
          });
        }
        // Append floor plan images
        if (config.type5floorplan?.length) {
          config.type5floorplan.forEach((file, planIndex) => {
            formDataToSend.append(
              `fiveBHKType5FloorPlanImages_${typeNumber}_${planIndex}`,
              file
            );
          });
        }
      });
      stateData.penthouseConfig?.forEach((config) => {
        const typeNumber = config.typeNumber;

        // ✅ Append images for this typeNumber
        if (config.penthouseImages?.length) {
          config.penthouseImages.forEach((file, imgIndex) => {
            formDataToSend.append(
              `penthouseTypeImages_${typeNumber}_${imgIndex}`,
              file
            );
          });
        }
        // Append floor plan images
        if (config.penthouseFloorPlan?.length) {
          config.penthouseFloorPlan.forEach((file, planIndex) => {
            formDataToSend.append(
              `penthouseFloorPlanImages_${typeNumber}_${planIndex}`,
              file
            );
          });
        }
      });

      // ✅ Debugging: Check if FormData has correct values
      console.log("Final FormData check:");
      for (let pair of formDataToSend.entries()) {
        // console.log(pair[0], pair[1]);
        console.log(`${pair[0]}:`, pair[1]);
      }

      // console.log("Final FormData Sent to API:", formData);

      // Send form data via axios
      const response = await axios.post(
        "http://localhost:8080/api/entities/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Server Response:", response.data);
      alert("Entity created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error: ${error.response?.data?.message || "API error occurred"} \n
         Status Code: ${error.response?.status}`
      );
    }
  };

  const prevStage = () => {
    if (stage > 0) setStage(stage - 1);
  };

  return (
    <div>
      <header className="bg-black text-white p-4 sm:mx-8 md:mx-10 xl:mx-24">
        <Header />
      </header>
      <div
        className="flex p-6 items-center justify-center  bg-black text-base mobile-s:text-sm 
      mobile-m:text-md mobile-l:text-lg "
      >
        <div className="w-full max-w-4xl bg-black p-4 rounded text-white ">
          <LinearProgress
            variant="determinate"
            value={stage === 0 ? 0 : ((stage + 1) / initialSteps.length) * 100}
            className="w-[768px] max-w-[calc(100%-2rem)] mb-2 h-2 mx-10 
          mobile-s:w-[280px] mobile-s:mx-3 mobile-m:w-[300px] mobile-l:w-[380px] md:w-[620px] md:mx-10 lg:w-[768px]"
            sx={{
              backgroundColor: "white", // Tailwind equivalent: bg-gray-300
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#D4AF37", // Tailwind equivalent: bg-white
              },
            }}
          />
          {/* navigation */}
          <div className="flex justify-between items-center mb-5 ">
            <div className="flex items-center gap-2">
              <p className="text-yellow-500 text-base mobile-s:text-sm mobile-s:mx-3 mobile-m:text-md mobile-l:text-lg md:mx-10 ">
                {initialSteps[stage]}
              </p>
            </div>
          </div>

          <div className="w-full mb-3 mx-auto">
            {stage === 0 && (
              <div className="w-full mx-auto max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between">
                <InputField
                  label="Organization Name"
                  section="organization"
                  field="orgName"
                  value={formData.organization.orgName}
                  onChange={handleChange}
                  error={warnings.organization?.orgName}
                  type="text"
                  maxLength={100}
                />
                <InputField
                  label="Organization CIN"
                  section="organization"
                  field="orgCIN"
                  value={formData.organization.orgCIN}
                  onChange={handleChange}
                  error={warnings.organization?.orgCIN}
                  maxLength={21}
                />
                <InputField
                  label="Organization Owners"
                  section="organization"
                  field="orgOwners"
                  value={formData.organization.orgOwners}
                  onChange={handleChange}
                  error={warnings.organization?.orgOwners}
                />
                <InputField
                  label="Projects Completed"
                  section="organization"
                  field="projectsCompleted"
                  value={formData.organization.projectsCompleted}
                  onChange={handleChange}
                  error={warnings.organization?.projectsCompleted}
                />
              </div>
            )}

            {stage === 1 && (
              <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                <InputField
                  label="Project Name"
                  section="project"
                  field="projectname"
                  value={formData.project.projectname}
                  onChange={handleChange}
                  error={warnings.project?.projectname}
                />
                <InputField
                  label="City"
                  section="project"
                  field="city"
                  value={formData.project.city}
                  onChange={handleChange}
                  error={warnings.project?.city}
                />
                <DropdownField
                  label="Enter Locality"
                  section="project"
                  field="locality"
                  value={formData.project.locality}
                  onChange={handleChange}
                  error={warnings.project?.locality}
                  options={[
                    { label: "Hadapsar", value: "hadapsar" },
                    { label: "Kothrud", value: "kothrud" },
                    { label: "Airoli", value: "airoli" },
                  ]}
                />
                <DropdownField
                  label="Type of Property"
                  section="project"
                  field="TypeofProperty"
                  value={formData.project.TypeofProperty}
                  onChange={handleChange}
                  error={warnings.project?.TypeofProperty}
                  options={[
                    { label: "Apartment", value: "Apartment" },
                    { label: "Bunglow", value: "Bunglow" },
                    { label: "Row House", value: "Row House" },
                    { label: "Plot", value: "Plot" },
                    { label: "Commercial", value: "Commercial" },
                  ]}
                />
                <InputField
                  label="Address"
                  section="project"
                  field="address"
                  value={formData.project.address}
                  onChange={handleChange}
                  error={warnings.project?.address}
                />
                <InputField
                  label="Latitude"
                  section="project"
                  field="latitude"
                  value={formData.project.latitude}
                  onChange={handleChange}
                  error={warnings.project?.latitude}
                />
                <InputField
                  label="Longitude"
                  section="project"
                  field="longitude"
                  value={formData.project.longitude}
                  onChange={handleChange}
                  error={warnings.project?.longitude}
                />
                <InputField
                  label="Area in sqft"
                  section="project"
                  field="area"
                  value={formData.project.area}
                  onChange={handleChange}
                  error={warnings.project?.area}
                />
                <InputField
                  label="Rera Number"
                  section="project"
                  field="reranumber"
                  value={formData.project.reranumber}
                  onChange={handleChange}
                  error={warnings.project?.reranumber}
                />
                <InputField
                  label="Rera Link"
                  section="project"
                  field="reralink"
                  value={formData.project.reralink}
                  onChange={handleChange}
                  error={warnings.project?.reralink}
                />
                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="project"
                    field="Images"
                    label="Upload project Images"
                    limit={1}
                  />

                  {formData?.project?.Images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.project.Images.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <VideoUpload
                    handleChange={handleChange}
                    section="project"
                    field="Videos"
                    label="Upload Project Videos"
                    limit={2}
                  />
                  {formData?.project?.Videos?.length > 0 && (
                    <div>
                      <h3>Uploaded Videos :</h3>
                      <ul>
                        {formData.project.Videos.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {stage === 2 && (
              <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                <InputField
                  label="Swimming Pool"
                  section="Amenities"
                  field="swimming_pool"
                  value={formData.Amenities.swimming_pool}
                  onChange={handleChange}
                  error={warnings.Amenities?.swimming_pool}
                />

                <InputField
                  label="Temple"
                  section="Amenities"
                  field="temple"
                  value={formData.Amenities.temple}
                  onChange={handleChange}
                  error={warnings.Amenities?.temple}
                />

                <InputField
                  label="Gym"
                  section="Amenities"
                  field="gym"
                  value={formData.Amenities.gym}
                  onChange={handleChange}
                  error={warnings.Amenities?.gym}
                />

                <InputField
                  label="Creche"
                  section="Amenities"
                  field="creche"
                  value={formData.Amenities.creche}
                  onChange={handleChange}
                  error={warnings.Amenities?.creche}
                />

                <InputField
                  label="Children Parks"
                  section="Amenities"
                  field="children_parks"
                  value={formData.Amenities.children_parks}
                  onChange={handleChange}
                  error={warnings.Amenities?.children_parks}
                />

                <InputField
                  label="Park"
                  section="Amenities"
                  field="park"
                  value={formData.Amenities.park}
                  onChange={handleChange}
                  error={warnings.Amenities?.park}
                />

                <InputField
                  label="Club House"
                  section="Amenities"
                  field="club_house"
                  value={formData.Amenities.club_house}
                  onChange={handleChange}
                  error={warnings.Amenities?.club_house}
                />

                <InputField
                  label="Community Hall"
                  section="Amenities"
                  field="c_hall"
                  value={formData.Amenities.c_hall}
                  onChange={handleChange}
                  error={warnings.Amenities?.c_hall}
                />

                <InputField
                  label="Other"
                  section="Amenities"
                  field="other"
                  value={formData.Amenities.other}
                  onChange={handleChange}
                  error={warnings.Amenities?.other}
                />
              </div>
            )}

            {stage === 3 && (
              <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                <InputField
                  label="Schools"
                  section="NearbyPlaces"
                  field="schools"
                  value={formData.NearbyPlaces.schools}
                  onChange={handleChange}
                  error={warnings.NearbyPlaces?.schools}
                />

                <InputField
                  label="Hospitals"
                  section="NearbyPlaces"
                  field="hospitals"
                  value={formData.NearbyPlaces.hospitals}
                  onChange={handleChange}
                  error={warnings.NearbyPlaces?.hospitals}
                />

                <InputField
                  label="IT Parks"
                  section="NearbyPlaces"
                  field="it_parks"
                  value={formData.NearbyPlaces.it_parks}
                  onChange={handleChange}
                  error={warnings.NearbyPlaces?.it_parks} 
                />

                <InputField
                  label="Hangouts"
                  section="NearbyPlaces"
                  field="hangouts"
                  value={formData.NearbyPlaces.hangouts}
                  onChange={handleChange}
                  error={warnings.NearbyPlaces?.hangouts}
                />

                <InputField
                  label="Cinemas"
                  section="NearbyPlaces"
                  field="cinemas"
                  value={formData.NearbyPlaces.cinemas}
                  onChange={handleChange}
                  error={warnings.NearbyPlaces?.cinemas}
                />

                <InputField
                  label="Metro"
                  section="NearbyPlaces"
                  field="metro"
                  value={formData.NearbyPlaces.metro}
                  onChange={handleChange}
                  error={warnings.NearbyPlaces?.metro}
                />
              </div>
            )}

            {stage === 4 && (
              <div className="max-w-3xl mx-auto bg-black rounded-2xl mt-4">
                {/* Text Area for Writing */}
                <div className="mb-4">
                  <TextArea
                    label="Write Review"
                    section="ExpertReview"
                    field="expertReview"
                    value={formData.ExpertReview.expertReview}
                    onChange={handleChange}
                    error={warnings.ExpertReview?.expertReview}
                  />
                </div>
              </div>
            )}
            {stage === 5 && (
              <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                <InputField
                  label="Project Units"
                  section="projectDetails"
                  field="units"
                  value={formData.projectDetails.units}
                  onChange={handleChange}
                  error={warnings.projectDetails?.units}
                />
                    <InputField
                  label="Price Min"
                  section="projectDetails"
                  field="pricemin"
                  value={formData.projectDetails.pricemin}
                  onChange={handleChange}
                  error={warnings.projectDetails?.pricemin}
                />
                <InputField
                  label="Price Max"
                  section="projectDetails"
                  field="pricemax"
                  value={formData.projectDetails.pricemax}
                  onChange={handleChange}
                  error={warnings.projectDetails?.pricemax}
                />
                 <DropdownField
                  label="Covered Parking"
                  section="projectDetails"
                  field="coveredparking"
                  value={formData.projectDetails.coveredparking}
                  onChange={handleChange}
                  error={warnings.projectDetails?.coveredparking}
                  options={[
                    { label: "Available", value: "Available" },
                    { label: "Not Available", value: "Not Available" },
                    { label: "Reserved", value: "Reserved" },
                  ]}
                />
                <DropdownField
                  label="Project Status"
                  section="projectDetails"
                  field="projectstatus"
                  value={formData.projectDetails.projectstatus}
                  onChange={handleChange}
                  error={warnings.projectDetails?.projectstatus}
                  options={[
                    { label: "pre-development", value: "predevelopment" },
                    { label: "construction", value: "construction" },
                    { label: "closeout", value: "closeout" },
                  ]}
                />
                 
              
          
                <FormGroup className="p-1">
                  <CheckBox
                    label="All Inclusive"
                    section="projectDetails"
                    field="allInclusive"
                    checked={formData.allInclusive}
                    onChange={handleChange}
                    error={warnings.projectDetails?.allInclusive}
                  />

                  <CheckBox
                    label="Bank Approved"
                    section="projectDetails"
                    field="bankapproved"
                    checked={formData.bankapproved}
                    onChange={handleChange}
                    error={warnings.projectDetails?.bankapproved}
                  />
                  {/* Banks Input - Shown Only When Bank Approved is Checked */}
                  {formData.projectDetails.bankapproved && (
                    <InputField
                      label="Banks"
                      section="projectDetails"
                      field="banks"
                      value={formData.projectDetails.banks}
                      onChange={handleChange}
                      error={warnings.projectDetails?.banks}
                    />
                  )}
                </FormGroup>

                <FormGroup>
                  <div className="grid grid-cols-2 items-center ml-10">
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={proceedToOneBHK}
                            onChange={(e) =>
                              setProceedToOneBHK(e.target.checked)
                            }
                            sx={{
                              "&.MuiSvgIcon-root": { fill: "white" },
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="1 BHK"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={proceedToTwoBHK}
                            onChange={(e) =>
                              setProceedToTwoBHK(e.target.checked)
                            }
                            sx={{
                              "&.MuiSvgIcon-root": { fill: "white" },
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="2 BHK"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={proceedToThreeBHK}
                            onChange={(e) =>
                              setProceedToThreeBHK(e.target.checked)
                            }
                            sx={{
                              "&.MuiSvgIcon-root": { fill: "white" },
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="3 BHK"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={proceedToFourBHK}
                            onChange={(e) =>
                              setProceedToFourBHK(e.target.checked)
                            }
                            sx={{
                              "&.MuiSvgIcon-root": { fill: "white" },
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="4 BHK"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={proceedToFiveBHK}
                            onChange={(e) =>
                              setProceedToFiveBHK(e.target.checked)
                            }
                            sx={{
                              "&.MuiSvgIcon-root": { fill: "white" },
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="5 BHK"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={proceedToPentHouse}
                            onChange={(e) =>
                              setProceedToPentHouse(e.target.checked)
                            }
                            sx={{
                              "&.MuiSvgIcon-root": {
                                fill: "white",
                                backgroundColor: "white",
                              },
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="PentHouse"
                      />
                    </Grid>
                  </div>
                </FormGroup>
                <FormGroup>
                  {/* Project Launch Date Picker */}
                  <DatePicker
                  label={"Project Launch Date"}
                  section="projectDetails"
                  // placeholder="Select Project Launch Date"
                  field="projectlaunch"
                  value={formData.projectDetails.projectlaunch}
                  onChange={handleChange}
                  error={warnings.projectDetails?.projectlaunch}
                />
                <DatePicker
                  label={"Project Planned-end Date"}
                  section="projectDetails"
                  placeholder="Select Project Planned-end Date"
                  field="ProjectPlannedEnd"
                  value={formData.projectDetails.ProjectPlannedEnd}
                  onChange={handleChange}
                  error={warnings.projectDetails?.ProjectPlannedEnd}
                /></FormGroup>
              </div>
            )}

            {stage === 6 && (
              <div className="mb-1">
                <>
                  {formData.oneBHKConfig.map((config, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h3 className="text-lg font-semibold mb-4 mx-10 mobile-s:text-sm mobile-m:text-md mobile-l:text-lg">
                        One BHK Configuration {index + 1}
                      </h3>
                      <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                        <InputField
                          label="Type Number"
                          section={`oneBHKConfig[${index}]`}
                          field="typeNumber"
                          value={config.typeNumber}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.typeNumber}
                          type="number"
                        />

                        <InputField
                          label="Units"
                          section={`oneBHKConfig[${index}]`}
                          field="type1Units"
                          value={config.type1Units}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1Units}
                        />

                        <InputField
                          label="Total Area"
                          section={`oneBHKConfig[${index}]`}
                          field="type1area"
                          value={config.type1area}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1area}
                        />

                        <InputField
                          label="Bedroom Area"
                          section={`oneBHKConfig[${index}]`}
                          field="type1BedroomArea"
                          value={config.type1BedroomArea}
                          onChange={handleChange}
                          error={
                            warnings.oneBHKConfig?.[index]?.type1BedroomArea
                          }
                        />

                        <InputField
                          label="Hall Area"
                          section={`oneBHKConfig[${index}]`}
                          field="type1HallArea"
                          value={config.type1HallArea}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1HallArea}
                        />

                        <InputField
                          label="Kitchen Area"
                          section={`oneBHKConfig[${index}]`}
                          field="type1KitchenArea"
                          value={config.type1KitchenArea}
                          onChange={handleChange}
                          error={
                            warnings.oneBHKConfig?.[index]?.type1KitchenArea
                          }
                        />

                        <InputField
                          label="Bathrooms"
                          section={`oneBHKConfig[${index}]`}
                          field="type1bathrooms"
                          value={config.type1bathrooms}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1bathrooms}
                        />

                        <InputField
                          label="Bathroom 1 Details"
                          section={`oneBHKConfig[${index}]`}
                          field="type1bathroom1"
                          value={config.type1bathroom1}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1bathroom1}
                        />

                        <InputField
                          label="Bathroom 2 Details"
                          section={`oneBHKConfig[${index}]`}
                          field="type1bathroom2"
                          value={config.type1bathroom2}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1bathroom2}
                        />

                        <InputField
                          label="Balcony Availability"
                          section={`oneBHKConfig[${index}]`}
                          field="type1balcony"
                          value={config.type1balcony}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1balcony}
                        />

                        <InputField
                          label="Parking Availability"
                          section={`oneBHKConfig[${index}]`}
                          field="type1parking"
                          value={config.type1parking}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1parking}
                        />
                        <div>
                          <ImageUpload
                            handleChange={handleChange}
                            section={`oneBHKConfig[${index}]`}
                            field="type1floorplan"
                            label={`Upload Floorplan Images for BHK ${
                              index + 1
                            }`}
                            limit={5} // Adjust limit as needed
                          />

                          {config?.type1floorplan?.length > 0 && (
                            <div>
                              <h3>Uploaded Images:</h3>
                              <ul>
                                {config.type1floorplan.map((file, imgIndex) => (
                                  <li key={imgIndex}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div>
                          <ImageUpload
                            handleChange={handleChange}
                            section={`oneBHKConfig[${index}]`}
                            field="type1images"
                            label={`Upload Project Images for BHK ${index + 1}`}
                            limit={5} // Adjust limit as needed
                          />

                          {config?.type1images?.length > 0 && (
                            <div>
                              <h3>Uploaded Images:</h3>
                              <ul>
                                {config.type1images.map((file, imgIndex) => (
                                  <li key={imgIndex}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Checkbox to Add Another Configuration */}
                  <div className="mt-4 flex items-center mx-10">
                    <input
                      type="checkbox"
                      id="addAnother"
                      className="mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            oneBHKConfig: [
                              ...prev.oneBHKConfig,
                              {
                                typeNumber: prev.oneBHKConfig.length + 1,
                                type1Units: "",
                                type1area: "",
                                type1floorplan: [],
                                type1images: [],
                                type1BedroomArea: "",
                                type1HallArea: "",
                                type1KitchenArea: "",
                                type1bathrooms: "",
                                type1bathroom1: "",
                                type1bathroom2: "",
                                type1balcony: "",
                                type1parking: "",
                              },
                            ],
                          }));
                        }
                      }}
                    />
                    <label htmlFor="addAnother" className="text-sm font-medium">
                      Would you like to add another One BHK Configuration?
                    </label>
                  </div>
                </>{" "}
              </div>
            )}

            {stage === 7 && (
              <div className="mx-auto">
                {formData.twoBHKConfig.map((config, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4 mx-10 mobile-s:text-sm mobile-m:text-md mobile-l:text-lg">
                      Two BHK Configuration {index + 1}
                    </h3>
                    <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                      {/* Type 2 Units */}
                      <InputField
                        label="Type 2 Units"
                        section={`twoBHKConfig[${index}]`}
                        field="type2Units"
                        value={config.type2Units}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2Units}
                      />

                      {/* Type 2 Area */}
                      <InputField
                        label="Type 2 Area (sq ft)"
                        section={`twoBHKConfig[${index}]`}
                        field="type2area"
                        value={config.type2area}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2area}
                      />

                      {/* Bedrooms */}
                      <InputField
                        label="Total Bedrooms"
                        section={`twoBHKConfig[${index}]`}
                        field="type2Bedrooms"
                        value={config.type2Bedrooms}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2Bedrooms}
                      />

                      {/* Bedroom 1 */}
                      <InputField
                        label="Bedroom 1 Area"
                        section={`twoBHKConfig[${index}]`}
                        field="type2Bedroom1"
                        value={config.type2Bedroom1}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 Area"
                        section={`twoBHKConfig[${index}]`}
                        field="type2Bedroom2"
                        value={config.type2Bedroom2}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2Bedroom2}
                      />

                      {/* Hall Area */}
                      <InputField
                        label="Hall Area"
                        section={`twoBHKConfig[${index}]`}
                        field="type2HallArea"
                        value={config.type2HallArea}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2HallArea}
                      />

                      {/* Kitchen Area */}
                      <InputField
                        label="Kitchen Area"
                        section={`twoBHKConfig[${index}]`}
                        field="type2KitchenArea"
                        value={config.type2KitchenArea}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2KitchenArea}
                      />

                      {/* Bathrooms */}
                      <InputField
                        label="Total Bathrooms"
                        section={`twoBHKConfig[${index}]`}
                        field="type2bathrooms"
                        value={config.type2bathrooms}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2bathrooms}
                      />

                      {/* Bathroom 1 */}
                      <InputField
                        label="Bathroom 1 Details"
                        section={`twoBHKConfig[${index}]`}
                        field="type2bathroom1"
                        value={config.type2bathroom1}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 Details"
                        section={`twoBHKConfig[${index}]`}
                        field="type2bathroom2"
                        value={config.type2bathroom2}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2bathroom2}
                      />

                      {/* Balcony */}
                      <InputField
                        label="Balcony Availability"
                        section={`twoBHKConfig[${index}]`}
                        field="type2balcony"
                        value={config.type2balcony}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2balcony}
                      />

                      {/* Parking */}
                      <InputField
                        label="Parking Availability"
                        section={`twoBHKConfig[${index}]`}
                        field="type2parking"
                        value={config.type2parking}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2parking}
                      />

                      {/* Floorplan Image Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`twoBHKConfig[${index}]`}
                        field="type2floorplan"
                        label="Upload Floorplan Images"
                        limit={5} // Adjust as needed
                      />
                      {config.type2floorplan?.length > 0 && (
                        <div>
                          <h3>Uploaded Floorplan Images:</h3>
                          <ul>
                            {config.type2floorplan.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`twoBHKConfig[${index}]`}
                        field="type2images"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.type2images?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.type2images.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {/* Checkbox to Add Another Two BHK Configuration */}
                <div className="mt-4 flex items-center mx-10">
                  <input
                    type="checkbox"
                    id="addAnotherTwoBHK"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          twoBHKConfig: [
                            ...(prev.twoBHKConfig || []), // Ensure array exists
                            {
                              typeNumber: (prev.twoBHKConfig?.length || 0) + 1,
                              type2Units: "",
                              type2area: "",
                              type2floorplan: [],
                              type2images: [],
                              type2Bedrooms: "",
                              type2Bedroom1: "",
                              type2Bedroom2: "",
                              type2HallArea: "",
                              type2KitchenArea: "",
                              type2bathrooms: "",
                              type2bathroom1: "",
                              type2bathroom2: "",
                              type2balcony: "",
                              type2parking: "",
                              enableconfig: false, // Keep it false initially
                            },
                          ],
                        }));
                      }
                    }}
                  />
                  <label
                    htmlFor="addAnotherTwoBHK"
                    className="text-sm font-medium"
                  >
                    Would you like to add another Two BHK Configuration?
                  </label>
                </div>
              </div>
            )}

            {stage === 8 && (
              <div className="mx-auto">
                {formData.threeBHKConfig.map((config, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4 mx-10 mobile-s:text-sm mobile-m:text-md mobile-l:text-lg">
                      Three BHK Configuration {index + 1}
                    </h3>
                    <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                      {/* Type 3 Units */}
                      <InputField
                        label="Type 3 Units"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Units"
                        value={config.type3Units}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Units}
                      />

                      <InputField
                        label="Area"
                        field="type3area"
                        section={`threeBHKConfig[${index}]`}
                        value={config.type3area}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3area}
                      />

                      <InputField
                        label="Bedrooms"
                        field="type3Bedrooms"
                        section={`threeBHKConfig[${index}]`}
                        value={config.type3Bedrooms}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedrooms}
                      />

                      {/* Bedroom 1 */}
                      <InputField
                        label="Bedroom 1 Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Bedroom1"
                        value={config.type3Bedroom1}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Bedroom2"
                        value={config.type3Bedroom2}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedroom2}
                      />

                      {/* Bedroom 3 */}
                      <InputField
                        label="Bedroom 3 Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Bedroom3"
                        value={config.type3Bedroom3}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedroom3}
                      />

                      {/* Hall Area */}
                      <InputField
                        label="Hall Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3HallArea"
                        value={config.type3HallArea}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3HallArea}
                      />

                      {/* Kitchen Area */}
                      <InputField
                        label="Kitchen Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3KitchenArea"
                        value={config.type3KitchenArea}
                        onChange={handleChange}
                        error={
                          warnings.threeBHKConfig?.[index]?.type3KitchenArea
                        }
                      />

                      {/* Total Bathrooms */}
                      <InputField
                        label="Total Bathrooms"
                        section={`threeBHKConfig[${index}]`}
                        field="type3bathrooms"
                        value={config.type3bathrooms}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3bathrooms}
                      />

                      {/* Bathroom 1 */}
                      <InputField
                        label="Bathroom 1 Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3bathroom1"
                        value={config.type3bathroom1}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3bathroom2"
                        value={config.type3bathroom2}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3bathroom2}
                      />

                      {/* Bathroom 3 */}
                      <InputField
                        label="Bathroom 3 Area"
                        section={`threeBHKConfig[${index}]`}
                        field="type3bathroom3"
                        value={config.type3bathroom3}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3bathroom3}
                      />

                      {/* Balcony */}
                      <InputField
                        label="Balcony Availability"
                        section={`threeBHKConfig[${index}]`}
                        field="type3balcony"
                        value={config.type3balcony}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3balcony}
                      />

                      {/* Parking */}
                      <InputField
                        label="Parking Availability"
                        section={`threeBHKConfig[${index}]`}
                        field="type3parking"
                        value={config.type3parking}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3parking}
                      />

                      {/* Floorplan Image Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`threeBHKConfig[${index}]`}
                        field="type3floorplan"
                        label="Upload Floorplan Images"
                        limit={5}
                      />
                      {config.type3floorplan?.length > 0 && (
                        <div>
                          <h3>Uploaded Floorplan Images:</h3>
                          <ul>
                            {config.type3floorplan.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`threeBHKConfig[${index}]`}
                        field="type3images"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.type3images?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.type3images.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Checkbox to Add Another Three BHK Configuration */}
                      <div className="mt-4 flex items-center mx-10">
                        <input
                          type="checkbox"
                          id="addAnotherThreeBHK"
                          className="mr-2"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                threeBHKConfig: [
                                  ...(prev.threeBHKConfig || []), // Ensure array exists
                                  {
                                    typeNumber:
                                      (prev.threeBHKConfig?.length || 0) + 1,
                                    type3Units: "",
                                    type3area: "",
                                    type3floorplan: [],
                                    type3images: [],
                                    type3Bedrooms: "",
                                    type3Bedroom1: "",
                                    type3Bedroom2: "",
                                    type3Bedroom3: "",
                                    type3HallArea: "",
                                    type3KitchenArea: "",
                                    type3bathrooms: "",
                                    type3bathroom1: "",
                                    type3bathroom2: "",
                                    type3bathroom3: "",
                                    type3balcony: "",
                                    type3parking: "",
                                    enableconfig: false, // Keep it false initially
                                  },
                                ],
                              }));
                            }
                          }}
                        />
                        <label
                          htmlFor="addAnotherThreeBHK"
                          className="text-sm font-medium"
                        >
                          Would you like to add another Three BHK Configuration?
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {stage === 9 && (
              <div className=" mx-auto">
                {formData.fourBHKConfig.map((config, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4 mx-10 mobile-s:text-sm mobile-m:text-md mobile-l:text-lg">
                      Four BHK Configuration {index + 1}
                    </h3>
                    <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                      {/* Type 4 Units */}
                      <InputField
                        label="Type 4 Units"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Units"
                        value={config.type4Units}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Units}
                      />

                      {/* Type 4 Area */}
                      <InputField
                        label="Type 4 Area (sq ft)"
                        section={`fourBHKConfig[${index}]`}
                        field="type4area"
                        value={config.type4area}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4area}
                      />

                      {/* Total Bedrooms */}
                      <InputField
                        label="Total Bedrooms"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedrooms"
                        value={config.type4Bedrooms}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedrooms}
                      />

                      {/* Bedroom 1 */}
                      <InputField
                        label="Bedroom 1 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom1"
                        value={config.type4Bedroom1}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom2"
                        value={config.type4Bedroom2}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom2}
                      />

                      {/* Bedroom 3 */}
                      <InputField
                        label="Bedroom 3 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom3"
                        value={config.type4Bedroom3}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom3}
                      />

                      {/* Bedroom 4 */}
                      <InputField
                        label="Bedroom 4 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom4"
                        value={config.type4Bedroom4}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom4}
                      />

                      {/* Hall Area */}
                      <InputField
                        label="Hall Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4HallArea"
                        value={config.type4HallArea}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4HallArea}
                      />

                      {/* Kitchen Area */}
                      <InputField
                        label="Kitchen Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4KitchenArea"
                        value={config.type4KitchenArea}
                        onChange={handleChange}
                        error={
                          warnings.fourBHKConfig?.[index]?.type4KitchenArea
                        }
                      />

                      {/* Total Bathrooms */}
                      <InputField
                        label="Total Bathrooms"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathrooms"
                        value={config.type4bathrooms}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathrooms}
                      />

                      {/* Bathroom 1 */}
                      <InputField
                        label="Bathroom 1 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom1"
                        value={config.type4bathroom1}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom2"
                        value={config.type4bathroom2}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom2}
                      />

                      {/* Bathroom 3 */}
                      <InputField
                        label="Bathroom 3 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom3"
                        value={config.type4bathroom3}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom3}
                      />

                      {/* Bathroom 4 */}
                      <InputField
                        label="Bathroom 4 Area"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom4"
                        value={config.type4bathroom4}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom4}
                      />

                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`fourBHKConfig[${index}]`}
                        field="type4floorplan"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.type4floorplan?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.type4floorplan.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`fourBHKConfig[${index}]`}
                        field="type4images"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.type4images?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.type4images.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Balcony */}
                      <InputField
                        label="Balcony Availability"
                        section={`fourBHKConfig[${index}]`}
                        field="type4balcony"
                        value={config.type4balcony}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4balcony}
                      />

                      {/* Parking */}
                      <InputField
                        label="Parking Availability"
                        section={`fourBHKConfig[${index}]`}
                        field="type4parking"
                        value={config.type4parking}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4parking}
                      />
                      {/* Checkbox to Add Another Four BHK Configuration */}
                      <div className="mt-4 flex items-center mx-10">
                        <input
                          type="checkbox"
                          id="addAnotherFourBHK"
                          className="mr-2"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                fourBHKConfig: [
                                  ...(prev.fourBHKConfig || []),
                                  {
                                    type4Units: "",
                                    type4area: "",
                                    type4floorplan: [],
                                    type4images: [],
                                    type4Bedrooms: "",
                                    type4Bedroom1: "",
                                    type4Bedroom2: "",
                                    type4Bedroom3: "",
                                    type4Bedroom4: "",
                                    type4HallArea: "",
                                    type4KitchenArea: "",
                                    type4bathrooms: "",
                                    type4bathroom1: "",
                                    type4bathroom2: "",
                                    type4bathroom3: "",
                                    type4bathroom4: "",
                                    type4balcony: "",
                                    type4parking: "",
                                    enableconfig: false,
                                  },
                                ],
                              }));

                              // Uncheck the checkbox after adding
                              e.target.checked = false;
                            }
                          }}
                        />
                        <label
                          htmlFor="addAnotherFourBHK"
                          className="text-sm font-medium"
                        >
                          Would you like to add another Four BHK Configuration?
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {stage === 10 && (
              <div className="mx-auto">
                {formData.fiveBHKConfig.map((config, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4 mx-10 mobile-s:text-sm mobile-m:text-md mobile-l:text-lg">
                      Five BHK Configuration {index + 1}
                    </h3>
                    <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                      {/* Type 5 Units */}
                      <InputField
                        label="Type 5 Units"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Units"
                        value={config.type5Units}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Units}
                      />

                      {/* Type 5 Area */}
                      <InputField
                        label="Type 5 Area (sq ft)"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5area"
                        value={config.type5area}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5area}
                      />

                      {/* Total Bedrooms */}
                      <InputField
                        label="Total Bedrooms"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedrooms"
                        value={config.type5Bedrooms}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedrooms}
                      />

                      {/* Bedroom 1 */}
                      <InputField
                        label="Bedroom 1 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom1"
                        value={config.type5Bedroom1}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom2"
                        value={config.type5Bedroom2}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom2}
                      />

                      {/* Bedroom 3 */}
                      <InputField
                        label="Bedroom 3 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom3"
                        value={config.type5Bedroom3}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom3}
                      />

                      {/* Bedroom 4 */}
                      <InputField
                        label="Bedroom 4 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom4"
                        value={config.type5Bedroom4}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom4}
                      />

                      {/* Bedroom 5 */}
                      <InputField
                        label="Bedroom 5 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom5"
                        value={config.type5Bedroom5}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom5}
                      />

                      {/* Hall Area */}
                      <InputField
                        label="Hall Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5HallArea"
                        value={config.type5HallArea}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5HallArea}
                      />

                      {/* Kitchen Area */}
                      <InputField
                        label="Kitchen Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5KitchenArea"
                        value={config.type5KitchenArea}
                        onChange={handleChange}
                        error={
                          warnings.fiveBHKConfig?.[index]?.type5KitchenArea
                        }
                      />

                      {/* Total Bathrooms */}
                      <InputField
                        label="Total Bathrooms"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathrooms"
                        value={config.type5bathrooms}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathrooms}
                      />

                      {/* Bathroom 1 */}
                      <InputField
                        label="Bathroom 1 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom1"
                        value={config.type5bathroom1}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom2"
                        value={config.type5bathroom2}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom2}
                      />

                      {/* Bathroom 3 */}
                      <InputField
                        label="Bathroom 3 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom3"
                        value={config.type5bathroom3}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom3}
                      />

                      {/* Bathroom 4 */}
                      <InputField
                        label="Bathroom 4 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom4"
                        value={config.type5bathroom4}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom4}
                      />

                      {/* Bathroom 5 */}
                      <InputField
                        label="Bathroom 5 Area"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom5"
                        value={config.type5bathroom5}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom5}
                      />
                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`fiveBHKConfig[${index}]`}
                        field="type4floorplan"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.type5floorplan?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.type5floorplan.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`fiveBHKConfig[${index}]`}
                        field="type5images"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.type5images?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.type5images.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Balcony */}
                      <InputField
                        label="Balcony Availability"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5balcony"
                        value={config.type5balcony}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5balcony}
                      />

                      {/* Parking */}
                      <InputField
                        label="Parking Availability"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5parking"
                        value={config.type5parking}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5parking}
                      />

                      <div className="mt-4 flex items-center mx-10 ">
                        <input
                          type="checkbox"
                          id="addAnotherFiveBHK"
                          className="mr-2"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                fiveBHKConfig: [
                                  ...(prev.fiveBHKConfig || []),
                                  {
                                    typeNumber:
                                      (prev.fiveBHKConfig?.length || 0) + 1,
                                    type5Units: "",
                                    type5area: "",
                                    type5floorplan: [],
                                    type5images: [],
                                    type5Bedrooms: "",
                                    type5Bedroom1: "",
                                    type5Bedroom2: "",
                                    type5Bedroom3: "",
                                    type5Bedroom5: "",
                                    type5Bedroom4: "",
                                    type5HallArea: "",
                                    type5KitchenArea: "",
                                    type5bathrooms: "",
                                    type5bathroom1: "",
                                    type5bathroom2: "",
                                    type5bathroom3: "",
                                    type5bathroom4: "",
                                    type5bathroom5: "",
                                    type5balcony: "",
                                    type5parking: "",
                                    enableconfig: false,
                                  },
                                ],
                              }));
                              e.target.checked = false; // Uncheck after adding
                            }
                          }}
                        />
                        <label
                          htmlFor="addAnotherFiveBHK"
                          className="text-sm font-medium"
                        >
                          Would you like to add another Five BHK Configuration?
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {stage === 11 && (
              <div className="mx-auto">
                {formData.penthouseConfig.map((config, index) => (
                  <div key={index} className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4 mx-10 mobile-s:text-sm mobile-m:text-md mobile-l:text-lg">
                      Penthouse Configuration {index + 1}
                    </h3>
                    <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                      {/* Penthouse Units */}
                      <InputField
                        label="Penthouse Units"
                        section={`penthouseConfig[${index}]`}
                        field="penthouseUnits"
                        value={config.penthouseUnits}
                        onChange={handleChange}
                        error={
                          warnings.penthouseConfig?.[index]?.penthouseUnits
                        }
                      />

                      {/* Penthouse Area */}
                      <InputField
                        label="Penthouse Area (sq ft)"
                        section={`penthouseConfig[${index}]`}
                        field="penthouseArea"
                        value={config.penthouseArea}
                        onChange={handleChange}
                        error={warnings.penthouseConfig?.[index]?.penthouseArea}
                      />

                      {/* Total Bathrooms */}
                      <InputField
                        label="Total Bathrooms"
                        section={`penthouseConfig[${index}]`}
                        field="penthouseBathrooms"
                        value={config.penthouseBathrooms}
                        onChange={handleChange}
                        error={
                          warnings.penthouseConfig?.[index]?.penthouseBathrooms
                        }
                      />

                      {/* Total Bedrooms */}
                      <InputField
                        label="Total Bedrooms"
                        section={`penthouseConfig[${index}]`}
                        field="penthouseBedrooms"
                        value={config.penthouseBedrooms}
                        onChange={handleChange}
                        error={
                          warnings.penthouseConfig?.[index]?.penthouseBedrooms
                        }
                      />

                      {/* Balcony Availability */}
                      <InputField
                        label="Balcony Availability"
                        section={`penthouseConfig[${index}]`}
                        field="penthouseBalcony"
                        value={config.penthouseBalcony}
                        onChange={handleChange}
                        error={
                          warnings.penthouseConfig?.[index]?.penthouseBalcony
                        }
                      />

                      {/* Parking Availability */}
                      <InputField
                        label="Parking Availability"
                        section={`penthouseConfig[${index}]`}
                        field="penthouseParking"
                        value={config.penthouseParking}
                        onChange={handleChange}
                        error={
                          warnings.penthouseConfig?.[index]?.penthouseParking
                        }
                      />

                      {/* Hall Area */}
                      <InputField
                        label="Hall Area"
                        section={`penthouseConfig[${index}]`}
                        field="hallArea"
                        value={config.hallArea}
                        onChange={handleChange}
                        error={warnings.penthouseConfig?.[index]?.hallArea}
                      />

                      {/* Kitchen Area */}
                      <InputField
                        label="Kitchen Area"
                        section={`penthouseConfig[${index}]`}
                        field="kitchenArea"
                        value={config.kitchenArea}
                        onChange={handleChange}
                        error={warnings.penthouseConfig?.[index]?.kitchenArea}
                      />

                      {/* Bedrooms */}
                      {[...Array(6).keys()].map((num) => (
                        <InputField
                          key={`bedroom${num + 1}`}
                          label={`Bedroom ${num + 1} Area`}
                          section={`penthouseConfig[${index}]`}
                          field={`bedroom${num + 1}Area`}
                          value={config[`bedroom${num + 1}Area`]}
                          onChange={handleChange}
                          error={
                            warnings.penthouseConfig?.[index]?.[
                              `bedroom${num + 1}Area`
                            ]
                          }
                        />
                      ))}

                      {/* Bathrooms */}
                      {[...Array(6).keys()].map((num) => (
                        <InputField
                          key={`bathroom${num + 1}`}
                          label={`Bathroom ${num + 1} Area`}
                          section={`penthouseConfig[${index}]`}
                          field={`bathroom${num + 1}Area`}
                          value={config[`bathroom${num + 1}Area`]}
                          onChange={handleChange}
                          error={
                            warnings.penthouseConfig?.[index]?.[
                              `bathroom${num + 1}Area`
                            ]
                          }
                        />
                      ))}

                      {/* Floor Plan Image Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`penthouseConfig[${index}]`}
                        field="penthouseFloorPlan"
                        label="Upload Penthouse Floor Plan"
                        limit={5}
                      />
                      {config.penthouseFloorPlan?.length > 0 && (
                        <div>
                          <h3>Uploaded Floor Plans:</h3>
                          <ul>
                            {config.penthouseFloorPlan.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Other Images Upload */}
                      <ImageUpload
                        handleChange={handleChange}
                        section={`penthouseConfig[${index}]`}
                        field="penthouseImages"
                        label="Upload Additional Images"
                        limit={5}
                      />
                      {config.penthouseImages?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {config.penthouseImages.map((file, imgIndex) => (
                              <li key={imgIndex}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Checkbox to Add Another Penthouse Configuration */}
                      <div className="mt-4 flex items-center mx-10">
                        <input
                          type="checkbox"
                          id="addAnotherPenthouse"
                          className="mr-2"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                penthouseConfig: [
                                  ...(prev.penthouseConfig || []),
                                  {
                                    typeNumber:
                                      (prev.penthouseConfig?.length || 0) + 1,
                                    penthouseUnits: "",
                                    penthouseArea: "",
                                    penthouseBedrooms: "",
                                    penthouseFloorPlan: [],
                                    penthouseBathrooms: "",
                                    penthouseBalcony: "",
                                    penthouseParking: "",
                                    penthouseImages: [],
                                    hallArea: "",
                                    kitchenArea: "",
                                    ...Object.fromEntries(
                                      [...Array(6).keys()].map((num) => [
                                        `bedroom${num + 1}Area`,
                                        "",
                                      ])
                                    ),
                                    ...Object.fromEntries(
                                      [...Array(6).keys()].map((num) => [
                                        `bathroom${num + 1}Area`,
                                        "",
                                      ])
                                    ),
                                    enableconfig: false,
                                  },
                                ],
                              }));
                              // Automatically uncheck after adding
                              e.target.checked = false;
                            }
                          }}
                        />
                        <label
                          htmlFor="addAnotherPenthouse"
                          className="text-sm font-medium"
                        >
                          Would you like to add another Penthouse Configuration?
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Display Cached Data on the Last Stage */}
            {stage === 12 && (
              <div className="mx-auto">
                <Typography variant="h6" className="text-center underline">
                  Review Your Data:
                </Typography>
                <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-3 justify-between mx-10">
  {Object.entries(cachedData).map(([section, data]) => (
    <div key={section} className="mb-4">
      <Typography variant="subtitle1" className="text-white">
        {section.charAt(0).toUpperCase() + section.slice(1)}:
      </Typography>

      {Array.isArray(data) ? (
        data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="ml-4">
              <Typography className="text-white font-bold">
                {`${section} ${index + 1}:`}
              </Typography>
              {Object.entries(item).map(([key, value]) => (
                <Typography className="text-white" key={key}>
                  {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${
                    value !== undefined && value !== null ? value : "Not Provided"
                  }`}
                </Typography>
              ))}
            </div>
          ))
        ) : (
          <Typography className="text-white">No data available</Typography>
        )
      ) : typeof data === "object" ? (
        Object.entries(data).map(([key, value]) => (
          <Typography className="text-white" key={key}>
            {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${
              value !== undefined && value !== null ? value : "Not Provided"
            }`}
          </Typography>
        ))
      ) : (
        <Typography className="text-white">{data || "No data available"}</Typography>
      )}
    </div>
  ))}
</div>

              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button
              onClick={prevStage}
              disabled={stage === 0}
              sx={{
                color: "#eab308", // Set text color to yellow
                backgroundColor: "transparent", // Remove background color
                "&:hover": {
                  textDecoration: "underline", // Add underline on hover
                  backgroundColor: "transparent", // Ensure background remains transparent on hover
                },
              }}
            >
              Back
            </Button>
            {stage < initialSteps.length - 1 ? (
              <div>
                <Button
                  onClick={nextStage}
                  sx={{
                    color: "#eab308", // Set text color to yellow
                    backgroundColor: "transparent", // Remove background color
                    "&:hover": {
                      textDecoration: "underline", // Add underline on hover
                      backgroundColor: "transparent", // Ensure background remains transparent on hover
                    },
                  }}
                >
                  Next
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSubmit}
                sx={{
                  color: "#eab308", // Set text color to yellow
                  backgroundColor: "transparent", // Remove background color
                  "&:hover": {
                    textDecoration: "underline", // Add underline on hover
                    backgroundColor: "transparent", // Ensure background remains transparent on hover
                  },
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default MultiStageForm;
