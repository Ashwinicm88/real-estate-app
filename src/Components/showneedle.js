// import React from "react";
// import PriceMeter from "./PriceMeter";

// function App() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <PriceMeter currentPrice={10.91} minPrice={10.19} maxPrice={11.32} />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
import InputField from "./InputField"; // Ensure this path is correct
import DropdownField from "./DropdownField"; // Ensure this path is correct
import Navbar from "./Navbar";

// Step Titles
const initialSteps = [
  "Organization",
  "Project",
  "Project Details",
  "One BHK Config",
  "New Stage Input",
  "Review Data",
];

// Validation Schema
const validationSchema = yup.object({
  organization: yup.object({
    orgName: yup.string().required("Organization name is required").max(100).matches(/^[a-zA-Z\s]+$/, "Unsupported characters"),
    orgCIN: yup.string().required("CIN is required").max(21).matches(/^[a-zA-Z0-9]+$/, "CIN must contain only letters and numbers"),
    orgOwners: yup.string().required("Owner name is required").matches(/^[a-zA-Z\s]+$/, "Owner Name must contain only letters"),
    projectsCompleted: yup.number().min(0).max(999).typeError("Projects Completed must be a number"),
  }),
  project: yup.object({
    projectname: yup.string().required("Project Name is required").max(100).matches(/^[a-zA-Z\s]+$/, "Unsupported characters"),
    city: yup.string().required("City is required"),
    locality: yup.string().required("Locality is required"),
    address: yup.string().required("Address is required"),
    latitude: yup.number().required("Latitude is required").typeError("Latitude must be a number"),
    longitude: yup.number().required("Longitude is required"),
    area: yup.number().required("Area is required").max(999).typeError("Area must be a number"),
  }),
  projectDetails: yup.object({
    units: yup.number().required("Units is required").min(0).typeError("Units must be a number"),
    projectstatus: yup.string().required("Project Status is required"),
    projectlaunch: yup.date().required("Project Launch Date is required"),
    projectplanedend: yup.date().required("Project Planned End Date is required"),
    pricemin: yup.number().required("Price Min is required").min(0).typeError("Price Min must be a number"),
    pricemax: yup.number().required("Price Max is required").min(0).typeError("Price Max must be a number"),
    amenities: yup.string().required("Amenities is required"),
  }),
  oneBHKConfig: yup.object({
    type1Units: yup.string().required("Type 1 Units is required"),
    type1area: yup.number().required("Type 1 Area is required").min(0).typeError("Type 1 Area must be a number"),
    type1bathrooms: yup.number().required("Type 1 Bathrooms is required").min(0).typeError("Type 1 Bathrooms must be a number"),
  }),
  newStage: yup.object({
    newStageInput: yup.number().required("Units is required").min(0).typeError("Units must be a number"),
  }),
});

const MultiStageForm = () => {
  const [stage, setStage] = useState(0);
  const [cachedData, setCachedData] = useState({
    organization: {},
    project: {},
    projectDetails: {},
    oneBHKConfig: {},
    newStage: {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const nextStage = async (data) => {
    // Save current stage data to cache
    if (stage === 0) {
      setCachedData((prev) => ({ ...prev, organization: data.organization }));
    } else if (stage === 1) {
      setCachedData((prev) => ({ ...prev, project: data.project }));
    } else if (stage === 2) {
      setCachedData((prev) => ({ ...prev, projectDetails: data.projectDetails }));
    } else if (stage === 3) {
      setCachedData((prev) => ({ ...prev, oneBHKConfig: data.oneBHKConfig }));
    } else if (stage === 4) {
      setCachedData((prev) => ({ ...prev, newStage: data.newStage }));
    }

    // Move to the next stage
    if (stage < initialSteps.length - 1) {
      setStage(stage + 1);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    if (isValid) {
      handleSubmit(nextStage)(); // Call nextStage if valid
    } else {
      // If validation fails, you can log the errors or handle them as needed
      console.log(errors);
    }
  };

  const prevStage = () => {
    if (stage > 0) setStage(stage - 1);
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" className="bg-black p-4 rounded-lg text-white">
        <LinearProgress
          variant="determinate"
          value={((stage + 1) / initialSteps.length) * 100}
          className="mb-4"
        />

        <div className="flex justify-between items-center mb-6">
          <Typography variant="h6" className="text-white">
            {initialSteps[stage]}
          </Typography>
        </div>

        <form onSubmit={handleSubmit(nextStage)}>
          <div className="w-full">
            {stage === 0 && (
              <div className="flex flex-col gap-1 w-2/4">
                <Controller
                  name="organization.orgName"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Organization Name"
                      {...field} // Spread field to get value and onChange
                      error={errors.organization?.orgName?.message}
                    />
                  )}
                />
                <Controller
                  name="organization.orgCIN"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Organization CIN"
                      {...field}
                      error={errors.organization?.orgCIN?.message}
                    />
                  )}
                />
                <Controller
                  name="organization.orgOwners"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Organization Owners"
                      {...field}
                      error={errors.organization?.orgOwners?.message}
                    />
                  )}
                />
                <Controller
                  name="organization.projectsCompleted"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Projects Completed"
                      {...field}
                      error={errors.organization?.projectsCompleted?.message}
                    />
                  )}
                />
              </div>
            )}

            {stage === 1 && (
              <div className="grid grid-cols-2 gap-1 items-center ">
                <Controller
                  name="project.projectname"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Project Name"
                      {...field}
                      error={errors.project?.projectname?.message}
                    />
                  )}
                />
                <Controller
                  name="project.city"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="City"
                      {...field}
                      error={errors.project?.city?.message}
                    />
                  )}
                />
                <Controller
                  name="project.locality"
                  control={control}
                  render={({ field }) => (
                    <DropdownField
                      label="Enter Locality"
                      {...field}
                      error={errors.project?.locality?.message}
                      options={[
                        { label: "Hadapsar", value: "hadapsar" },
                        { label: "Kothrud", value: "kothrud" },
                        { label: "Airoli", value: "airoli" },
                      ]}
                    />
                  )}
                />
                <Controller
                  name="project.address"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Address"
                      {...field}
                      error={errors.project?.address?.message}
                    />
                  )}
                />
                <Controller
                  name="project.latitude"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Latitude"
                      {...field}
                      error={errors.project?.latitude?.message}
                    />
                  )}
                />
                <Controller
                  name="project.longitude"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Longitude"
                      {...field}
                      error={errors.project?.longitude?.message}
                    />
                  )}
                />
                <Controller
                  name="project.area"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Area in sqft"
                      {...field}
                      error={errors.project?.area?.message}
                    />
                  )}
                />
              </div>
            )}

            {stage === 2 && (
              <div className="grid grid-cols-2 gap-1 items-center mb-1">
                <Controller
                  name="projectDetails.units"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Units"
                      {...field}
                      error={errors.projectDetails?.units?.message}
                    />
                  )}
                />
                <Controller
                  name="projectDetails.projectstatus"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Project Status"
                      {...field}
                      error={errors.projectDetails?.projectstatus?.message}
                    />
                  )}
                />
                <Controller
                  name="projectDetails.projectlaunch"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Project Launch"
                      {...field}
                      error={errors.projectDetails?.projectlaunch?.message}
                    />
                  )}
                />
                <Controller
                  name="projectDetails.projectplanedend"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Project Planned End"
                      {...field}
                      error={errors.projectDetails?.projectplanedend?.message}
                    />
                  )}
                />
                <Controller
                  name="projectDetails.pricemin"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Price Min"
                      {...field}
                      error={errors.projectDetails?.pricemin?.message}
                    />
                  )}
                />
                <Controller
                  name="projectDetails.pricemax"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Price Max"
                      {...field}
                      error={errors.projectDetails?.pricemax?.message}
                    />
                  )}
                />
                <Controller
                  name="projectDetails.amenities"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="Amenities"
                      {...field}
                      error={errors.projectDetails?.amenities?.message}
                    />
                  )}
                />
              </div>
            )}

            {stage === 3 && (
              <div className="grid grid-cols-2 gap-5 items-center mb-1">
                <Controller
                  name="oneBHKConfig.type1Units"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="1 BHK Type 1 Units"
                      {...field}
                      error={errors.oneBHKConfig?.type1Units?.message}
                    />
                  )}
                />
                <Controller
                  name="oneBHKConfig.type1area"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="1 BHK Type Area"
                      {...field}
                      error={errors.oneBHKConfig?.type1area?.message}
                    />
                  )}
                />
                <Controller
                  name="oneBHKConfig.type1bathrooms"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="1 BHK Type Bathrooms"
                      {...field}
                      error={errors.oneBHKConfig?.type1bathrooms?.message}
                    />
                  )}
                />
              </div>
            )}

            {stage === 4 && (
              <div>
                <Controller
                  name="newStage.newStageInput"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="New Stage Input"
                      {...field}
                      error={errors.newStage?.newStageInput?.message}
                    />
                  )}
                />
              </div>
            )}

            {stage === 5 && (
              <div className="mt-4">
                <Typography variant="h6">Review Your Data:</Typography>
                <div className="flex flex-col">
                  <Typography variant="subtitle1" className="text-white">
                    Organization:
                  </Typography>
                  <Typography className="text-white">
                    Organization Name: {cachedData.organization.orgName || "Not Provided"}
                  </Typography>
                  <Typography className="text-white">
                    Organization CIN: {cachedData.organization.orgCIN || "Not Provided"}
                  </Typography>
                  <Typography className="text-white">
                    Organization Owners: {cachedData.organization.orgOwners || "Not Provided"}
                  </Typography>
                  <Typography variant="subtitle1" className="text-white">
                    Project:
                  </Typography>
                  <Typography className="text-white">
                    Project Name: {cachedData.project.projectname || "Not Provided"}
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
                    Project Status: {cachedData.projectDetails.projectstatus || "Not Provided"}
                  </Typography>
                  <Typography variant="subtitle1" className="text-white">
                    One BHK Config:
                  </Typography>
                  <Typography className="text-white">
                    Type 1 Units: {cachedData.oneBHKConfig.type1Units || "Not Provided"}
                  </Typography>
                  <Typography variant="subtitle1" className="text-white">
                    New Stage Input:
                  </Typography>
                  <Typography className="text-white">
                    New Stage Input: {cachedData.newStage.newStageInput || "Not Provided"}
                  </Typography>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={prevStage} disabled={stage === 0}>
              Back
            </Button>
            <Button type="button" onClick={handleNext}>
              {stage < initialSteps.length - 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default MultiStageForm;