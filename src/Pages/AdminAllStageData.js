import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { useParams } from 'react-router-dom';


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
import Header from "../Components/Header";
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
    orgCin: yup
      .string()
      .max(21, "CIN cannot exceed 21 characters")
      .matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
    orgOwners: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    projectCompleted: yup
      .number()
      .required("Projects Completed is required")
      .typeError("Projects Completed must be a number")
      .min(0, "Projects completed cannot be negative")
      .max(999, "Projects completed cannot exceed 999"),
  }),
  project: yup
    .object({
      projectName: yup
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
      propertyAreaSqmt: yup
        .number()
        .required("propertyAreaSqmt is required")
        .typeError("propertyAreaSqmt must be a number")
        .max(999, "propertyAreaSqmt cannot exceed 3 digits"),
      reraNumber: yup
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
    swimmingPool: yup.string().typeError("Please enter in letters"),
    temple: yup.string(),
    gym: yup.string().typeError("Please enter in letters"),
    creche: yup.string(),
    childrenParks: yup.string(),
    park: yup.string(),
    clubHouse: yup.string(),
    chall: yup.string(),
    other: yup.string(),
  }),
  Nearby: yup.object({
    schools: yup.string(),
    hospitals: yup.string(),
    it_parks: yup.string(),
    hangouts: yup.string(),
    cinemas: yup.string(),
    metro: yup.string(),
  }),
  expertReview: yup.object({
    reviewText: yup.string(),
  }),
  projectDetails: yup.object({
    units: yup
      .number()
      .required("Units is required")
      .typeError("Units must be a number")
      .min(0, "Units cannot be negative"),
    projectStatus: yup
      .string()
      .required("Project Status is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    projectLaunch: yup.date().required("Project Launch Date is required"),
    projectPlannedEnd: yup
      .date()
      .required("Project Planned End Date is required"),
    priceMin: yup
      .number()
      .required("Price Min is required")
      .typeError("Price Min must be a number")
      .min(0, "Price Min cannot be negative"),

    priceMax: yup
      .number()
      .typeError("Price Max must be a number")
      .min(0, "Price Max cannot be negative")
      .required("Price Max is required"),
    allInclusive: yup.boolean().required("All Inclusive is required"),
    coveredParking: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Organization name contains unsupported characters"
      ),
    bankApproved: yup.boolean().oneOf([true], "You must accept the terms."),

    banks: yup
      .string()
      .typeError("Banks must be a string")
      .matches(
        /^[A-Za-z\s]+(,[A-Za-z\s]+)*$/,
        "Bank contains unsupported characters"
      ),
    // bhk1: yup.boolean(),
  }),
  oneBHKConfig: yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("typeNumber is required").typeError("please dispaly"),
      type1Units: yup.number().required("type1Units is required"),
      type1propertyAreaSqmt: yup.number().required("type1propertyAreaSqmt is required"),
      type1floorplan: yup.array().of(yup.string()).required("type1floorplan is required"),
      type1images: yup.array().of(yup.string()).required("type1images is required"),
      type1BedroompropertyAreaSqmt: yup.string().required("type1BedroompropertyAreaSqmt is required"),
      type1HallpropertyAreaSqmt: yup.string().required("type1HallpropertyAreaSqmt is required"),
      type1KitchenpropertyAreaSqmt: yup.string().required("type1KitchenpropertyAreaSqmt is required"),
      type1bathrooms: yup.number().required("type1bathrooms is required"),
      type1bathroom1: yup.string().required("type1bathroom1 is required"),
      type1bathroom2: yup.string().nullable(), // Optional field
      type1balcony: yup.number().required("type1balcony is required"),
      type1parking: yup.number().required("type1parking is required"),
      enableconfig: yup.boolean().required("enableconfig is required"),
    })
  ),
  twoBHKConfig: yup.array().of(
    yup.object().shape({
      typeNumber: yup.number().required("Type Number is required"),
      type2Units: yup.number().required("Type 2 Units is required").min(0, "Type 2 Units cannot be negative"),
      type2propertyAreaSqmt: yup.number().required("Type 2 propertyAreaSqmt is required").min(0, "Type 2 propertyAreaSqmt cannot be negative"),
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
      type3propertyAreaSqmt: yup.number().required("Type 3 propertyAreaSqmt is required").min(0, "Type 3 propertyAreaSqmt cannot be negative"),
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
      type4propertyAreaSqmt: yup.number().required("Type 4 propertyAreaSqmt is required").min(0, "Type 4 propertyAreaSqmt cannot be negative"),
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
      type5propertyAreaSqmt: yup.number().required("Type 5 propertyAreaSqmt is required").min(0, "Type 5 propertyAreaSqmt cannot be negative"),
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

    penthousepropertyAreaSqmt: yup
      .number()
      .typeError("Penthouse propertyAreaSqmt must be a number")
      .required("Penthouse propertyAreaSqmt is required")
      .positive("Penthouse propertyAreaSqmt must be positive"),

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

    hallpropertyAreaSqmt: yup
      .number()
      .typeError("Hall propertyAreaSqmt must be a number")
      .required("Hall propertyAreaSqmt is required")
      .positive("Hall propertyAreaSqmt must be positive"),

    kitchenpropertyAreaSqmt: yup
      .number()
      .typeError("Kitchen propertyAreaSqmt must be a number")
      .required("Kitchen propertyAreaSqmt is required")
      .positive("Kitchen propertyAreaSqmt must be positive"),

    // Dynamic bedroom propertyAreaSqmts (bedroom1propertyAreaSqmt to bedroom6propertyAreaSqmt)
    ...Array.from({ length: 6 }, (_, i) => i + 1).reduce((acc, num) => {
      acc[`bedroom${num}propertyAreaSqmt`] = yup
        .number()
        .typeError(`Bedroom ${num} propertyAreaSqmt must be a number`)
        .required(`Bedroom ${num} propertyAreaSqmt is required`)
        .positive(`Bedroom ${num} propertyAreaSqmt must be positive`);
      return acc;
    }, {}),

    // Dynamic bathroom propertyAreaSqmts (bathroom1propertyAreaSqmt to bathroom6propertyAreaSqmt)
    ...Array.from({ length: 6 }, (_, i) => i + 1).reduce((acc, num) => {
      acc[`bathroom${num}propertyAreaSqmt`] = yup
        .number()
        .typeError(`Bathroom ${num} propertyAreaSqmt must be a number`)
        .required(`Bathroom ${num} propertyAreaSqmt is required`)
        .positive(`Bathroom ${num} propertyAreaSqmt must be positive`);
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
      orgCin: "",
      orgOwners: "",
      projectCompleted: "",
    },

    project: {
      projectName: "",
      city: "Pune",
      locality: "",
      TypeofProperty: "",
      address: "",
      latitude: "",
      longitude: "",
      propertyAreaSqmt: "",
      reraNumber: "",
      reralink: "",
      projectvideolink: "",
      projectimages: "",
      Images: [],
      Videos: [],
    },
    Amenities: {
      swimmingPool: "",
      temple: "",
      gym: "",
      creche: "",
      childrenParks: "",
      park: "",
      clubHouse: "",
      chall: "",
      other: "",
    },
    Nearby: {
      schools: "",
      hospitals: "",
      it_parks: "",
      hangouts: "",
      cinemas: "",
      metro: "",
    },
    expertReview: {
      reviewText: "",
    },
    projectDetails: {
      units: "",
      allInclusive: false,
      projectStatus: "",
      projectLaunch: null,
      projectPlannedEnd: null,
      priceMin: "",
      priceMax: "",
      coveredParking: "",
      bankApproved: false,
      banks: "",
      deleted: false,
    },
    oneBHKConfig: [
      {
        typeNumber: 1,
        type1Units: "",
        type1propertyAreaSqmt: "",
        type1floorplan: [],
        type1images: [],
        type1BedroompropertyAreaSqmt: "",
        type1HallpropertyAreaSqmt: "",
        type1KitchenpropertyAreaSqmt: "",
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
        type2propertyAreaSqmt: "",
        type2floorplan: [],
        type2images: [],
        type2Bedrooms: "",
        type2Bedroom1: "",
        type2Bedroom2: "",
        type2HallpropertyAreaSqmt: "",
        type2KitchenpropertyAreaSqmt: "",
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
        type3propertyAreaSqmt: "",
        type3floorplan: [],
        type3images: [],
        type3Bedroom1: "",
        type3Bedroom2: "",
        type3Bedroom3: "",
        type3Bedrooms: "",
        type3HallpropertyAreaSqmt: "",
        type3KitchenpropertyAreaSqmt: "",
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
        type4propertyAreaSqmt: "",
        type4floorplan: [],
        type4images: [],
        type4Bedrooms: "",
        type4Bedroom1: "",
        type4Bedroom2: "",
        type4Bedroom3: "",
        type4Bedroom4: "",
        type4HallpropertyAreaSqmt: "",
        type4KitchenpropertyAreaSqmt: "",
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
        type5propertyAreaSqmt: "",
        type5images: [],
        type5floorplan: [],
        type5Bedrooms: "",
        type5Bedroom1: "",
        type5Bedroom2: "",
        type5Bedroom3: "",
        type5Bedroom5: "",
        type5Bedroom4: "",
        type5HallpropertyAreaSqmt: "",
        type5KitchenpropertyAreaSqmt: "",
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
        penthousepropertyAreaSqmt: "",
        penthouseFloorPlan: [],
        penthouseBathrooms: "",
        penthouseBedrooms: "",
        penthouseBalcony: "",
        penthouseParking: "",
        penthouseImages: [],
        hallpropertyAreaSqmt: "",
        kitchenpropertyAreaSqmt: "",
        bedrooms: "",
        bedroom1propertyAreaSqmt: "",
        bedroom2propertyAreaSqmt: "",
        bedroom3propertyAreaSqmt: "",
        bedroom4propertyAreaSqmt: "",
        bedroom5propertyAreaSqmt: "",
        bedroom6propertyAreaSqmt: "",
        bathroom1propertyAreaSqmt: "",
        bathroom2propertyAreaSqmt: "",
        bathroom3propertyAreaSqmt: "",
        bathroom4propertyAreaSqmt: "",
        bathroom5propertyAreaSqmt: "",
        bathroom6propertyAreaSqmt: "",
        enableconfig: false,
      },
    ],
  });

  const [cachedData, setCachedData] = useState({
    organization: {},
    project: {},
    projectDetails: {},
    Amenities: {},
    Nearby: {},
    expertReview: {},
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
        0: ["organization.orgName", "organization.projectCompleted"],
        1: [
          "project.projectName",
          "project.city",
          "project.locality",
          "project.address",
          "project.latitude",
          "project.longitude",
          "project.propertyAreaSqmt",
        ],
        2: [
          "Amenities.swimmingPool",
          "Amenities.temple",
          "Amenities.gym",
          "Amenities.creche",
          "Amenities.childrenParks",
          "Amenities.park",
          "Amenities.clubHouse",
          "Amenities.chall",
          "Amenities.other",
        ], // Stage 2
        3: [
          "Nearby.schools",
          "Nearby.hospitals",
          "Nearby.it_parks",
          "Nearby.hangouts",
          "Nearby.cinemas",
          "Nearby.metro",
        ], // Stage 3
        5: [
          "projectDetails.units",
          "projectDetails.projectStatus",
          "projectDetails.projectLaunch",
          "projectDetails.projectPlannedEnd",
          "projectDetails.priceMin",
          "projectDetails.priceMax",
          "projectDetails.allInclusive",
          "projectDetails.coveredParking",
          "projectDetails.bankApproved",
          "projectDetails.banks",
        ], // Stage 4
        6: [
          "oneBHKConfig[].type1Units",
          "oneBHKConfig[].type1propertyAreaSqmt",
          "oneBHKConfig[].type1bathrooms",
        ], // Stage 5
        7: [
          "twoBHKConfig[].type2Units",
          "twoBHKConfig[].type2propertyAreaSqmt",
          "twoBHKConfig[].type2bathrooms",
          "twoBHKConfig[].type2balcony",
          "twoBHKConfig[].type2parking",
        ], // Stage 6
        8: [
          "threeBHKConfig[].type3Units",
          "threeBHKConfig[].type3propertyAreaSqmt",
          "threeBHKConfig[].type3bathrooms",
          "threeBHKConfig[].type3balcony",
          "threeBHKConfig[].type3parking",
        ], // Stage 7
        9: [
          "fourBHKConfig[].type4Units",
          "fourBHKConfig[].type4propertyAreaSqmt",
          "fourBHKConfig[].type4bathrooms",
          "fourBHKConfig[].type4balcony",
          "fourBHKConfig[].type4parking",
        ], // Stage 8
        10: [
          "fiveBHKConfig[].type5Units",
          "fiveBHKConfig[].type5propertyAreaSqmt",
          "fiveBHKConfig[].type5bathrooms",
          "fiveBHKConfig[].type5balcony",
          "fiveBHKConfig[].type5parking",
        ], // Stage 9
        11: [
          "penthouseConfig.typePenthouseUnits",
          "penthouseConfig.typePenthousepropertyAreaSqmt",
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


      // Validate all fields
      // const validations = currentFields.flatMap((field) => {
      //   if (field.includes("[]")) {
      //     const [arrayName, property] = field.replace("[]", "").split(".");
      //     const arrayData = safeAccess(formData, arrayName) || [];

      //     return arrayData.map((item) =>
      //       validateField(arrayName, property, item?.[property], formData)
      //     );
      //   } else {
      //     const [section, key] = field.split(".");
      //     const value = safeAccess(formData, field);
      //     return [validateField(section, key, value, formData)];
      //   }
      // });
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
          4: "Nearby",
          5: "expertReview",
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
              Nearby: formData.Nearby,
            }));
            break;
          case 4:
            setCachedData((prev) => ({
              ...prev,
              expertReview: formData.expertReview, // Newly added stage
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


  const prevStage = () => {
    if (stage > 0) setStage(stage - 1);
  };
  // const [loading, setLoading] = useState(true);

  const { projectId } = useParams(); // gets the ID from URL
  // const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/${projectId}`);
        const data = await response.json();
        console.log('Fetched Project Data:', data);
        const parseAmenityStringArray = (amenityObj) => {
          const parsedAmenities = {};
          for (const key in amenityObj) {
            try {
              const parsedValue = JSON.parse(amenityObj[key]);
              parsedAmenities[key] = Array.isArray(parsedValue) ? parsedValue.join(', ') : parsedValue;
            } catch (e) {
              parsedAmenities[key] = amenityObj[key]; // fallback to original string
            }
          }
          return parsedAmenities;
        };
        
       // Function to parse nearby data
const parseNearbyStringArray = (nearbyObj) => {
  const parsedNearby = {};
  for (const key in nearbyObj) {
    try {
      const parsedValue = JSON.parse(nearbyObj[key]);
      parsedNearby[key] = Array.isArray(parsedValue) ? parsedValue.join(', ') : parsedValue;
    } catch (e) {
      parsedNearby[key] = nearbyObj[key]; // fallback if not JSON
    }
  }
  return parsedNearby;
};
        
        const cleanedAmenities = parseAmenityStringArray(data.amenities || {});

        const cleanedNearby = parseNearbyStringArray(data.nearby || {});

        const transformedOneBHK = data.oneBHKConfig?.map((config) => ({
          typeNumber: config.typeNumber,  
          type1Units: (config.type1Units),
          type1propertyAreaSqmt: (config.type1Area),
          type1BedroompropertyAreaSqmt: config.bedroom1Area,
          type1HallpropertyAreaSqmt: config.hallArea,
          type1KitchenpropertyAreaSqmt: config.kitchenArea,
          type1bathrooms: ( config.type1Bathrooms),
          type1bathroom1: config.bathroom1Area,
          type1bathroom2: config.bathroom2Area,
          type1balcony: (config.type1Balcony),
          type1parking: (config.type1Parking),
        }));

        const transformedTwoBHK = data.twoBHKConfig?.map((config) => ({
          typeNumber: config.typeNumber,
          type2Units: config.type2Units,
          type2propertyAreaSqmt: config.type2Area,
          type2floorplan: config.floorPlanUrls || [],
          type2images: config.imageUrls || [],
          type2Bedrooms: config.type2Bedrooms,
          type2Bedroom1: config.bedroom1Area,
          type2Bedroom2: config.bedroom2Area,
          type2HallpropertyAreaSqmt: config.hallArea,
          type2KitchenpropertyAreaSqmt: config.kitchenArea,
          type2bathrooms: config.type2Bathrooms,
          type2bathroom1: config.bathroom1Area,
          type2bathroom2: config.bathroom2Area,
          type2balcony: config.type2Balcony,
          type2parking: config.type2Parking,
          enableconfig: true,
        }));
        const transformedThreeBHK = data.threeBHKConfig?.map((config) => ({
          typeNumber: config.typeNumber,
          type3Units: config.type3Units,
          type3propertyAreaSqmt: config.type3Area,
          type3Bedrooms: config.type3Bedrooms,
          type3Bedroom1: config.bedroom1Area,
          type3Bedroom2: config.bedroom2Area,
          type3Bedroom3: config.bedroom3Area,
          type3HallpropertyAreaSqmt: config.hallArea,
          type3KitchenpropertyAreaSqmt: config.kitchenArea,
          type3bathrooms: config.type3Bathrooms,
          type3bathroom1: config.bathroom1Area,
          type3bathroom2: config.bathroom2Area,
          type3bathroom3: config.bathroom3Area,
          type3balcony: config.type3Balcony,
          type3parking: config.type3Parking,
          enableconfig: true,
        }));
        const transformedFourBHK = data.fourBHKConfig?.map((config) => ({
          typeNumber: config.typeNumber,
          type4Units: config.type4Units,
          type4propertyAreaSqmt: config.type4Area,
          type4Bedrooms: config.type4Bedrooms,
          type4Bedroom1: config.bedroom1Area,
          type4Bedroom2: config.bedroom2Area,
          type4Bedroom3: config.bedroom3Area,
          type4Bedroom4: config.bedroom4Area,
          type4HallpropertyAreaSqmt: config.hallArea,
          type4KitchenpropertyAreaSqmt: config.kitchenArea,
          type4bathrooms: config.type4Bathrooms,
          type4bathroom1: config.bathroom1Area,
          type4bathroom2: config.bathroom2Area,
          type4bathroom3: config.bathroom3Area,
          type4bathroom4: config.bathroom4Area,
          type4balcony: config.type4Balcony,
          type4parking: config.type4Parking,
          enableconfig: true,
        }));
        const transformedFiveBHK = data.fiveBHKConfig?.map((config) => ({
          typeNumber: config.typeNumber,
          type5Units: config.type5Units,
          type5propertyAreaSqmt: config.type5Area,
          type5Bedrooms: config.type5Bedrooms,
          type5Bedroom1: config.bedroom1Area,
          type5Bedroom2: config.bedroom2Area,
          type5Bedroom3: config.bedroom3Area,
          type5Bedroom4: config.bedroom4Area,
          type5Bedroom5: config.bedroom5Area,
          type5HallpropertyAreaSqmt: config.hallArea,
          type5KitchenpropertyAreaSqmt: config.kitchenArea,
          type5bathrooms: config.type5Bathrooms,
          type5bathroom1: config.bathroom1Area,
          type5bathroom2: config.bathroom2Area,
          type5bathroom3: config.bathroom3Area,
          type5bathroom4: config.bathroom4Area,
          type5bathroom5: config.bathroom5Area,
          type5balcony: config.type5Balcony,
          type5parking: config.type5Parking,
          enableconfig: true,
        }));
        const transformedPenthouse = data.penthouseConfig?.map((config) => ({
          typeNumber: config.typeNumber,
          penthouseUnits: config.penthouseUnits,
          penthousepropertyAreaSqmt: config.penthouseArea,
          penthouseBathrooms: config.penthouseBathrooms,
          penthouseBedrooms: config.penthouseBedrooms,
          penthouseBalcony: config.penthouseBalcony,
          penthouseParking: config.penthouseParking,
          hallpropertyAreaSqmt: config.hallArea,
          kitchenpropertyAreaSqmt: config.kitchenArea,
          bedrooms: config.totalBedrooms,
          bedroom1propertyAreaSqmt: config.bedroom1Area,
          bedroom2propertyAreaSqmt: config.bedroom2Area,
          bedroom3propertyAreaSqmt: config.bedroom3Area,
          bedroom4propertyAreaSqmt: config.bedroom4Area,
          bedroom5propertyAreaSqmt: config.bedroom5Area,
          bedroom6propertyAreaSqmt: config.bedroom6Area,
          bathroom1propertyAreaSqmt: config.bathroom1Area,
          bathroom2propertyAreaSqmt: config.bathroom2Area,
          bathroom3propertyAreaSqmt: config.bathroom3Area,
          bathroom4propertyAreaSqmt: config.bathroom4Area,
          bathroom5propertyAreaSqmt: config.bathroom5Area,
          bathroom6propertyAreaSqmt: config.bathroom6Area,
          enableconfig: true,
        }));
        



        // setformData(data);
        setFormData({
          ...data,
          Nearby: cleanedNearby,
          Amenities: cleanedAmenities,

          oneBHKConfig: transformedOneBHK,
          twoBHKConfig: transformedTwoBHK,
          threeBHKConfig: transformedThreeBHK,
          fourBHKConfig: transformedFourBHK,
          fiveBHKConfig: transformedFiveBHK,
          penthouseConfig: transformedPenthouse,
        })
        // Set checkbox states based on available configs
        setProceedToOneBHK(!!data.oneBHKConfig?.length);
        setProceedToTwoBHK(!!data.twoBHKConfig?.length);
        setProceedToThreeBHK(!!data.threeBHKConfig?.length);
        setProceedToFourBHK(!!data.fourBHKConfig?.length);
        setProceedToFiveBHK(!!data.fiveBHKConfig?.length);
        setProceedToPentHouse(!!data.penthouseConfig?.length); // If penthouse key exists
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  
  const handleUpdate = (section, field, value, index=null) => {
    console.log(`Updating ${section}.${field} to:`, value);
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value, // Updating the specific field in the section
      },
    }));
  };
  
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/admin/projects/${projectId}`,
  //       formData,
  //       {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true, // for session support
  //       }
  //     );

  //     alert('✅ Project updated successfully!');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('❌ Error updating project:', error);
  //     alert('Failed to update project.');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Constructing the payload
  const payload = {
    organisation: {
      orgName: formData.organization?.orgName || "",
      orgCin: formData.organization?.orgCin || "",
      orgOwners: formData.organization?.orgOwners || "",
      projectCompleted: Number(formData.organization?.projectCompleted) || 0,
    },
    // orgName: formData.organization?.orgName || "",
    // orgCIN: formData.organization?.orgCin || "",
    // orgOwners: formData.organization?.orgOwners || "",
    // projectCompleted: Number(formData.organization?.projectCompleted) || 0,

    // projectName: formData.project?.projectName || "",
    // city: formData.project?.city || "",
    // locality: formData.project?.locality || "",
    // address: formData.project?.address || "",
    // latitude: isNaN(parseFloat(formData.project?.latitude))
    //   ? null
    //   : parseFloat(formData.project?.latitude),
    // longitude: isNaN(parseFloat(formData.project?.longitude))
    //   ? null
    //   : parseFloat(formData.project?.longitude),
    // propertyAreaSqmt: isNaN(parseInt(formData.project?.area))
    //   ? null
    //   : parseInt(formData.project?.area),

    // reraNumber: formData.project?.reraNumber || "",
    // reraLink: formData.project?.reralink || "",
    // propertyType: formData.project?.TypeofProperty || "",
    project: {
      projectName: formData.project?.projectName || "",
      city: formData.project?.city || "",
      locality: formData.project?.locality || "",
      address: formData.project?.address || "",
      latitude: isNaN(parseFloat(formData.project?.latitude))
        ? null
        : parseFloat(formData.project?.latitude),
      longitude: isNaN(parseFloat(formData.project?.longitude))
        ? null
        : parseFloat(formData.project?.longitude),
      propertyAreaSqmt: isNaN(parseInt(formData.project?.area))
        ? null
        : parseInt(formData.project?.area),
      reraNumber: formData.project?.reraNumber || "",
      reraLink: formData.project?.reralink || "",
      propertyType: formData.project?.propertyType || "",
    },
    projectDetails :{
    units: Number(formData.projectDetails?.units) || 0,
    projectStatus: formData.projectDetails?.projectStatus || "",
    projectLaunch: formData.projectDetails?.projectLaunch || "",
    projectPlannedEnd: formData.projectDetails?.projectPlannedEnd || "",

    priceMin: isNaN(parseFloat(formData.projectDetails?.priceMin))
      ? null
      : parseFloat(formData.projectDetails?.priceMin),
    priceMax: isNaN(parseFloat(formData.projectDetails?.priceMax))
      ? null
      : parseFloat(formData.projectDetails?.priceMax),
    allInclusive: Boolean(formData.projectDetails?.allInclusive),
    coveredParking: formData.projectDetails?.coveredParking || "",
    bankApproved: Boolean(formData.projectDetails?.bankApproved || ""),
    banks: formData.projectDetails?.banks || "",
    },
    // amenities: formData.Amenities
    //   ? Object.fromEntries(
    //       Object.entries(formData.Amenities).map(([key, value]) => [
    //         key,
    //         Array.isArray(value) ? value : [value],
    //       ])
    //     )
    //   : {},
    amenities: {
      swimming_pool: [formData.Amenities?.swimmingPool || ""],
      temple: [formData.Amenities?.temple || ""],
      gym: [formData.Amenities?.gym || ""],
      creche: [formData.Amenities?.creche || ""],
      children_parks: [formData.Amenities?.childrenParks || ""],
      park: [formData.Amenities?.park || ""],
      club_house: [formData.Amenities?.clubHouse || ""],
      c_hall: [formData.Amenities?.chall || ""],
      other: [formData.Amenities?.other || ""],
    },

    // nearby: formData.NearbyPlaces
    //   ? Object.fromEntries(
    //       Object.entries(formData.NearbyPlaces).map(([key, value]) => [
    //         key,
    //         Array.isArray(value) ? value : [value],
    //       ])
    //     )
    //   : {},

    nearby: {
      schools: [formData.Nearby?.schools || ""],
      hospitals: [formData.Nearby?.hospitals || ""],
      it_parks: [formData.Nearby?.it_parks || ""],
      hangouts: [formData.Nearby?.hangouts || ""],
      cinemas: [formData.Nearby?.cinemas || ""],
      metro: [formData.Nearby?.metro || ""],
    },

    expertReview: formData.expertReview
      ? { reviewText: formData.expertReview.reviewText }
      : null,
    }
  

  // Add BHK Configs conditionally
  if (proceedToOneBHK && formData.oneBHKConfig?.length) {
    payload.oneBHKConfig = formData.oneBHKConfig.map((config) => ({
      typeNumber: config.typeNumber,
      type1Units: Number(config.type1Units) || null,
      type1Area: Number(config?.type1propertyAreaSqmt) || null,
      type1Bathrooms: Number(config.type1bathrooms) || 0,
      type1Balcony: Number(config.type1balcony) || 0,
      type1Parking: Number(config.type1parking) || 0,
      hallArea: config.type1HallpropertyAreaSqmt || "",
      kitchenArea: config.type1KitchenpropertyAreaSqmt || "",
      bedroom1Area: config.type1BedroompropertyAreaSqmt || "",
      bathroom1Area: config.type1bathroom1 || "",
      bathroom2Area: config.type1bathroom2 || "",
    }));
  }

  if (proceedToTwoBHK && formData.twoBHKConfig?.length) {
    payload.twoBHKConfig = formData.twoBHKConfig.map((config) => ({
      typeNumber: config.typeNumber,
      type2Units: Number(config.type2Units) || null,
      type2Area: Number(config?.type2propertyAreaSqmt) || null,
      type2Bedrooms: Number(config.type2Bedrooms) || 0,
      type2Bathrooms: Number(config.type2bathrooms) || 0,
      type2Balcony: Number(config.type2balcony) || 0,
      type2Parking: Number(config.type2parking) || 0,
      hallArea: config.type2HallpropertyAreaSqmt || "",
      kitchenArea: config.type2KitchenpropertyAreaSqmt || "",
      bedroom1Area: config.type2Bedroom1 || "",
      bedroom2Area: config.type2Bedroom2 || "",
      bathroom1Area: config.type2bathroom1 || "",
      bathroom2Area: config.type2bathroom2 || "",
    }));
  }

  if (proceedToThreeBHK && formData.threeBHKConfig?.length) {
    payload.threeBHKConfig = formData.threeBHKConfig.map((config) => ({
      typeNumber: config.typeNumber,
      type3Units: Number(config.type3Units) || null,
      type3Area: Number(config?.type3propertyAreaSqmt) || null,
      type3Bedrooms: Number(config?.type3Bedrooms) || 0,
      type3Bathrooms: Number(config.type3bathrooms) || 0,
      type3Balcony: Number(config.type3balcony) || 0,
      type3Parking: Number(config.type3parking) || 0,
      hallArea: config.type3HallpropertyAreaSqmt || "",
      kitchenArea: config.type3KitchenpropertyAreaSqmt || "",
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
      type4Units: Number(config.type4Units) || null,
      type4Area: Number(config?.type4propertyAreaSqmt) || null,
      type4Bedrooms: Number(config.type4Bedrooms) || 0,
      type4Bathrooms: Number(config.type4bathrooms) || 0,
      type4Balcony: Number(config.type4balcony) || 0,
      type4Parking: Number(config.type4parking) || 0,
      hallArea: config.type4HallpropertyAreaSqmt || "",
      kitchenArea: config.type4KitchenpropertyAreaSqmt || "",
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

  // Submit the data
  // console.log("Submitting project update:", { projectId, payload });
    // Log the data being submitted for debugging purposes
    console.log('Submitting project update:', { projectId, payload });

    try {
        // Make the PUT request to update the project
        const response = await axios.put(
            `http://localhost:8080/api/consultations/projects/${projectId}`, // Endpoint URL
            payload, // Data to be sent in the request body
            {
                headers: { 'Content-Type': 'application/json' }, // Specify content type
                withCredentials: true, // Include credentials (cookies) for session support
            }
        );

        // Notify the user of success
        alert('✅ Project updated successfully!');
        console.log('Response data:', response.data); // Log the response data for debugging
    } catch (error) {
        // Handle errors
        console.error('❌ Error updating project:', error); // Log the error for debugging
        alert('Failed to update project.'); // Notify the user of the failure
    }
    console.log("Fetched status:", formData.projectDetails?.projectStatus);

};
  
  if (loading) return <div className="text-white">Loading...</div>;
  if (!formData) return <div className="text-red-400">Project not found</div>;
  // const parseArrayString = (value) => {
  //   try {
  //     const parsed = JSON.parse(value);
  //     if (Array.isArray(parsed)) {
  //       return parsed.join(', ');
  //     }
  //     return value;
  //   } catch (e) {
  //     return value || '';
  //   }
  // };

  

  return (
    <div className="min-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[400px]">
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
                  value={formData.organization?.orgName || ''}
                  name="orgName"
                  onChange={handleUpdate}
                  error={warnings.Organization?.orgName}
                  type="text"
                  maxLength={100}
                />
                <InputField
                  label="Organization Cin"
                  section="organization"
                  field="orgCin"
                  name="orgCin"
                  type="text"
                  value={formData.organization?.orgCin || '' }
                  onChange={handleUpdate}
                  error={warnings.Organization?.orgCin}
                  maxLength={21}
                />
                <InputField
                  label="Organization Owners"
                  section="organization"
                  field="orgOwners"
                  value={formData.organization?.orgOwners || ''}
                  onChange={handleUpdate}
                  error={warnings.Organization?.orgOwners}
                />
                <InputField
                  label="Projects Completed"
                  section="organization"
                  field="projectCompleted"
                  value={formData.organization?.projectCompleted || ''}
                  onChange={handleUpdate}
                  error={warnings.Organization?.projectCompleted}
                />
              </div>
            )}

            {stage === 1 && (
              <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                <InputField
                  label="Project Name"
                  section="project"
                  field="projectName"
                  name="projectName"
                  value={formData.project?.projectName || '' }
                  onChange={handleUpdate}
                  error={warnings.project?.projectName}
                />
                <InputField
                  label="City"
                  section="project"
                  field="city"
                  name="city"
                  value={formData.project?.city || ''}
                  onChange={handleUpdate}
                  error={warnings.project?.city}
                />
                <DropdownField
                  label="Enter Locality"
                  section="project"
                  field="locality"
                  value={formData.project?.locality|| ''}
                  name="locality"
                  onChange={handleUpdate}
                  error={warnings.project?.locality}
                  options={[
                    { label: "Hadapsar", value: "hadapsar" },
                    { label: "Updated Locality", value: "Updated Locality" },
                    { label: "Kothrud", value: "kothrud" },
                    { label: "Airoli", value: "airoli" },
                  ]}
                />
                <DropdownField
                  label="Type of Property"
                  section="project"
                  field="propertyType"
                  value={formData.project?.propertyType ||''}
                  name="propertyType"
                  onChange={handleUpdate}
                  error={warnings.project?.TypeofProperty}
                  options={[
                    { label: "Apartment", value: "Apartment" },
                    { label: "Bunglow", value: "Bunglow" },
                    { label: "Row House", value: "Row House" },
                    { label: "Plot", value: "Plot" },
                    { label: "Commercial", value: "Commercial" },
                    { label: "Residential", value: "Residential" }
                  ]}
                />
                <InputField
                  label="Address"
                  section="project"
                  field="address"
                  name="address"
                  value={formData.project?.address || ''}
                  onChange={handleUpdate}
                  error={warnings.project?.address}
                />
                <InputField
                  label="Latitude"
                  section="project"
                  field="latitude"
                  name="latitude"
                  value={formData.project?.latitude || ''}
                  onChange={handleUpdate}
                  error={warnings.project?.latitude}
                />
                <InputField
                  label="Longitude"
                  section="project"
                  field="longitude"
                  name="longitude"
                  value={formData.project?.longitude || ''}
                  onChange={handleUpdate}
                  error={warnings.project?.longitude}
                />
                <InputField
                  label="propertyAreaSqmt in sqft"
                  section="project"
                  field="propertyAreaSqmt"
                  name="propertyAreaSqmt"
                  value={formData.project?.propertyAreaSqmt || ''}
                  onChange={handleUpdate}
                  error={warnings.project?.propertyAreaSqmt}
                />
                <InputField
                  label="Rera Number"
                  section="project"
                  field="reraNumber"
                  name="reraNumber"
                  value={formData.project?.reraNumber || ''}
                  onChange={handleUpdate}
                  error={warnings.project?.reraNumber}
                />
                <InputField
                  label="Rera Link"
                  section="project"
                  field="reralink"
                  value={formData.project?.reralink || ''}
                  name="reralink"
                  onChange={handleUpdate}
                  error={warnings.project?.reralink}
                />
                <div>
                  <ImageUpload
                    handleChange={handleUpdate}
                    section="project"
                    field="Images"
                    name="projectImages"
                    label="Upload project Images"
                    limit={1}
                  />

                  {/* {projectImages?.Images?.length > 0 && (
                    <div>
                      <h3>Uploaded Images:</h3>
                      <ul>
                         {projectImages.Images.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                       </ul> 
                     </div> 
                   )} */}
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
                  field="swimmingPool"
                  name="swimmingPool"
                  value={(formData.Amenities?.swimmingPool) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.swimmingPool}
                />

                <InputField
                  label="Temple"
                  section="Amenities"
                  field="temple"
                  name="temple"
                  value={(formData.Amenities?.temple) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.temple}
                />

                <InputField
                  label="Gym"
                  section="Amenities"
                  field="gym"
                  name="gym"
                  value={(formData.Amenities?.gym) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.gym}
                />

                <InputField
                  label="Creche"
                  section="Amenities"
                  field="creche"
                  name="creche"
                  value={(formData.Amenities?.creche) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.creche}
                />

                <InputField
                  label="Children Parks"
                  section="Amenities"
                  field="childrenParks"
                  name="childrenParks"
                  value={(formData.Amenities?.childrenParks) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.childrenParks}
                />

                <InputField
                  label="Park"
                  section="Amenities"
                  field="park"
                  name="park"
                  value={(formData.Amenities?.park) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.park}
                />

                <InputField
                  label="Club House"
                  section="Amenities"
                  field="clubHouse"
                  name="clubHouse"
                  value={(formData.Amenities?.clubHouse) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.clubHouse}
                />

                <InputField
                  label="Community Hall"
                  section="Amenities"
                  field="chall"
                  name="chall"
                  value={(formData.Amenities?.chall) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.chall}
                />

                <InputField
                  label="Other"
                  section="Amenities"
                  field="other"
                  name="other"
                  value={(formData.Amenities?.other) || ''}
                  onChange={handleUpdate}
                  error={warnings.Amenities?.other}
                />
              </div>
            )}
            {stage === 3 && (
              <div className="w-full max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 justify-between mx-auto">
                <InputField
                  label="Schools"
                  section="Nearby"
                  field="schools"
                  value={(formData.Nearby?.schools) || ''}
                  onChange={handleUpdate}
                  error={warnings.Nearby?.schools}
                />

                <InputField
                  label="Hospitals"
                  section="Nearby"
                  field="hospitals"
                  value={(formData.Nearby?.hospitals) || ''}
                  onChange={handleUpdate}
                  error={warnings.Nearby?.hospitals}
                />

                <InputField
                  label="IT Parks"
                  section="Nearby"
                  field="it_parks"
                value={(formData.Nearby?.it_parks) || ''}
                  onChange={handleUpdate}
                  error={warnings.Nearby?.it_parks}
                />

                <InputField
                  label="Hangouts"
                  section="Nearby"
                  field="hangouts"
                  value={(formData.Nearby?.hangouts) || ''}
                  onChange={handleUpdate}
                  error={warnings.Nearby?.hangouts}
                />

                <InputField
                  label="Cinemas"
                  section="Nearby"
                  field="cinemas"
                  value={(formData.Nearby?.cinemas) || ''}
                  onChange={handleUpdate}
                  error={warnings.Nearby?.cinemas}
                />

                <InputField
                  label="Metro"
                  section="Nearby"
                  field="metro"
                  value={(formData.Nearby?.metro) || ''}
                  onChange={handleUpdate}
                  error={warnings.Nearby?.metro}
                />
              </div>
            )}

            {stage === 4 && (
              <div className="max-w-3xl mx-auto bg-black rounded-2xl mt-4">
                {/* Text propertyAreaSqmt for Writing */}
                <div className="mb-4">
                  <TextArea
                    label="Write Review"
                    section="expertReview"
                    field="reviewText"
                    value={formData.expertReview?.reviewText || ''}
                    onChange={handleUpdate}
                    error={warnings.expertReview?.reviewText}
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
                  value={formData.projectDetails?.units}
                  onChange={handleChange}
                  error={warnings.projectDetails?.units}
                />
                {/* Project Launch Date Picker */}
                <DatePicker
                  label={"Project Launch Date"}
                  section="projectDetails"
                  // placeholder="Select Project Launch Date"
                  field="projectLaunch"
                  value={formData.projectDetails?.projectLaunch}
                  onChange={handleChange}
                  error={warnings.projectDetails?.projectLaunch}
                />
                <DatePicker
                  label={"Project Planned-end Date"}
                  section="projectDetails"
                  placeholder="Select Project Planned-end Date"
                  field="projectPlannedEnd"
                  value={formData.projectDetails?.projectPlannedEnd}
                  onChange={handleChange}
                  error={warnings.projectDetails?.projectPlannedEnd}
                />
                <InputField
                  label="Price Min"
                  section="projectDetails"
                  field="priceMin"
                  value={formData.projectDetails?.priceMin}
                  onChange={handleChange}
                  error={warnings.projectDetails?.priceMin}
                />
                <InputField
                  label="Price Max"
                  section="projectDetails"
                  field="priceMax"
                  value={formData.projectDetails?.priceMax}
                  onChange={handleChange}
                  error={warnings.projectDetails?.priceMax}
                />

                <DropdownField
                  label="Covered Parking"
                  section="projectDetails"
                  field="coveredParking"
                  value={formData.projectDetails?.coveredParking || ''}
                  onChange={handleUpdate}
                  error={warnings.projectDetails?.coveredParking}
                  options={[
                    { label: "Available", value: "Available" },
                    { label: "Not Available", value: "Not Available" },
                    { label: "Reserved", value: "Reserved" },
                    { label: "true", value: "true" },
                  ]}
                />
                <DropdownField
                  label="Project Status"
                  section="projectDetails"
                  field="projectStatus"
                  value={formData.projectDetails?.projectStatus || ''
                    
                  }
                  onChange={handleChange}
                  error={warnings.projectDetails?.projectStatus}
                  options={[
                    { label: "pre-development", value: "predevelopment" },
                    { label: "construction", value: "construction" },
                    { label: "closeout", value: "closeout" },
                    { label: "Ongoing", value: "Ongoing" }
                  ]}
                />
                <FormGroup className="p-1">
                  <CheckBox
                    label="All Inclusive"
                    section="projectDetails"
                    field="allInclusive"
                    checked={formData.projectDetails?.allInclusive}
                    onChange={handleChange}
                    error={warnings.projectDetails?.allInclusive}
                  />

                  <CheckBox
                    label="Bank Approved"
                    section="projectDetails"
                    field="bankApproved"
                    checked={formData.projectDetails?.bankApproved}
                    onChange={handleChange}
                    error={warnings.projectDetails?.bankApproved}
                  />
                  {/* Banks Input - Shown Only When Bank Approved is Checked */}
                  {formData.projectDetails.bankApproved && (
                    <InputField
                      label="Banks"
                      section="projectDetails"
                      field="banks"
                      value={formData.projectDetails?.banks}
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
              </div>
            )}

            {stage === 6 && (
              <div className="mb-1">
                <>
                {Array.isArray(formData.oneBHKConfig) &&
                  formData.oneBHKConfig.map((config, index) => (
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
                          error={warnings.oneBHKConfig?.[index]?.typeNumber || ''}
                          type="number"
                        />

                        <InputField
                          label="Units"
                          section={`oneBHKConfig[${index}]`}
                          field="type1Units"
                          value={config.type1Units}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1Units || ''}
                        />

                        <InputField
                          label="Total propertyAreaSqmt"
                          section={`oneBHKConfig[${index}]`}
                          field="type1propertyAreaSqmt"
                          value={config.type1propertyAreaSqmt}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1propertyAreaSqmt}
                        />

                        <InputField
                          label="Bedroom propertyAreaSqmt"
                          section={`oneBHKConfig[${index}]`}
                          field="type1BedroompropertyAreaSqmt"
                          value={config.type1BedroompropertyAreaSqmt}
                          onChange={handleChange}
                          error={
                            warnings.oneBHKConfig?.[index]?.type1BedroompropertyAreaSqmt
                          }
                        />

                        <InputField
                          label="Hall propertyAreaSqmt"
                          section={`oneBHKConfig[${index}]`}
                          field="type1HallpropertyAreaSqmt"
                          value={config.type1HallpropertyAreaSqmt}
                          onChange={handleChange}
                          error={warnings.oneBHKConfig?.[index]?.type1HallpropertyAreaSqmt}
                        />

                        <InputField
                          label="Kitchen propertyAreaSqmt"
                          section={`oneBHKConfig[${index}]`}
                          field="type1KitchenpropertyAreaSqmt"
                          value={config.type1KitchenpropertyAreaSqmt}
                          onChange={handleChange}
                          error={
                            warnings.oneBHKConfig?.[index]?.type1KitchenpropertyAreaSqmt
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
                            label={`Upload Floorplan Images for BHK ${index + 1
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
                                type1propertyAreaSqmt: "",
                                type1floorplan: [],
                                type1images: [],
                                type1BedroompropertyAreaSqmt: "",
                                type1HallpropertyAreaSqmt: "",
                                type1KitchenpropertyAreaSqmt: "",
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

                      {/* Type 2 propertyAreaSqmt */}
                      <InputField
                        label="Type 2 propertyAreaSqmt (sq ft)"
                        section={`twoBHKConfig[${index}]`}
                        field="type2propertyAreaSqmt"
                        value={config.type2propertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2propertyAreaSqmt}
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
                        label="Bedroom 1 propertyAreaSqmt"
                        section={`twoBHKConfig[${index}]`}
                        field="type2Bedroom1"
                        value={config.type2Bedroom1}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 propertyAreaSqmt"
                        section={`twoBHKConfig[${index}]`}
                        field="type2Bedroom2"
                        value={config.type2Bedroom2}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2Bedroom2}
                      />

                      {/* Hall propertyAreaSqmt */}
                      <InputField
                        label="Hall propertyAreaSqmt"
                        section={`twoBHKConfig[${index}]`}
                        field="type2HallpropertyAreaSqmt"
                        value={config.type2HallpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2HallpropertyAreaSqmt}
                      />

                      {/* Kitchen propertyAreaSqmt */}
                      <InputField
                        label="Kitchen propertyAreaSqmt"
                        section={`twoBHKConfig[${index}]`}
                        field="type2KitchenpropertyAreaSqmt"
                        value={config.type2KitchenpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.twoBHKConfig?.[index]?.type2KitchenpropertyAreaSqmt}
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
                              type2propertyAreaSqmt: "",
                              type2floorplan: [],
                              type2images: [],
                              type2Bedrooms: "",
                              type2Bedroom1: "",
                              type2Bedroom2: "",
                              type2HallpropertyAreaSqmt: "",
                              type2KitchenpropertyAreaSqmt: "",
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
                        label="propertyAreaSqmt"
                        field="type3propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        value={config.type3propertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3propertyAreaSqmt}
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
                        label="Bedroom 1 propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Bedroom1"
                        value={config.type3Bedroom1}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Bedroom2"
                        value={config.type3Bedroom2}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedroom2}
                      />

                      {/* Bedroom 3 */}
                      <InputField
                        label="Bedroom 3 propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3Bedroom3"
                        value={config.type3Bedroom3}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3Bedroom3}
                      />

                      {/* Hall propertyAreaSqmt */}
                      <InputField
                        label="Hall propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3HallpropertyAreaSqmt"
                        value={config.type3HallpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3HallpropertyAreaSqmt}
                      />

                      {/* Kitchen propertyAreaSqmt */}
                      <InputField
                        label="Kitchen propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3KitchenpropertyAreaSqmt"
                        value={config.type3KitchenpropertyAreaSqmt}
                        onChange={handleChange}
                        error={
                          warnings.threeBHKConfig?.[index]?.type3KitchenpropertyAreaSqmt
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
                        label="Bathroom 1 propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3bathroom1"
                        value={config.type3bathroom1}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 propertyAreaSqmt"
                        section={`threeBHKConfig[${index}]`}
                        field="type3bathroom2"
                        value={config.type3bathroom2}
                        onChange={handleChange}
                        error={warnings.threeBHKConfig?.[index]?.type3bathroom2}
                      />

                      {/* Bathroom 3 */}
                      <InputField
                        label="Bathroom 3 propertyAreaSqmt"
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
                                    type3propertyAreaSqmt: "",
                                    type3floorplan: [],
                                    type3images: [],
                                    type3Bedrooms: "",
                                    type3Bedroom1: "",
                                    type3Bedroom2: "",
                                    type3Bedroom3: "",
                                    type3HallpropertyAreaSqmt: "",
                                    type3KitchenpropertyAreaSqmt: "",
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

                      {/* Type 4 propertyAreaSqmt */}
                      <InputField
                        label="Type 4 propertyAreaSqmt (sq ft)"
                        section={`fourBHKConfig[${index}]`}
                        field="type4propertyAreaSqmt"
                        value={config.type4propertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4propertyAreaSqmt}
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
                        label="Bedroom 1 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom1"
                        value={config.type4Bedroom1}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom2"
                        value={config.type4Bedroom2}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom2}
                      />

                      {/* Bedroom 3 */}
                      <InputField
                        label="Bedroom 3 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom3"
                        value={config.type4Bedroom3}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom3}
                      />

                      {/* Bedroom 4 */}
                      <InputField
                        label="Bedroom 4 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4Bedroom4"
                        value={config.type4Bedroom4}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4Bedroom4}
                      />

                      {/* Hall propertyAreaSqmt */}
                      <InputField
                        label="Hall propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4HallpropertyAreaSqmt"
                        value={config.type4HallpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4HallpropertyAreaSqmt}
                      />

                      {/* Kitchen propertyAreaSqmt */}
                      <InputField
                        label="Kitchen propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4KitchenpropertyAreaSqmt"
                        value={config.type4KitchenpropertyAreaSqmt}
                        onChange={handleChange}
                        error={
                          warnings.fourBHKConfig?.[index]?.type4KitchenpropertyAreaSqmt
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
                        label="Bathroom 1 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom1"
                        value={config.type4bathroom1}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom2"
                        value={config.type4bathroom2}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom2}
                      />

                      {/* Bathroom 3 */}
                      <InputField
                        label="Bathroom 3 propertyAreaSqmt"
                        section={`fourBHKConfig[${index}]`}
                        field="type4bathroom3"
                        value={config.type4bathroom3}
                        onChange={handleChange}
                        error={warnings.fourBHKConfig?.[index]?.type4bathroom3}
                      />

                      {/* Bathroom 4 */}
                      <InputField
                        label="Bathroom 4 propertyAreaSqmt"
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
                                    typeNumber:
                                    (prev.fourBHKConfig?.length || 0) + 1,
                                    type4Units: "",
                                    type4propertyAreaSqmt: "",
                                    type4floorplan: [],
                                    type4images: [],
                                    type4Bedrooms: "",
                                    type4Bedroom1: "",
                                    type4Bedroom2: "",
                                    type4Bedroom3: "",
                                    type4Bedroom4: "",
                                    type4HallpropertyAreaSqmt: "",
                                    type4KitchenpropertyAreaSqmt: "",
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
                              // e.target.checked = false;
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

                      {/* Type 5 propertyAreaSqmt */}
                      <InputField
                        label="Type 5 propertyAreaSqmt (sq ft)"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5propertyAreaSqmt"
                        value={config.type5propertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5propertyAreaSqmt}
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
                        label="Bedroom 1 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom1"
                        value={config.type5Bedroom1}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom1}
                      />

                      {/* Bedroom 2 */}
                      <InputField
                        label="Bedroom 2 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom2"
                        value={config.type5Bedroom2}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom2}
                      />

                      {/* Bedroom 3 */}
                      <InputField
                        label="Bedroom 3 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom3"
                        value={config.type5Bedroom3}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom3}
                      />

                      {/* Bedroom 4 */}
                      <InputField
                        label="Bedroom 4 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom4"
                        value={config.type5Bedroom4}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom4}
                      />

                      {/* Bedroom 5 */}
                      <InputField
                        label="Bedroom 5 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5Bedroom5"
                        value={config.type5Bedroom5}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5Bedroom5}
                      />

                      {/* Hall propertyAreaSqmt */}
                      <InputField
                        label="Hall propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5HallpropertyAreaSqmt"
                        value={config.type5HallpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5HallpropertyAreaSqmt}
                      />

                      {/* Kitchen propertyAreaSqmt */}
                      <InputField
                        label="Kitchen propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5KitchenpropertyAreaSqmt"
                        value={config.type5KitchenpropertyAreaSqmt}
                        onChange={handleChange}
                        error={
                          warnings.fiveBHKConfig?.[index]?.type5KitchenpropertyAreaSqmt
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
                        label="Bathroom 1 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom1"
                        value={config.type5bathroom1}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom1}
                      />

                      {/* Bathroom 2 */}
                      <InputField
                        label="Bathroom 2 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom2"
                        value={config.type5bathroom2}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom2}
                      />

                      {/* Bathroom 3 */}
                      <InputField
                        label="Bathroom 3 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom3"
                        value={config.type5bathroom3}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom3}
                      />

                      {/* Bathroom 4 */}
                      <InputField
                        label="Bathroom 4 propertyAreaSqmt"
                        section={`fiveBHKConfig[${index}]`}
                        field="type5bathroom4"
                        value={config.type5bathroom4}
                        onChange={handleChange}
                        error={warnings.fiveBHKConfig?.[index]?.type5bathroom4}
                      />

                      {/* Bathroom 5 */}
                      <InputField
                        label="Bathroom 5 propertyAreaSqmt"
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
                                    type5propertyAreaSqmt: "",
                                    type5floorplan: [],
                                    type5images: [],
                                    type5Bedrooms: "",
                                    type5Bedroom1: "",
                                    type5Bedroom2: "",
                                    type5Bedroom3: "",
                                    type5Bedroom5: "",
                                    type5Bedroom4: "",
                                    type5HallpropertyAreaSqmt: "",
                                    type5KitchenpropertyAreaSqmt: "",
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

                      {/* Penthouse propertyAreaSqmt */}
                      <InputField
                        label="Penthouse propertyAreaSqmt (sq ft)"
                        section={`penthouseConfig[${index}]`}
                        field="penthousepropertyAreaSqmt"
                        value={config.penthousepropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.penthouseConfig?.[index]?.penthousepropertyAreaSqmt}
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

                      {/* Hall propertyAreaSqmt */}
                      <InputField
                        label="Hall propertyAreaSqmt"
                        section={`penthouseConfig[${index}]`}
                        field="hallpropertyAreaSqmt"
                        value={config.hallpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.penthouseConfig?.[index]?.hallpropertyAreaSqmt}
                      />

                      {/* Kitchen propertyAreaSqmt */}
                      <InputField
                        label="Kitchen propertyAreaSqmt"
                        section={`penthouseConfig[${index}]`}
                        field="kitchenpropertyAreaSqmt"
                        value={config.kitchenpropertyAreaSqmt}
                        onChange={handleChange}
                        error={warnings.penthouseConfig?.[index]?.kitchenpropertyAreaSqmt}
                      />

                      {/* Bedrooms */}
                      {[...Array(6).keys()].map((num) => (
                        <InputField
                          key={`bedroom${num + 1}`}
                          label={`Bedroom ${num + 1} propertyAreaSqmt`}
                          section={`penthouseConfig[${index}]`}
                          field={`bedroom${num + 1}propertyAreaSqmt`}
                          value={config[`bedroom${num + 1}prop
                            
                            ertyAreaSqmt`]}
                          onChange={handleChange}
                          error={
                            warnings.penthouseConfig?.[index]?.[
                            `bedroom${num + 1}propertyAreaSqmt`
                            ]
                          }
                        />
                      ))}

                      {/* Bathrooms */}
                      {[...Array(6).keys()].map((num) => (
                        <InputField
                          key={`bathroom${num + 1}`}
                          label={`Bathroom ${num + 1} propertyAreaSqmt`}
                          section={`penthouseConfig[${index}]`}
                          field={`bathroom${num + 1}propertyAreaSqmt`}
                          value={config[`bathroom${num + 1}propertyAreaSqmt`]}
                          onChange={handleChange}
                          error={
                            warnings.penthouseConfig?.[index]?.[
                            `bathroom${num + 1}propertyAreaSqmt`
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
                                    penthousepropertyAreaSqmt: "",
                                    penthouseBedrooms: "",
                                    penthouseFloorPlan: [],
                                    penthouseBathrooms: "",
                                    penthouseBalcony: "",
                                    penthouseParking: "",
                                    penthouseImages: [],
                                    hallpropertyAreaSqmt: "",
                                    kitchenpropertyAreaSqmt: "",
                                    ...Object.fromEntries(
                                      [...Array(6).keys()].map((num) => [
                                        `bedroom${num + 1}propertyAreaSqmt`,
                                        "",
                                      ])
                                    ),
                                    ...Object.fromEntries(
                                      [...Array(6).keys()].map((num) => [
                                        `bathroom${num + 1}propertyAreaSqmt`,
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
                                  {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value !== undefined && value !== null ? value : "Not Provided"
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
                            {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value !== undefined && value !== null ? value : "Not Provided"
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

         <div className={`mt-6 flex ${stage === 0 ? "justify-end pr-10" : "justify-center"} gap-4`}>
           {stage !== 0 && (
             <Button
               onClick={prevStage}
               disabled={stage === 0}
               sx={{
                 color: "#eab308",
                 backgroundColor: "transparent",
                 "&:hover": {
                   textDecoration: "underline",
                   backgroundColor: "transparent",
                 },
               }}
             >
               Back
             </Button>
           )}
         
           {stage < initialSteps.length - 1 ? (
             <Button
               onClick={nextStage}
               sx={{
                 color: "#eab308",
                 backgroundColor: "transparent",
                 "&:hover": {
                   textDecoration: "underline",
                   backgroundColor: "transparent",
                 },
               }}
             >
               Next
             </Button>
           ) : (
             <Button
               onClick={handleSubmit}
               sx={{
                 color: "#eab308",
                 backgroundColor: "transparent",
                 "&:hover": {
                   textDecoration: "underline",
                   backgroundColor: "transparent",
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
