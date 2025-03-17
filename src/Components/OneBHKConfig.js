import React, { useState } from "react";
import { Button, LinearProgress, Container, Typography } from "@mui/material";
import OneBHKConfig from "./1BHKConfig";
import TwoBHKConfig from "./twoBHKConfig";

const MultiStageForm = () => {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({
    oneBHKConfigs: [
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
          },
    ],
    twoBHKConfigs: [
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
        },
      ],
  });

  // Handle nested updates using section, field, and index
  const handleConfigChange = (section, field, value, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Add a new configuration dynamically
  const addConfig = (configType) => {
    setFormData((prev) => ({
      ...prev,
      [configType]: [
        ...prev[configType],
        {
          typeNumber: prev[configType].length + 1,
          type1Units: "",
          type1Area: "",
          type1BedroomArea: "",
        },
      ],
    }));
  };

  const stages = [
    {
      title: "1 BHK Configuration",
      component: (
        <div>
          {formData.oneBHKConfigs.map((config, index) => (
            <OneBHKConfig
              key={index}
              config={config}
              index={index}
              onChange={handleConfigChange}
            />
          ))}
          <Button onClick={() => addConfig("oneBHKConfigs")}>
            Add Another 1 BHK Type
          </Button>
        </div>
      ),
    },
    {
      title: "2 BHK Configuration",
      component: (
        <div>
          {formData.twoBHKConfigs.map((config, index) => (
            <TwoBHKConfig
              key={index}
              config={config}
              index={index}
              onChange={handleConfigChange}
            />
          ))}
          <Button onClick={() => addConfig("twoBHKConfigs")}>
            Add Another 2 BHK Type
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    console.log("🚀 Final Form Data:", formData);
  };

  return (
    <Container maxWidth="md">
      <LinearProgress
        variant="determinate"
        value={(stage / (stages.length - 1)) * 100}
      />

      <Typography variant="h4" gutterBottom>
        {stages[stage].title}
      </Typography>

      {stages[stage].component}

      <div style={{ marginTop: "2rem" }}>
        {stage > 0 && (
          <Button variant="contained" onClick={() => setStage(stage - 1)}>
            Previous
          </Button>
        )}
        {stage < stages.length - 1 ? (
          <Button variant="contained" onClick={() => setStage(stage + 1)}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </Container>
  );
};

export default MultiStageForm;
