import React, { useState } from "react";
import * as yup from "yup";

import {
  Button,
  Container,
  Typography,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  // TextField,
  Grid,
  FormGroup,
} from "@mui/material";
import InputField from "./InputField";
import DropdownField from "./DropdownField";
import DatePicker from "./DateController";
import CheckBox from "./CheckBoxControl";
import Header from "./Header";
import ImageUpload from "./ImageUploader";
import VideoUpload from "./VideoUploader";

// Step Titles
const initialSteps = [
  "Add Organization", //stage 0
  "Add Project", //stage 1
  "Add Project Details", //stage 2
  "Add One BHK", // This will be Stage 3
  "Add Two BHK", // This will be Stage 4
  "Add Three BHK", // This will be Stage 5
  "Add Four BHK", // This will be Stage 6
  "Add Five BHK", // This will be Stage 7
  "Add PentHouse", // This will be Stage 8
  "Review Details", // This will be Stage 9
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
      .matches(/^[a-zA-Z\s]+$/, "Owner Name must contain only letters"),
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
      schools: yup.string(),
      hospitals: yup.string(),
      malls: yup.string(),
      movietheater: yup
        .string()
        .typeError("Please enter in letters")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        ),
      ITpark: yup
        .string()
        .typeError("Please enter in letters")
        .matches(
          /^[a-zA-Z\s]+$/,
          "Organization name contains unsupported characters"
        ),
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
    amenities: yup.string().required("Amenities is required"),
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
  oneBHKConfig: yup.object({
    type1Units: yup
      .number()
      .typeError("Type 1 Units must be a Number")
      .required("Type 1 Units is required")
      .min(0, "Type 1 Units cannot be negative"),
    type2Units: yup
      .number()
      .typeError("Type 2 Units must be a Number")
      .required("Type 2 Units is required")
      .min(0, "Type 2 Units cannot be negative"),
    type1area: yup
      .number()
      .typeError("Type 1 Area must be a number")
      .min(0, "Type 1 Area cannot be negative")
      .required("Type 1 Area is required"),
    type1floorplan: yup
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

    type1images: yup
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

    type1bathrooms: yup
      .number()
      .typeError("Type 1 Bathrooms must be a number")
      .min(0, "Type 1 Bathrooms cannot be negative")
      .required("Type 1 Bathrooms is required"),
    type1bathroom1: yup
      .number()
      .typeError("Type 1 Bathroom 1 must be a number")
      .min(0, "Type 1 Bathrooms cannot be negative")
      .required("Type 1 Bathrooms is required"),
    type1bathroom2: yup
      .number()
      .typeError("Type 1 Bathroom 2 must be a number")
      .min(0, "Type 1 Bathrooms cannot be negative")
      .required("Type 1 Bathrooms is required"),
    type2bathrooms: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type2bathroom1: yup
      .number()
      .typeError("Type 2 Bathroom 1 must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type2bathroom2: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type1balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type2balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type1parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
    type2parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
    type1BedroomArea: yup
      .number()
      .typeError("Bedroom Area must be a number")
      .min(0, "Bedroom Area cannot be negative")
      .required("Bedroom Area is required"),
    type2BedroomArea: yup
      .number()
      .typeError("Bedroom Area must be a number")
      .min(0, "Bedroom Area cannot be negative")
      .required("Bedroom Area is required"),
    type1HallArea: yup
      .number()
      .typeError("Hall Area must be a number")
      .min(0, "Hall Area cannot be negative")
      .required("Hall Area is required"),
    type2HallArea: yup
      .number()
      .typeError("Hall Area must be a number")
      .min(0, "Hall Area cannot be negative")
      .required("Hall Area is required"),
    type1KitchenArea: yup
      .number()
      .typeError("Kitchen Area must be a number")
      .min(0, "Kitchen Area cannot be negative")
      .required("Kitchen Area is required"),
    type2KitchenArea: yup
      .number()
      .required("Kitchen Area is required")
      .typeError("Kitchen Area must be a number")
      .min(0, "Kitchen Area cannot be negative"),
  }),
  twoBHKConfig: yup.object({
    type2Units: yup
      .number()
      .required("Type 2 Units is required")
      .typeError("Type 2 Units must be a Number")
      .min(0, "Type 2 Units cannot be negative"),
    type2area: yup
      .number()
      .required("Type 2 Area is required")
      .typeError("Type 2 Area must be a number")
      .min(0, "Type 2 Area cannot be negative"),

    type2floorplan: yup.string(),
    type2images: yup.string(),
    type2bathrooms: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type2balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type2parking: yup
      .number()
      .required("Parking is required")
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative"),
    type2Units2: yup
      .number()
      .required("Type 2 Units is required")
      .typeError("Type 2 Units must be a Number")
      .min(0, "Type 2 Units cannot be negative"),
    type2area2: yup
      .number()
      .required("Type 2 Area is required")
      .typeError("Type 2 Area must be a number")
      .min(0, "Type 2 Area cannot be negative"),

    type2floorplan2: yup.string(),
    type2images2: yup.string(),
    type2bathrooms2: yup
      .number()
      .typeError("Type 2 Bathrooms must be a number")
      .min(0, "Type 2 Bathrooms cannot be negative")
      .required("Type 2 Bathrooms is required"),
    type2balcony2: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type2parking2: yup
      .number()
      .required("Parking is required")
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative"),
  }),
  threeBHKConfig: yup.object({
    type3Units: yup
      .number()
      .typeError("Type 3 Units must be a Number")
      .required("Type 3 Units is required")
      .min(0, "Type 3 Units cannot be negative"),
    type3area: yup
      .number()
      .typeError("Type 3 Area must be a number")
      .min(0, "Type 3 Area cannot be negative")
      .required("Type 3 Area is required"),
    type3floorplan: yup.string(),
    type3images: yup.string(),
    type3bathrooms: yup
      .number()
      .typeError("Type 3 Bathrooms must be a number")
      .min(0, "Type 3 Bathrooms cannot be negative")
      .required("Type 3 Bathrooms is required"),
    type3balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type3parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
  fourBHKConfig: yup.object({
    type4Units: yup
      .number()
      .typeError("Type 4 Units must be a Number")
      .required("Type 4 Units is required")
      .min(0, "Type 4 Units cannot be negative"),
    type4area: yup
      .number()
      .typeError("Type 4 Area must be a number")
      .min(0, "Type 4 Area cannot be negative")
      .required("Type 4 Area is required"),
    type4floorplan: yup.string(),
    type4images: yup.string(),
    type4bathrooms: yup
      .number()
      .typeError("Type 4 Bathrooms must be a number")
      .min(0, "Type 4 Bathrooms cannot be negative")
      .required("Type 4 Bathrooms is required"),
    type4balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type4parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
  fiveBHKConfig: yup.object({
    type5Units: yup
      .number()
      .typeError("Type 5 Units must be a Number")
      .required("Type 5 Units is required")
      .min(0, "Type 5 Units cannot be negative"),
    type5area: yup
      .number()
      .typeError("Type 5 Area must be a number")
      .min(0, "Type 5 Area cannot be negative")
      .required("Type 5 Area is required"),
    type5floorplan: yup.string(),
    type5images: yup.string(),
    type5bathrooms: yup
      .number()
      .typeError("Type 5 Bathrooms must be a number")
      .min(0, "Type 5 Bathrooms cannot be negative")
      .required("Type 5 Bathrooms is required"),
    type5balcony: yup
      .number()
      .typeError("Balconies must be a number")
      .min(0, "Balconies cannot be negative")
      .required("Balconies is required"),
    type5parking: yup
      .number()
      .typeError("Parking must be a number")
      .min(0, "Parking cannot be negative")
      .required("Parking is required"),
  }),
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
      address: "",
      latitude: "",
      longitude: "",
      area: "",
      reranumber: "",
      reralink: "",
      projectvideolink: "",
      projectimages: "",
      schools: "",
      hospitals: "",
      malls: "",
      movietheater: "",
      Images: [],
      Videos: [],
    },
    projectDetails: {
      units: "",
      allInclusive: false,
      projectstatus: "",
      projectlaunch: null,
      ProjectPlannedEnd: null,
      pricemin: "",
      pricemax: "",
      amenities: "",
      coveredparking: "",
      bankapproved: false,
      banks: "",
      deleted: false,
      ITpark: "",
    },
    oneBHKConfig: {
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
      type2Units: "",
      type2area: "",
      type2floorplan: [],
      type2images: [],
      type2BedroomArea: "",
      type2HallArea: "",
      type2KitchenArea: "",
      type2bathrooms: "",
      type2bathroom1: "",
      type2bathroom2: "",
      type2balcony: "",
      type2parking: "",
      enableconfig: false,
    },

    twoBHKConfig: {
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
      type2Units2: "",
      type2area2: "",
      type2floorplan2: [],
      type2images2: [],
      type2Bedrooms2: "",
      type2Bedroom21: "",
      type2Bedrooms22: "",
      type2HallArea2: "",
      type2KitchenArea2: "",
      type2bathrooms2: "",
      type2bathroom21: "",
      type2bathroom22: "",
      type2balcony2: "",
      type2parking2: "",
      enableconfig: false,
    },

    threeBHKConfig: {
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
      type3Units2: "",
      type3area2: "",
      type3floorplan2: [],
      type3images2: [],
      type3Bedrooms2: "",
      type3Bedroom21: "",
      type3Bedroom22: "",
      type3Bedroom23: "",
      type3HallArea2: "",
      type3KitchenArea2: "",
      type3bathrooms2: "",
      type3bathrooms21: "",
      type3bathrooms22: "",
      type3bathrooms23: "",
      type3balcony2: "",
      type3parking2: "",
      enableconfig: false,
    },
    fourBHKConfig: {
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
      type4Units2: "",
      type4area2: "",
      type4floorplan2: [],
      type4images2: [],
      type4Bedrooms2: "",
      type4Bedroom21: "",
      type4Bedroom22: "",
      type4Bedroom23: "",
      type4Bedroom24: "",
      type4HallArea2: "",
      type4KitchenArea2: "",
      type4bathrooms2: "",
      type4bathroom21: "",
      type4bathroom22: "",
      type4bathroom23: "",
      type4bathroom24: "",
      type4balcony2: "",
      type4parking2: "",
      enableconfig: false,
    },

    fiveBHKConfig: {
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
      type5Units2: "",
      type5area2: "",
      type5floorplan2: [],
      type5images2: [],
      type5Bedrooms2: "",
      type5Bedroom21: "",
      type5Bedroom22: "",
      type5Bedroom23: "",
      type5Bedroom24: "",
      type5Bedroom25: "",
      type5HallArea2: "",
      type5KitchenArea2: "",
      type5bathrooms2: "",
      type5bathrooms21: "",
      type5bathrooms22: "",
      type5bathrooms23: "",
      type5bathrooms24: "",
      type5bathrooms25: "",
      type5balcony2: "",
      type5parking2: "",
      enableconfig: false,
    },
    penthouseConfig: {
      penthouseUnits: "",
      penthouseArea: "",
      penthouseFloorPlan: [],
      penthouseBathrooms: "",
      penthouseBalcony: "",
      penthouseParking: "",
      penthouseImages: [],
      typeNumber: "",
      hallArea: "",
      kitchenArea: "",
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
      penthouseUnits2: "",
penthouseArea2: "",
penthouseFloorPlan2: [],
penthouseBathrooms2: "",
penthouseBalcony2: "",
penthouseParking2: "",
penthouseImages2: [],
typeNumber2: "",
hallArea2: "",
kitchenArea2: "",
bedroom1Area2: "",
bedroom2Area2: "",
bedroom3Area2: "",
bedroom4Area2: "",
bedroom5Area2: "",
bedroom6Area2: "",
bathroom1Area2: "",
bathroom2Area2: "",
bathroom3Area2: "",
bathroom4Area2: "",
bathroom5Area2: "",
bathroom6Area2: "",

    },
  });

  const [cachedData, setCachedData] = useState({
    organization: {},
    project: {},
    projectDetails: {},
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
      const updatedData = {
        ...prev,
        [section]: {
          ...(prev[section] || {}),
          [field]:
            typeof value === "function"
              ? value(prev[section]?.[field] || [])
              : value,
        },
      };

      console.log("✅ Updated Form Data: ", updatedData);

      // Optionally trigger validation (if required)
      validateField(section, field, value, updatedData);

      return updatedData;
    });
  };

  const validateField = async (section, field, value, updatedData) => {
    try {
      // Validate the field using Yup schema
      console.log("🔍 Validating: ", { section, field, value });
      console.log("📊 Updated Data: ", updatedData);
      console.log("✅ Section:", section);
      console.log("✅ Field:", field);
      console.log("✅ Value:", value);

      await validationSchema.validateAt(`${section}.${field}`, updatedData);

      // ✅ Clear the error if validation is successful
      setWarnings((prev) => {
        const updatedWarnings = { ...prev };
        if (updatedWarnings[section]) {
          delete updatedWarnings[section][field];
          // If the section has no more errors, remove it entirely
          if (Object.keys(updatedWarnings[section]).length === 0) {
            delete updatedWarnings[section];
          }
        }
        return updatedWarnings;
      });

      return true; // ✅ Validation passed
    } catch (error) {
      // ❌ Set error message if validation fails
      setWarnings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: error.message,
        },
      }));

      return false; // ❌ Validation failed
    }
  };

  const nextStage = async () => {
    const isType2Enabled = formData.oneBHKConfig.enableconfig === "yes";

    try {
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
          "projectDetails.units",
          "projectDetails.projectstatus",
          "projectDetails.projectlaunch",
          "projectDetails.ProjectPlannedEnd",
          "projectDetails.pricemin",
          "projectDetails.pricemax",
          "projectDetails.allInclusive",
          "projectDetails.amenities",
        ],
        3: [
          "oneBHKConfig.type1Units",
          "oneBHKConfig.type1area",
          "oneBHKConfig.type1bathrooms",
          "oneBHKConfig.type1balcony",
          "oneBHKConfig.type1parking",
          "oneBHKConfig.type1BedroomArea",
          "oneBHKConfig.type1HallArea",
          "oneBHKConfig.type1KitchenArea",
        ],
        4: [
          "twoBHKConfig.type2Units",
          "twoBHKConfig.type2area",
          "twoBHKConfig.type2bathrooms",
          "twoBHKConfig.type2balcony",
          "twoBHKConfig.type2parking",
        ],
        5: [
          "threeBHKConfig.type3Units",
          "threeBHKConfig.type3area",
          "threeBHKConfig.type3bathrooms",
          "threeBHKConfig.type3balcony",
          "threeBHKConfig.type3parking",
        ],
        6: [
          "fourBHKConfig.type4Units",
          "fourBHKConfig.type4area",
          "fourBHKConfig.type4bathrooms",
          "fourBHKConfig.type4balcony",
          "fourBHKConfig.type4parking",
        ],
        7: [
          "fiveBHKConfig.type5Units",
          "fiveBHKConfig.type5area",
          "fiveBHKConfig.type5bathrooms",
          "fiveBHKConfig.type5balcony",
          "fiveBHKConfig.type5parking",
        ],
      };
      if (isType2Enabled) {
        requiredFields[3].push(
          "oneBHKConfig.type2BedroomArea",
          "oneBHKConfig.type2HallArea",
          "oneBHKConfig.type2KitchenArea",
          "oneBHKConfig.type2BathroomArea"
        );
      }

      // 2. Validate required fields for the current stage
      const currentFields = requiredFields[stage] || [];
      const isValid = await Promise.all(
        currentFields.map(async (field) => {
          const [section, key] = field.split(".");
          return validateField(
            section,
            key,
            formData[section]?.[key],
            formData
          );
        })
      );

      // If any validation fails, stop here
      if (isValid.includes(false)) {
        console.error("❌ Validation failed, please correct the errors.");
        if (stage < initialSteps.length - 1) {
          setStage(stage + 1);
        }
        //return; // Stop navigation if any validation fails
      }

      // 3. Cache current stage data
      const cacheMap = {
        0: "organization",
        1: "project",
        2: "projectDetails",
        3: "oneBHKConfig",
        4: "twoBHKConfig",
        5: "threeBHKConfig",
        6: "fourBHKConfig",
        7: "fiveBHKConfig",
        8: "PentHouse",
      };

      if (cacheMap[stage]) {
        setCachedData((prev) => ({
          ...prev,
          [cacheMap[stage]]: formData[cacheMap[stage]],
        }));
      }

      console.log("✅ Stage data cached: ", cachedData);

      // 4. Navigate to the correct next stage based on conditions
      if (stage < Object.keys(requiredFields).length - 1) {
        setStage((prevStage) => prevStage + 1);
      } else {
        console.log("🎉 All stages completed!");
        setStage((prevStage) => prevStage + 1);
      }
      if (stage === 0) {
        setCachedData((prev) => ({
          ...prev,
          organization: formData.organization,
        }));
      } else if (stage === 1) {
        setCachedData((prev) => ({
          ...prev,
          project: formData.project,
        }));
      } else if (stage === 2) {
        setCachedData((prev) => ({
          ...prev,
          projectDetails: formData.projectDetails,
        }));
      } else if (stage === 3) {
        setCachedData((prev) => ({
          ...prev,
          oneBHKConfig: formData.oneBHKConfig,
        }));
      } else if (stage === 4) {
        setCachedData((prev) => ({
          ...prev,
          twoBHKConfig: formData.twoBHKConfig,
        }));
        // }
      } else if (stage === 5) {
        setCachedData((prev) => ({
          ...prev,
          threeBHKConfig: formData.threeBHKConfig,
        }));
      } else if (stage === 6) {
        setCachedData((prev) => ({
          ...prev,
          fourBHKConfig: formData.fourBHKConfig,
        }));
      } else if (stage === 7) {
        setCachedData((prev) => ({
          ...prev,
          fiveBHKConfig: formData.fiveBHKConfig,
        }));
      } else if (stage === 8) {
        setCachedData((prev) => ({
          ...prev,
          penthouseConfig: formData.penthouseConfig,
        }));
      }
      switch (stage) {
        case 2: // Stage 2 (Initial Navigation)
          if (
            proceedToOneBHK &&
            proceedToTwoBHK &&
            proceedToThreeBHK &&
            proceedToFourBHK &&
            proceedToFiveBHK &&
            proceedToPentHouse
          ) {
            setStage(3); // Move to One BHK Config (Stage 3)
          } else if (proceedToOneBHK) {
            setStage(3); // Move to One BHK Config (Stage 3)
          } else if (proceedToTwoBHK) {
            setStage(4); // Move to Two BHK Config (Stage 4)
          } else if (proceedToThreeBHK) {
            setStage(5); // Move to Three BHK Config (Stage 5)
          } else if (proceedToFourBHK) {
            setStage(6); // Move to Four BHK Config (Stage 6)
          } else if (proceedToFiveBHK) {
            setStage(7); // Move to Five BHK Config (Stage 7)
          } else if (proceedToPentHouse) {
            setStage(8); // Move to Penthouse Config (Stage 8)
          } else {
            setStage(9); // Move to Review Data (Stage 9)
          }
          break;

        case 3: // Stage 3 (One BHK Config)
          if (proceedToTwoBHK) {
            setStage(4); // Move to Two BHK Config (Stage 4)
          } else if (proceedToThreeBHK) {
            setStage(5); // Move to Three BHK Config (Stage 5)
          } else if (proceedToFourBHK) {
            setStage(6); // Move to Four BHK Config (Stage 6)
          } else if (proceedToFiveBHK) {
            setStage(7); // Move to Five BHK Config (Stage 7)
          } else if (proceedToPentHouse) {
            setStage(8); // Move to Penthouse Config (Stage 8)
          } else {
            setStage(9); // Move to Review Data (Stage 9)
          }
          break;

        case 4: // Stage 4 (Two BHK Config)
          if (proceedToThreeBHK) {
            setStage(5); // Move to Three BHK Config (Stage 5)
          } else if (proceedToFourBHK) {
            setStage(6); // Move to Four BHK Config (Stage 6)
          } else if (proceedToFiveBHK) {
            setStage(7); // Move to Five BHK Config (Stage 7)
          } else if (proceedToPentHouse) {
            setStage(8); // Move to Penthouse Config (Stage 8)
          } else {
            setStage(9); // Move to Review Data (Stage 9)
          }
          break;

        case 5: // Stage 5 (Three BHK Config)
          if (proceedToFourBHK) {
            setStage(6); // Move to Four BHK Config (Stage 6)
          } else if (proceedToFiveBHK) {
            setStage(7); // Move to Five BHK Config (Stage 7)
          } else if (proceedToPentHouse) {
            setStage(8); // Move to Penthouse Config (Stage 8)
          } else {
            setStage(9); // Move to Review Data (Stage 9)
          }
          break;

        case 6: // Stage 6 (Four BHK Config)
          if (proceedToFiveBHK) {
            setStage(7); // Move to Five BHK Config (Stage 7)
          } else if (proceedToPentHouse) {
            setStage(8); // Move to Penthouse Config (Stage 8)
          } else {
            setStage(9); // Move to Review Data (Stage 9)
          }
          break;

        case 7: // Stage 7 (Five BHK Config)
          if (proceedToPentHouse) {
            setStage(8); // Move to Penthouse Config (Stage 8)
          } else {
            setStage(9); // Move to Review Data (Stage 9)
          }
          break;

        case 8: // Stage 8 (Penthouse Config)
          setStage(9); // Move to Review Data (Stage 9)
          break;

        default: // Handle unknown stages or linear progression
          if (stage < initialSteps.length - 1) {
            setStage(stage + 1); // Move to the next step if available
          }
          break;
      }
    } catch (error) {
      console.error("🚨 Error in nextStage: ", error);
    }
  };

  const prevStage = () => {
    if (stage > 0) setStage(stage - 1);
  };

  return (
    <div>
      <header className="bg-black text-white p-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
        <Header />
      </header>
      <Container
        maxWidth="md"
        className="bg-black p-4 rounded-lg text-white  sm:3/4"
      >
        <LinearProgress
          variant="determinate"
          value={stage === 0 ? 0 : ((stage + 1) / initialSteps.length) * 100}
          className="w-[745px] px mb-4 h-2 sm:h-3 md:h-4 lg:h-5"
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
            {/* {Array.from({ length: stage + 1 }, (_, i) => (
              <span
                key={i}
                className="w-8 h-8 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full bg-yellow-500 text-black flex items-center justify-center text-xs sm:text-sm md:text-base"
              >
                {i < stage ? "✔" : i + 1}
              </span>
            ))} */}
            <Typography
              variant="h6"
              className="text-yellow-500 text-xs sm:text-sm md:text-base"
            >
              {initialSteps[stage]}
            </Typography>
          </div>
          {/* <div className="flex gap-2">
            {initialSteps.slice(stage + 1).map((_, index) => (
              <span
                key={index}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-[#f5f5f5] sm:text-xs"
              >
                {stage + index + 2}
              </span>
            ))}
          </div> */}
        </div>

        <div className="w-full">
          {stage === 0 && (
            <div className="flex flex-col w-2/4">
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
            <div className="grid grid-cols-2 items-center">
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
              <InputField
                label="Schools"
                section="project"
                field="schools"
                value={formData.project.schools}
                onChange={handleChange}
                error={warnings.project?.schools}
              />
              <InputField
                label="Hospitals"
                section="project"
                field="hospitals"
                value={formData.project.hospitals}
                onChange={handleChange}
                error={warnings.project?.hospitals}
              />
              <InputField
                label="Malls"
                section="project"
                field="malls"
                value={formData.project.malls}
                onChange={handleChange}
                error={warnings.project?.malls}
              />
              <InputField
                label="Movie Theaters"
                section="project"
                field="movietheater"
                value={formData.project.movietheater}
                onChange={handleChange}
                error={warnings.project?.movietheater}
              />
              <InputField
                label="IT Parks"
                section="project"
                field="ITpark"
                value={formData.project.ITpark}
                onChange={handleChange}
                error={warnings.project?.ITpark}
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
            <div className="grid grid-cols-2 items-center">
              <InputField
                label="Project Units"
                section="projectDetails"
                field="units"
                value={formData.projectDetails.units}
                onChange={handleChange}
                error={warnings.projectDetails?.units}
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

              <InputField
                label="Amenities"
                section="projectDetails"
                field="amenities"
                value={formData.projectDetails.amenities}
                onChange={handleChange}
                error={warnings.projectDetails?.amenities}
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
              <FormGroup>
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
                <div className="grid grid-cols-2 items-center">
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={proceedToOneBHK}
                          onChange={(e) => setProceedToOneBHK(e.target.checked)}
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
                          onChange={(e) => setProceedToTwoBHK(e.target.checked)}
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
            </div>
          )}

          {stage === 3 && (
            <div className="grid grid-cols-2 items-center mb-1">
              <>
                <InputField
                  label="1 BHK Type 1 Units"
                  section="oneBHKConfig"
                  field="type1Units"
                  value={formData.oneBHKConfig.type1Units}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1Units}
                />
                <InputField
                  label="1 BHK Type 1 Bedroom Area"
                  section="oneBHKConfig"
                  field="type1BedroomArea"
                  value={formData.oneBHKConfig.type1BedroomArea}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1BedroomArea}
                />
                <InputField
                  label="1 BHK Type 1 Hall Area"
                  section="oneBHKConfig"
                  field="type1HallArea"
                  value={formData.oneBHKConfig.type1HallArea}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1HallArea}
                />
                <InputField
                  label="1 BHK Type 1 Kitchen Area"
                  section="oneBHKConfig"
                  field="type1KitchenArea"
                  value={formData.oneBHKConfig.type1KitchenArea}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1KitchenArea}
                />
                <InputField
                  label="1 BHK Type 1 Bathrooms"
                  section="oneBHKConfig"
                  field="type1bathrooms"
                  value={formData.oneBHKConfig.type1bathrooms}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1bathrooms}
                />
                <InputField
                  label="1 BHK Type 1 Bathroom 1 Area"
                  section="oneBHKConfig"
                  field="type1bathroom1"
                  value={formData.oneBHKConfig.type1bathroom1}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1bathroom1}
                />
                <InputField
                  label="1 BHK Type 1 Bathroom 2 Area"
                  section="oneBHKConfig"
                  field="type1bathroom2"
                  value={formData.oneBHKConfig.type1bathroom2}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1bathroom2}
                />
                <InputField
                  label="1 BHK Type 1 Balcony"
                  section="oneBHKConfig"
                  field="type1balcony"
                  value={formData.oneBHKConfig.type1balcony}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1balcony}
                />
                <InputField
                  label="1 BHK Type 1 Parking"
                  section="oneBHKConfig"
                  field="type1parking"
                  value={formData.oneBHKConfig.type1parking}
                  onChange={handleChange}
                  error={warnings.oneBHKConfig?.type1parking}
                />

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="oneBHKConfig"
                    field="type1floorplan"
                    label="Upload project floorplan"
                    limit={1}
                  />

                  {formData?.oneBHKConfig?.type1floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.oneBHKConfig.type1floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="oneBHKConfig"
                    field="type1images"
                    label="Upload project Images"
                    limit={1}
                  />

                  {formData?.oneBHKConfig?.type1images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.oneBHKConfig.type1images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 1 BHK?"
                    section="oneBHKConfig"
                    field="enableconfig"
                    checked={formData.enableconfig}
                    onChange={handleChange}
                    error={warnings.projectDetails?.enableconfig}
                  />
                </div>

                {/* Conditionally Render Type 2 Fields */}
                {formData.oneBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="1 BHK Type 2 Units"
                      section="oneBHKConfig"
                      field="type2Units"
                      value={formData.oneBHKConfig.type2Units}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2Units}
                    />
                    <InputField
                      label="1 BHK Type 2 Bedroom Area"
                      section="oneBHKConfig"
                      field="type2BedroomArea"
                      value={formData.oneBHKConfig.type2BedroomArea}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2BedroomArea}
                    />
                    <InputField
                      label="1 BHK Type 2 Hall Area"
                      section="oneBHKConfig"
                      field="type2HallArea"
                      value={formData.oneBHKConfig.type2HallArea}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2HallArea}
                    />
                    <InputField
                      label="1 BHK Type 2 Kitchen Area"
                      section="oneBHKConfig"
                      field="type2KitchenArea"
                      value={formData.oneBHKConfig.type2KitchenArea}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2KitchenArea}
                    />
                    <InputField
                      label="1 BHK Type 2 Bathrooms"
                      section="oneBHKConfig"
                      field="type2bathrooms"
                      value={formData.oneBHKConfig.type2bathrooms}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2bathrooms}
                    />
                    <InputField
                      label="1 BHK Type 2 Bathroom 1 Area"
                      section="oneBHKConfig"
                      field="type2bathroom1"
                      value={formData.oneBHKConfig.type2bathroom1}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2bathroom1}
                    />
                    <InputField
                      label="1 BHK Type 2 Bathroom 2 Area"
                      section="oneBHKConfig"
                      field="type2bathroom2"
                      value={formData.oneBHKConfig.type2bathroom2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2bathroom2}
                    />
                    <InputField
                      label="1 BHK Type 2 Balcony"
                      section="oneBHKConfig"
                      field="type2balcony"
                      value={formData.oneBHKConfig.type2balcony}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2balcony}
                    />
                    <InputField
                      label="1 BHK Type 2 Parking"
                      section="oneBHKConfig"
                      field="type2parking"
                      value={formData.oneBHKConfig.type2parking}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2parking}
                    />
                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="oneBHKConfig"
                        field="type2floorplan"
                        label="Upload Type 2 Floorplan"
                        limit={1}
                      />
                      {formData?.oneBHKConfig?.type2floorplan?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.oneBHKConfig.type2floorplan.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="oneBHKConfig"
                        field="type2images"
                        label="Upload Type 2 Images"
                        limit={1}
                      />
                      {formData?.oneBHKConfig?.type2images?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.oneBHKConfig.type2images.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>{" "}
            </div>
          )}

          {stage === 4 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="2 BHK Type Units"
                  section="twoBHKConfig"
                  field="type2Units"
                  value={formData.twoBHKConfig.type2Units}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2Units}
                />
                <InputField
                  label="2 BHK Type Area"
                  section="twoBHKConfig"
                  field="type2area"
                  value={formData.twoBHKConfig.type2area}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2area}
                />
                <InputField
                  label="2 BHK Type Bedrooms"
                  section="twoBHKConfig"
                  field="type2Bedrooms"
                  value={formData.twoBHKConfig.type2Bedrooms}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2Bedrooms}
                />
                <InputField
                  label="2 BHK Type Bedroom 1 area"
                  section="twoBHKConfig"
                  field="type2Bedroom1"
                  value={formData.twoBHKConfig.type2Bedroom1}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2Bedroom1}
                />
                <InputField
                  label="2 BHK Type Bedroom 2 area"
                  section="twoBHKConfig"
                  field="type2type2Bedroom1"
                  value={formData.twoBHKConfig.type2Bedroom2}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2Bedroom2}
                />
                <InputField
                  label="2 BHK Type Hall area"
                  section="twoBHKConfig"
                  field="type2HallArea"
                  value={formData.twoBHKConfig.type2HallArea}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2HallArea}
                />
                <InputField
                  label="2 BHK Type kitchen area "
                  section="twoBHKConfig"
                  field="type2KitchenArea"
                  value={formData.twoBHKConfig.type2KitchenArea}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2KitchenArea}
                />
                <InputField
                  label="2 BHK Type Bathrooms"
                  section="twoBHKConfig"
                  field="type2bathrooms2"
                  value={formData.twoBHKConfig.type2bathrooms2}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2bathrooms2}
                />
                <InputField
                  label="2 BHK Type Bathroom 1 area"
                  section="twoBHKConfig"
                  field="type2bathroom21"
                  value={formData.twoBHKConfig.type2bathroom21}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2bathroom21}
                />
                <InputField
                  label="2 BHK Type Bathroom 2 area"
                  section="twoBHKConfig"
                  field="type2bathroom22"
                  value={formData.twoBHKConfig.type2bathroom22}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2bathroom22}
                />
                <InputField
                  label="2 BHK Type Balcony"
                  section="twoBHKConfig"
                  field="type2balcony"
                  value={formData.twoBHKConfig.type2balcony}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2balcony}
                />
                <InputField
                  label="2 BHK Type Parking"
                  section="twoBHKConfig"
                  field="type2parking"
                  value={formData.twoBHKConfig.type2parking}
                  onChange={handleChange}
                  error={warnings.twoBHKConfig?.type2parking}
                />
                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="twoBHKConfig"
                    field="type2floorplan"
                    label="Upload Type 2 Floorplan"
                    limit={1}
                  />
                  {formData?.twoBHKConfig?.type2floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.twoBHKConfig.type2floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="twoBHKConfig"
                    field="type2images"
                    label="Upload Type 2 Images"
                    limit={1}
                  />
                  {formData?.twoBHKConfig?.type2images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.twoBHKConfig.type2images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 1 BHK?"
                    section="twoBHKConfig"
                    field="enableconfig"
                    checked={formData.enableconfig}
                    onChange={handleChange}
                    error={warnings.twoBHKConfig?.enableconfig}
                  />
                </div>

                {/* Conditionally Render Type 2 Fields */}
                {formData.twoBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="2 BHK Type 2 Units"
                      section="twoBHKConfig"
                      field="type2Units2"
                      value={formData.oneBHKConfig.type2Units2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2Units2}
                    />
                    <InputField
                      label="2 BHK Type Area"
                      section="twoBHKConfig"
                      field="type2area2"
                      value={formData.twoBHKConfig.type2area2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2area2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bedroom Area"
                      section="twoBHKConfig"
                      field="type2Bedrooms2"
                      value={formData.twoBHKConfig.type2Bedrooms2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2Bedrooms2}
                    />

                    <InputField
                      label="2 BHK Type Bedroom 1 area"
                      section="twoBHKConfig"
                      field="type2Bedroom21"
                      value={formData.twoBHKConfig.type2Bedroom21}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2Bedroom21}
                    />
                    <InputField
                      label="2 BHK Type Bedroom 2 area"
                      section="twoBHKConfig"
                      field="type2type2Bedroom1"
                      value={formData.twoBHKConfig.type2Bedroom22}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2Bedroom22}
                    />
                    <InputField
                      label="2 BHK Type 2 Hall Area"
                      section="twoBHKConfig"
                      field="type2HallArea"
                      value={formData.twoBHKConfig.type2HallArea2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2HallArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Kitchen Area"
                      section="twoBHKConfig"
                      field="type2KitchenArea"
                      value={formData.oneBHKConfig.type2KitchenArea2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2KitchenArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bathrooms"
                      section="twoBHKConfig"
                      field="type2bathrooms"
                      value={formData.oneBHKConfig.type2bathrooms2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2bathrooms2}
                    />
                    <InputField
                      label="2 BHK Type Bathroom 1 area"
                      section="twoBHKConfig"
                      field="type2bathroom1"
                      value={formData.twoBHKConfig.type2bathroom1}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2bathroom1}
                    />
                    <InputField
                      label="2 BHK Type Bathroom 2 area"
                      section="twoBHKConfig"
                      field="type2bathroom2"
                      value={formData.twoBHKConfig.type2bathroom2}
                      onChange={handleChange}
                      error={warnings.twoBHKConfig?.type2bathroom2}
                    />
                    <InputField
                      label="2 BHK Type 2 Balcony"
                      section="twoBHKConfig"
                      field="type2balcony"
                      value={formData.oneBHKConfig.type2balcony2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2balcony2}
                    />
                    <InputField
                      label="2 BHK Type 2 Parking"
                      section="twoBHKConfig"
                      field="type2parking"
                      value={formData.oneBHKConfig.type2parking2}
                      onChange={handleChange}
                      error={warnings.oneBHKConfig?.type2parking2}
                    />
                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="twoBHKConfig"
                        field="type2floorplan2"
                        label="Upload Type 2 Floorplan"
                        limit={1}
                      />
                      {formData?.twoBHKConfig?.type2floorplan2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.twoBHKConfig.type2floorplan2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="twoBHKConfig"
                        field="type2images2"
                        label="Upload Type 2 Images"
                        limit={1}
                      />
                      {formData?.twoBHKConfig?.type2images2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.twoBHKConfig.type2images2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          )}

          {stage === 5 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="3 BHK Type 3 Units"
                  section="threeBHKConfig"
                  field="type3Units"
                  value={formData.threeBHKConfig.type3Units}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3Units}
                />
                <InputField
                  label="3 BHK Type Area"
                  section="threeBHKConfig"
                  field="type3area"
                  value={formData.threeBHKConfig.type3area}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3area}
                />

                <InputField
                  label="3 BHK Type Bedroom area"
                  section="threeBHKConfig"
                  field="type3Bedrooms"
                  value={formData.threeBHKConfig.type3Bedrooms}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3Bedrooms}
                />
                <InputField
                  label="3 BHK Type Bedroom 1 Area"
                  section="threeBHKConfig"
                  field="type3Bedroom1"
                  value={formData.threeBHKConfig.type3Bedroom1}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3Bedroom1}
                />

                <InputField
                  label="3 BHK Type Bedroom 2 Area"
                  section="threeBHKConfig"
                  field="type3Bedroom2"
                  value={formData.threeBHKConfig.type3Bedroom2}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3Bedroom2}
                />

                <InputField
                  label="3 BHK Type Bedroom 3 Area"
                  section="threeBHKConfig"
                  field="type3Bedroom3"
                  value={formData.threeBHKConfig.type3Bedroom3}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3Bedroom3}
                />

                <InputField
                  label="3 BHK Type Hall area"
                  section="threeBHKConfig"
                  field="type3HallArea"
                  value={formData.threeBHKConfig.type3HallArea}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3HallArea}
                />
                <InputField
                  label="3 BHK Type kitchen area "
                  section="threeBHKConfig"
                  field="type3KitchenArea"
                  value={formData.threeBHKConfig.type3KitchenArea}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3KitchenArea}
                />
                <InputField
                  label="3 BHK Type Bathrooms"
                  section="threeBHKConfig"
                  field="type3bathrooms"
                  value={formData.threeBHKConfig.type3bathrooms}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3bathrooms}
                />
                <InputField
                  label="3 BHK Type Balcony"
                  section="threeBHKConfig"
                  field="type3balcony"
                  value={formData.threeBHKConfig.type3balcony}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3balcony}
                />
                <InputField
                  label="3 BHK Type Parking"
                  section="threeBHKConfig"
                  field="type3parking"
                  value={formData.threeBHKConfig.type3parking}
                  onChange={handleChange}
                  error={warnings.threeBHKConfig?.type3parking}
                />
                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="threeBHKConfig"
                    field="type3floorplan"
                    label="Upload Type 3 Floorplan"
                    limit={1}
                  />
                  {formData?.threeBHKConfig?.type3floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.threeBHKConfig.type3floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="threeBHKConfig"
                    field="type3images"
                    label="Upload Type 2 Images"
                    limit={1}
                  />
                  {formData?.threeBHKConfig?.type3images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.threeBHKConfig.type3images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 3 BHK?"
                    section="threeBHKConfig"
                    field="enableconfig"
                    checked={formData.enableconfig}
                    onChange={handleChange}
                    error={warnings.threeBHKConfig?.enableconfig}
                  />
                </div>

                {formData.threeBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="3 BHK Type 2 Units"
                      section="threeBHKConfig"
                      field="type3Units2"
                      value={formData.threeBHKConfig.type3Units2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3Units2}
                    />
                    <InputField
                      label="2 BHK Type Area"
                      section="threeBHKConfig"
                      field="type3area2"
                      value={formData.threeBHKConfig.type3area2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3area2}
                    />
                    <InputField
                      label="3 BHK Type Bathroom 1 Area"
                      section="threeBHKConfig"
                      field="type3bathrooms2"
                      value={formData.threeBHKConfig.type3bathrooms2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3bathrooms2}
                    />

                    <InputField
                      label="3 BHK Type Bathroom 2 Area"
                      section="threeBHKConfig"
                      field="type3bathrooms21"
                      value={formData.threeBHKConfig.type3bathrooms21}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3bathrooms21}
                    />

                    <InputField
                      label="3 BHK Type Bathroom 3 Area"
                      section="threeBHKConfig"
                      field="type3bathrooms22"
                      value={formData.threeBHKConfig.type3bathrooms22}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3bathrooms22}
                    />

                    <InputField
                      label="3 BHK Type Bathroom 4 Area"
                      section="threeBHKConfig"
                      field="type3bathrooms23"
                      value={formData.threeBHKConfig.type3bathrooms23}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3bathrooms23}
                    />

                    <InputField
                      label="2 BHK Type 2 Hall Area"
                      section="threeBHKConfig"
                      field="type2HallArea"
                      value={formData.threeBHKConfig.type3HallArea2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3HallArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Kitchen Area"
                      section="threeBHKConfig"
                      field="type2KitchenArea"
                      value={formData.threeBHKConfig.type3KitchenArea2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3KitchenArea2}
                    />
                    <InputField
                      label="2 BHK Type 2 Bathrooms"
                      section="threeBHKConfig"
                      field="type2bathrooms"
                      value={formData.threeBHKConfig.type3bathrooms2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3bathrooms2}
                    />
                    <InputField
                      label="2 BHK Type 2 Balcony"
                      section="threeBHKConfig"
                      field="type2balcony"
                      value={formData.threeBHKConfig.type3balcony2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3balcony2}
                    />
                    <InputField
                      label="2 BHK Type 2 Parking"
                      section="threeBHKConfig"
                      field="type3parking"
                      value={formData.threeBHKConfig.type3parking2}
                      onChange={handleChange}
                      error={warnings.threeBHKConfig?.type3parking2}
                    />
                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="threeBHKConfig"
                        field="type3floorplan2"
                        label="Upload Type 3 Floorplan"
                        limit={1}
                      />
                      {formData?.threeBHKConfig?.type3floorplan2?.length >
                        0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.threeBHKConfig.type3floorplan2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="threeBHKConfig"
                        field="type3images2"
                        label="Upload Type 2 Images"
                        limit={1}
                      />
                      {formData?.threeBHKConfig?.type3images2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.threeBHKConfig.type3images2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          )}

          {stage === 6 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="4 BHK Type 4 Units"
                  section="fourBHKConfig"
                  field="type4Units"
                  value={formData.fourBHKConfig.type4Units}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4Units}
                />
                <InputField
                  label="4 BHK Type Area"
                  section="fourBHKConfig"
                  field="type4area"
                  value={formData.fourBHKConfig.type4area}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4area}
                />
                <InputField
                  label="4 BHK Total Bedrooms"
                  section="fourBHKConfig"
                  field="type4Bedrooms"
                  value={formData.fourBHKConfig.type4Bedrooms}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4Bedrooms}
                />

                <InputField
                  label="4 BHK Bedroom 1 Area"
                  section="fourBHKConfig"
                  field="type4Bedroom1"
                  value={formData.fourBHKConfig.type4Bedroom1}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4Bedroom1}
                />

                <InputField
                  label="4 BHK Bedroom 2 Area"
                  section="fourBHKConfig"
                  field="type4Bedroom2"
                  value={formData.fourBHKConfig.type4Bedroom2}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4Bedroom2}
                />

                <InputField
                  label="4 BHK Bedroom 3 Area"
                  section="fourBHKConfig"
                  field="type4Bedroom3"
                  value={formData.fourBHKConfig.type4Bedroom3}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4Bedroom3}
                />

                <InputField
                  label="4 BHK Bedroom 4 Area"
                  section="fourBHKConfig"
                  field="type4Bedroom4"
                  value={formData.fourBHKConfig.type4Bedroom4}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4Bedroom4}
                />

                <InputField
                  label="4 BHK Type Hall area"
                  section="fourBHKConfig"
                  field="type4HallArea"
                  value={formData.fourBHKConfig.type4HallArea}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4HallArea}
                />
                <InputField
                  label="4 BHK Type Kitchen area"
                  section="fourBHKConfig"
                  field="type4KitchenArea"
                  value={formData.fourBHKConfig.type4KitchenArea}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4KitchenArea}
                />
                <InputField
                  label="4 BHK Total Bathrooms"
                  section="fourBHKConfig"
                  field="type4bathrooms"
                  value={formData.fourBHKConfig.type4bathrooms}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4bathrooms}
                />

                <InputField
                  label="4 BHK Bathroom 1 Area"
                  section="fourBHKConfig"
                  field="type4bathroom1"
                  value={formData.fourBHKConfig.type4bathroom1}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4bathroom1}
                />

                <InputField
                  label="4 BHK Bathroom 2 Area"
                  section="fourBHKConfig"
                  field="type4bathroom2"
                  value={formData.fourBHKConfig.type4bathroom2}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4bathroom2}
                />

                <InputField
                  label="4 BHK Bathroom 3 Area"
                  section="fourBHKConfig"
                  field="type4bathroom3"
                  value={formData.fourBHKConfig.type4bathroom3}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4bathroom3}
                />

                <InputField
                  label="4 BHK Bathroom 4 Area"
                  section="fourBHKConfig"
                  field="type4bathroom4"
                  value={formData.fourBHKConfig.type4bathroom4}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4bathroom4}
                />

                <InputField
                  label="4 BHK Type Balcony"
                  section="fourBHKConfig"
                  field="type4balcony"
                  value={formData.fourBHKConfig.type4balcony}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4balcony}
                />
                <InputField
                  label="4 BHK Type Parking"
                  section="fourBHKConfig"
                  field="type4parking"
                  value={formData.fourBHKConfig.type4parking}
                  onChange={handleChange}
                  error={warnings.fourBHKConfig?.type4parking}
                />

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="fourBHKConfig"
                    field="type4floorplan"
                    label="Upload Type 4 Floorplan"
                    limit={1}
                  />
                  {formData?.fourBHKConfig?.type4floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.fourBHKConfig.type4floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="fourBHKConfig"
                    field="type4images"
                    label="Upload Type 4 Images"
                    limit={1}
                  />
                  {formData?.fourBHKConfig?.type4images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.fourBHKConfig.type4images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 4 BHK?"
                    section="fourBHKConfig"
                    field="enableconfig"
                    checked={formData.fourBHKConfig.enableconfig}
                    onChange={handleChange}
                    error={warnings.fourBHKConfig?.enableconfig}
                  />
                </div>

                {formData.fourBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="4 BHK Type 2 Units"
                      section="fourBHKConfig"
                      field="type4Units2"
                      value={formData.fourBHKConfig.type4Units2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4Units2}
                    />
                    <InputField
                      label="4 BHK Type 2 Area"
                      section="fourBHKConfig"
                      field="type4area2"
                      value={formData.fourBHKConfig.type4area2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4area2}
                    />
                    <InputField
                      label="4 BHK Type 2 Total Bedrooms"
                      section="fourBHKConfig"
                      field="type4Bedrooms2"
                      value={formData.fourBHKConfig.type4Bedrooms2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4Bedrooms2}
                    />

                    <InputField
                      label="4 BHK Type 2 Bedroom 1 Area"
                      section="fourBHKConfig"
                      field="type4Bedroom21"
                      value={formData.fourBHKConfig.type4Bedroom21}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4Bedroom21}
                    />

                    <InputField
                      label="4 BHK Type 2 Bedroom 2 Area"
                      section="fourBHKConfig"
                      field="type4Bedroom22"
                      value={formData.fourBHKConfig.type4Bedroom22}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4Bedroom22}
                    />

                    <InputField
                      label="4 BHK Type 2 Bedroom 3 Area"
                      section="fourBHKConfig"
                      field="type4Bedroom23"
                      value={formData.fourBHKConfig.type4Bedroom23}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4Bedroom23}
                    />

                    <InputField
                      label="4 BHK Type 2 Bedroom 4 Area"
                      section="fourBHKConfig"
                      field="type4Bedroom24"
                      value={formData.fourBHKConfig.type4Bedroom24}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4Bedroom24}
                    />

                    <InputField
                      label="4 BHK Type 2 Hall Area"
                      section="fourBHKConfig"
                      field="type4HallArea2"
                      value={formData.fourBHKConfig.type4HallArea2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4HallArea2}
                    />
                    <InputField
                      label="4 BHK Type 2 Kitchen Area"
                      section="fourBHKConfig"
                      field="type4KitchenArea2"
                      value={formData.fourBHKConfig.type4KitchenArea2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4KitchenArea2}
                    />
                    <InputField
                      label="4 BHK Type 2 Total Bathrooms"
                      section="fourBHKConfig"
                      field="type4bathrooms2"
                      value={formData.fourBHKConfig.type4bathrooms2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4bathrooms2}
                    />

                    <InputField
                      label="4 BHK Type 2 Bathroom 1 Area"
                      section="fourBHKConfig"
                      field="type4bathroom21"
                      value={formData.fourBHKConfig.type4bathroom21}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4bathroom21}
                    />

                    <InputField
                      label="4 BHK Type 2 Bathroom 2 Area"
                      section="fourBHKConfig"
                      field="type4bathroom22"
                      value={formData.fourBHKConfig.type4bathroom22}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4bathroom22}
                    />

                    <InputField
                      label="4 BHK Type 2 Bathroom 3 Area"
                      section="fourBHKConfig"
                      field="type4bathroom23"
                      value={formData.fourBHKConfig.type4bathroom23}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4bathroom23}
                    />

                    <InputField
                      label="4 BHK Type 2 Bathroom 4 Area"
                      section="fourBHKConfig"
                      field="type4bathroom24"
                      value={formData.fourBHKConfig.type4bathroom24}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4bathroom24}
                    />

                    <InputField
                      label="4 BHK Type 2 Balcony"
                      section="fourBHKConfig"
                      field="type4balcony2"
                      value={formData.fourBHKConfig.type4balcony2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4balcony2}
                    />
                    <InputField
                      label="4 BHK Type 2 Parking"
                      section="fourBHKConfig"
                      field="type4parking2"
                      value={formData.fourBHKConfig.type4parking2}
                      onChange={handleChange}
                      error={warnings.fourBHKConfig?.type4parking2}
                    />

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="fourBHKConfig"
                        field="type4floorplan2"
                        label="Upload Type 4 Floorplan"
                        limit={1}
                      />
                      {formData?.fourBHKConfig?.type4floorplan2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.fourBHKConfig.type4floorplan2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="fourBHKConfig"
                        field="type4images2"
                        label="Upload Type 4 Images"
                        limit={1}
                      />
                      {formData?.fourBHKConfig?.type4images2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.fourBHKConfig.type4images2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          )}

          {stage === 7 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="5 BHK Type 5 Units"
                  section="fiveBHKConfig"
                  field="type5Units"
                  value={formData.fiveBHKConfig.type5Units}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Units}
                />
                <InputField
                  label="5 BHK Type Area"
                  section="fiveBHKConfig"
                  field="type5area"
                  value={formData.fiveBHKConfig.type5area}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5area}
                />

                <InputField
                  label="5 BHK Total Bedrooms"
                  section="fiveBHKConfig"
                  field="type5Bedrooms"
                  value={formData.fiveBHKConfig.type5Bedrooms}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Bedrooms}
                />

                <InputField
                  label="5 BHK Bedroom 1 Area"
                  section="fiveBHKConfig"
                  field="type5Bedroom1"
                  value={formData.fiveBHKConfig.type5Bedroom1}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Bedroom1}
                />

                <InputField
                  label="5 BHK Bedroom 2 Area"
                  section="fiveBHKConfig"
                  field="type5Bedroom2"
                  value={formData.fiveBHKConfig.type5Bedroom2}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Bedroom2}
                />

                <InputField
                  label="5 BHK Bedroom 3 Area"
                  section="fiveBHKConfig"
                  field="type5Bedroom3"
                  value={formData.fiveBHKConfig.type5Bedroom3}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Bedroom3}
                />

                <InputField
                  label="5 BHK Bedroom 4 Area"
                  section="fiveBHKConfig"
                  field="type5Bedroom4"
                  value={formData.fiveBHKConfig.type5Bedroom4}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Bedroom4}
                />

                <InputField
                  label="5 BHK Bedroom 5 Area"
                  section="fiveBHKConfig"
                  field="type5Bedroom5"
                  value={formData.fiveBHKConfig.type5Bedroom5}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5Bedroom5}
                />

                <InputField
                  label="5 BHK Type Hall area"
                  section="fiveBHKConfig"
                  field="type5HallArea"
                  value={formData.fiveBHKConfig.type5HallArea}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5HallArea}
                />
                <InputField
                  label="5 BHK Type Kitchen area"
                  section="fiveBHKConfig"
                  field="type5KitchenArea"
                  value={formData.fiveBHKConfig.type5KitchenArea}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5KitchenArea}
                />
                <InputField
                  label="5 BHK Total Bathrooms"
                  section="fiveBHKConfig"
                  field="type5bathrooms"
                  value={formData.fiveBHKConfig.type5bathrooms}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5bathrooms}
                />

                <InputField
                  label="5 BHK Bathroom 1 Area"
                  section="fiveBHKConfig"
                  field="type5bathroom1"
                  value={formData.fiveBHKConfig.type5bathroom1}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5bathroom1}
                />

                <InputField
                  label="5 BHK Bathroom 2 Area"
                  section="fiveBHKConfig"
                  field="type5bathroom2"
                  value={formData.fiveBHKConfig.type5bathroom2}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5bathroom2}
                />

                <InputField
                  label="5 BHK Bathroom 3 Area"
                  section="fiveBHKConfig"
                  field="type5bathroom3"
                  value={formData.fiveBHKConfig.type5bathroom3}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5bathroom3}
                />

                <InputField
                  label="5 BHK Bathroom 4 Area"
                  section="fiveBHKConfig"
                  field="type5bathroom4"
                  value={formData.fiveBHKConfig.type5bathroom4}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5bathroom4}
                />

                <InputField
                  label="5 BHK Bathroom 5 Area"
                  section="fiveBHKConfig"
                  field="type5bathroom5"
                  value={formData.fiveBHKConfig.type5bathroom5}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5bathroom5}
                />

                <InputField
                  label="5 BHK Type Balcony"
                  section="fiveBHKConfig"
                  field="type5balcony"
                  value={formData.fiveBHKConfig.type5balcony}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5balcony}
                />
                <InputField
                  label="5 BHK Type Parking"
                  section="fiveBHKConfig"
                  field="type5parking"
                  value={formData.fiveBHKConfig.type5parking}
                  onChange={handleChange}
                  error={warnings.fiveBHKConfig?.type5parking}
                />

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="fiveBHKConfig"
                    field="type5floorplan"
                    label="Upload Type 5 Floorplan"
                    limit={1}
                  />
                  {formData?.fiveBHKConfig?.type5floorplan?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.fiveBHKConfig.type5floorplan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="fiveBHKConfig"
                    field="type5images"
                    label="Upload Type 5 Images"
                    limit={1}
                  />
                  {formData?.fiveBHKConfig?.type5images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.fiveBHKConfig.type5images.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for 5 BHK?"
                    section="fiveBHKConfig"
                    field="enableconfig"
                    checked={formData.fiveBHKConfig.enableconfig}
                    onChange={handleChange}
                    error={warnings.fiveBHKConfig?.enableconfig}
                  />
                </div>

                {formData.fiveBHKConfig.enableconfig && (
                  <>
                    <InputField
                      label="5 BHK Type 2 Units"
                      section="fiveBHKConfig"
                      field="type5Units2"
                      value={formData.fiveBHKConfig.type5Units2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Units2}
                    />
                    <InputField
                      label="5 BHK Type 2 Area"
                      section="fiveBHKConfig"
                      field="type5area2"
                      value={formData.fiveBHKConfig.type5area2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5area2}
                    />
                    <InputField
                      label="5 BHK Type 2 Total Bedrooms"
                      section="fiveBHKConfig"
                      field="type5Bedrooms2"
                      value={formData.fiveBHKConfig.type5Bedrooms2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Bedrooms2}
                    />

                    <InputField
                      label="5 BHK Type 2 Bedroom 1 Area"
                      section="fiveBHKConfig"
                      field="type5Bedroom21"
                      value={formData.fiveBHKConfig.type5Bedroom21}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Bedroom21}
                    />

                    <InputField
                      label="5 BHK Type 2 Bedroom 2 Area"
                      section="fiveBHKConfig"
                      field="type5Bedroom22"
                      value={formData.fiveBHKConfig.type5Bedroom22}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Bedroom22}
                    />

                    <InputField
                      label="5 BHK Type 2 Bedroom 3 Area"
                      section="fiveBHKConfig"
                      field="type5Bedroom23"
                      value={formData.fiveBHKConfig.type5Bedroom23}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Bedroom23}
                    />

                    <InputField
                      label="5 BHK Type 2 Bedroom 4 Area"
                      section="fiveBHKConfig"
                      field="type5Bedroom24"
                      value={formData.fiveBHKConfig.type5Bedroom24}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Bedroom24}
                    />

                    <InputField
                      label="5 BHK Type 2 Bedroom 5 Area"
                      section="fiveBHKConfig"
                      field="type5Bedroom25"
                      value={formData.fiveBHKConfig.type5Bedroom25}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5Bedroom25}
                    />

                    <InputField
                      label="5 BHK Type 2 Hall Area"
                      section="fiveBHKConfig"
                      field="type5HallArea2"
                      value={formData.fiveBHKConfig.type5HallArea2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5HallArea2}
                    />
                    <InputField
                      label="5 BHK Type 2 Kitchen Area"
                      section="fiveBHKConfig"
                      field="type5KitchenArea2"
                      value={formData.fiveBHKConfig.type5KitchenArea2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5KitchenArea2}
                    />
                    <InputField
                      label="5 BHK Type 2 Total Bathrooms"
                      section="fiveBHKConfig"
                      field="type5bathrooms2"
                      value={formData.fiveBHKConfig.type5bathrooms2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5bathrooms2}
                    />

                    <InputField
                      label="5 BHK Type 2 Bathroom 1 Area"
                      section="fiveBHKConfig"
                      field="type5bathrooms21"
                      value={formData.fiveBHKConfig.type5bathrooms21}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5bathrooms21}
                    />

                    <InputField
                      label="5 BHK Type 2 Bathroom 2 Area"
                      section="fiveBHKConfig"
                      field="type5bathrooms22"
                      value={formData.fiveBHKConfig.type5bathrooms22}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5bathrooms22}
                    />

                    <InputField
                      label="5 BHK Type 2 Bathroom 3 Area"
                      section="fiveBHKConfig"
                      field="type5bathrooms23"
                      value={formData.fiveBHKConfig.type5bathrooms23}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5bathrooms23}
                    />

                    <InputField
                      label="5 BHK Type 2 Bathroom 4 Area"
                      section="fiveBHKConfig"
                      field="type5bathrooms24"
                      value={formData.fiveBHKConfig.type5bathrooms24}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5bathrooms24}
                    />

                    <InputField
                      label="5 BHK Type 2 Bathroom 5 Area"
                      section="fiveBHKConfig"
                      field="type5bathrooms25"
                      value={formData.fiveBHKConfig.type5bathrooms25}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5bathrooms25}
                    />

                    <InputField
                      label="5 BHK Type 2 Balcony"
                      section="fiveBHKConfig"
                      field="type5balcony2"
                      value={formData.fiveBHKConfig.type5balcony2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5balcony2}
                    />
                    <InputField
                      label="5 BHK Type 2 Parking"
                      section="fiveBHKConfig"
                      field="type5parking2"
                      value={formData.fiveBHKConfig.type5parking2}
                      onChange={handleChange}
                      error={warnings.fiveBHKConfig?.type5parking2}
                    />

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="fiveBHKConfig"
                        field="type5floorplan2"
                        label="Upload Type 5 Floorplan"
                        limit={1}
                      />
                      {formData?.fiveBHKConfig?.type5floorplan2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.fiveBHKConfig.type5floorplan2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <ImageUpload
                        handleChange={handleChange}
                        section="fiveBHKConfig"
                        field="type5images2"
                        label="Upload Type 5 Images"
                        limit={1}
                      />
                      {formData?.fiveBHKConfig?.type5images2?.length > 0 && (
                        <div>
                          <h3>Uploaded Images:</h3>
                          <ul>
                            {formData.fiveBHKConfig.type5images2.map(
                              (file, index) => (
                                <li key={index}>{file.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          )}

          {stage === 8 && (
            <div className="grid grid-cols-2 gap-3 items-center mb-1">
              <>
                <InputField
                  label="Penthouse Units"
                  section="penthouseConfig"
                  field="penthouseUnits"
                  value={formData.penthouseConfig.penthouseUnits}
                  onChange={handleChange}
                  error={warnings.penthouseConfig?.penthouseUnits}
                />
                <InputField
                  label="Penthouse Area"
                  section="penthouseConfig"
                  field="penthouseArea"
                  value={formData.penthouseConfig.penthouseArea}
                  onChange={handleChange}
                  error={warnings.penthouseConfig?.penthouseArea}
                />
                <InputField
                  label="Penthouse Hall Area"
                  section="penthouseConfig"
                  field="hallArea"
                  value={formData.penthouseConfig.hallArea}
                  onChange={handleChange}
                  error={warnings.penthouseConfig?.hallArea}
                />
                <InputField
                  label="Penthouse Kitchen Area"
                  section="penthouseConfig"
                  field="kitchenArea"
                  value={formData.penthouseConfig.kitchenArea}
                  onChange={handleChange}
                  error={warnings.penthouseConfig?.kitchenArea}
                />

                {Array.from({ length: 6 }, (_, i) => (
                  <InputField
                    key={i}
                    label={`Penthouse Bedroom ${i + 1} Area`}
                    section="penthouseConfig"
                    field={`bedroom${i + 1}Area`}
                    value={formData.penthouseConfig[`bedroom${i + 1}Area`]}
                    onChange={handleChange}
                    error={warnings.penthouseConfig?.[`bedroom${i + 1}Area`]}
                  />
                ))}

                {Array.from({ length: 6 }, (_, i) => (
                  <InputField
                    key={i}
                    label={`Penthouse Bathroom ${i + 1} Area`}
                    section="penthouseConfig"
                    field={`bathroom${i + 1}Area`}
                    value={formData.penthouseConfig[`bathroom${i + 1}Area`]}
                    onChange={handleChange}
                    error={warnings.penthouseConfig?.[`bathroom${i + 1}Area`]}
                  />
                ))}

                <InputField
                  label="Penthouse Balcony"
                  section="penthouseConfig"
                  field="penthouseBalcony"
                  value={formData.penthouseConfig.penthouseBalcony}
                  onChange={handleChange}
                  error={warnings.penthouseConfig?.penthouseBalcony}
                />
                <InputField
                  label="Penthouse Parking"
                  section="penthouseConfig"
                  field="penthouseParking"
                  value={formData.penthouseConfig.penthouseParking}
                  onChange={handleChange}
                  error={warnings.penthouseConfig?.penthouseParking}
                />

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="penthouseConfig"
                    field="penthouseFloorPlan"
                    label="Upload Penthouse Floorplan"
                    limit={1}
                  />
                  {formData?.penthouseConfig?.penthouseFloorPlan?.length >
                    0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.penthouseConfig.penthouseFloorPlan.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <ImageUpload
                    handleChange={handleChange}
                    section="penthouseConfig"
                    field="penthouseImages"
                    label="Upload Penthouse Images"
                    limit={1}
                  />
                  {formData?.penthouseConfig?.penthouseImages?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                        {formData.penthouseConfig.penthouseImages.map(
                          (file, index) => (
                            <li key={index}>{file.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="col-span-2 md-3">
                  <CheckBox
                    label="Do you want to add another configuration for the Penthouse?"
                    section="penthouseConfig"
                    field="enableconfig"
                    checked={formData.penthouseConfig.enableconfig}
                    onChange={handleChange}
                    error={warnings.penthouseConfig?.enableconfig}
                  />
                </div>

                {formData.penthouseConfig.enableconfig && (
                  <>
                   
                  {/* Penthouse Type 2 Units */}
<InputField
  label="Penthouse Type 2 Units"
  section="penthouseConfig"
  field="penthouseUnits2"
  value={formData.penthouseConfig.penthouseUnits2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.penthouseUnits2}
/>

{/* Penthouse Type 2 Area */}
<InputField
  label="Penthouse Type 2 Area"
  section="penthouseConfig"
  field="penthouseArea2"
  value={formData.penthouseConfig.penthouseArea2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.penthouseArea2}
/>

{/* Penthouse Type 2 Bathrooms */}
<InputField
  label="Penthouse Type 2 Bathrooms"
  section="penthouseConfig"
  field="penthouseBathrooms2"
  value={formData.penthouseConfig.penthouseBathrooms2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.penthouseBathrooms2}
/>

{/* Penthouse Type 2 Balcony */}
<InputField
  label="Penthouse Type 2 Balcony"
  section="penthouseConfig"
  field="penthouseBalcony2"
  value={formData.penthouseConfig.penthouseBalcony2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.penthouseBalcony2}
/>

{/* Penthouse Type 2 Parking */}
<InputField
  label="Penthouse Type 2 Parking"
  section="penthouseConfig"
  field="penthouseParking2"
  value={formData.penthouseConfig.penthouseParking2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.penthouseParking2}
/>

{/* Penthouse Type 2 Hall Area */}
<InputField
  label="Penthouse Type 2 Hall Area"
  section="penthouseConfig"
  field="hallArea2"
  value={formData.penthouseConfig.hallArea2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.hallArea2}
/>

{/* Penthouse Type 2 Kitchen Area */}
<InputField
  label="Penthouse Type 2 Kitchen Area"
  section="penthouseConfig"
  field="kitchenArea2"
  value={formData.penthouseConfig.kitchenArea2}
  onChange={handleChange}
  error={warnings.penthouseConfig?.kitchenArea2}
/>

{/* Penthouse Type 2 Bedrooms */}
{Array.from({ length: 6 }, (_, i) => (
  <InputField
    key={i}
    label={`Penthouse Type 2 Bedroom ${i + 1} Area`}
    section="penthouseConfig"
    field={`bedroom${i + 1}Area2`}
    value={formData.penthouseConfig[`bedroom${i + 1}Area2`]}
    onChange={handleChange}
    error={warnings.penthouseConfig?.[`bedroom${i + 1}Area2`]}
  />
))}

{/* Penthouse Type 2 Bathrooms */}
{Array.from({ length: 6 }, (_, i) => (
  <InputField
    key={i}
    label={`Penthouse Type 2 Bathroom ${i + 1} Area`}
    section="penthouseConfig"
    field={`bathroom${i + 1}Area2`}
    value={formData.penthouseConfig[`bathroom${i + 1}Area2`]}
    onChange={handleChange}
    error={warnings.penthouseConfig?.[`bathroom${i + 1}Area2`]}
  />
))}

{/* Penthouse Type 2 Floorplan */}
<div>
  <ImageUpload
    handleChange={handleChange}
    section="penthouseConfig"
    field="penthouseFloorPlan2"
    label="Upload Penthouse Type 2 Floorplan"
    limit={5}
  />
  {formData.penthouseConfig.penthouseFloorPlan2.length > 0 && (
    <div>
      <h3>Uploaded Floorplans:</h3>
      <ul>
        {formData.penthouseConfig.penthouseFloorPlan2.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
</div>

{/* Penthouse Type 2 Images */}
<div>
  <ImageUpload
    handleChange={handleChange}
    section="penthouseConfig"
    field="penthouseImages2"
    label="Upload Penthouse Type 2 Images"
    limit={5}
  />
  {formData.penthouseConfig.penthouseImages2.length > 0 && (
    <div>
      <h3>Uploaded Images:</h3>
      <ul>
        {formData.penthouseConfig.penthouseImages2.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
</div>

                  </>
                )}
              </>
            </div>
          )}

          {/* Display Cached Data on the Last Stage */}
          {stage === 9 && (
            <div className="mt-4">
              <Typography variant="h6">Review Your Data:</Typography>
              <div className="flex flex-col">
                <Typography variant="subtitle1" className="text-white">
                  Organization:
                </Typography>
                <Typography className="text-white">
                  Organization Name:{" "}
                  {cachedData.organization.orgName || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Organization CIN:{" "}
                  {cachedData.organization.orgCIN || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Organization Owners:{" "}
                  {cachedData.organization.orgOwners || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  Project:
                </Typography>
                <Typography className="text-white">
                  Project Name:{" "}
                  {cachedData.project.projectname || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  City: {cachedData.project.city || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  Project Details:
                </Typography>
                <Typography className="text-white">
                  Units: {cachedData.projectDetails.units || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Project Status:{" "}
                  {cachedData.projectDetails.projectstatus || "Not Provided"}
                </Typography>
                <Typography className="text-white">
                  Project Launch date:{" "}
                  {cachedData.projectDetails.projectlaunch || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  One BHK Config:
                </Typography>
                <Typography className="text-white">
                  Type 1 Units:{" "}
                  {cachedData.oneBHKConfig.type1Units || "Not Provided"}
                </Typography>
                <Typography variant="subtitle1" className="text-white">
                  Two twoBHKConfig
                </Typography>
                <Typography className="text-white">
                  two bhk Config:{" "}
                  {cachedData.twoBHKConfig.type2Units || "Not Provided"}
                </Typography>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={prevStage}
            disabled={stage === 0}
            sx={{
              color: "yellow", // Set text color to yellow
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
                  color: "yellow", // Set text color to yellow
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
              onClick={() => console.log("Form Submitted", formData)}
              sx={{
                color: "yellow", // Set text color to yellow
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
      </Container>{" "}
    </div>
  );
};

export default MultiStageForm;
