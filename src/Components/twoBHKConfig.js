import InputF from "./InputF";

const TwoBHKConfig = ({ config, onChange, index }) => {
  // Helper function to handle InputF changes
  const handleChange = (section, field, value) => {
    onChange(section, field, value, index);
  };

  return (
    <div>
      <h3>2 BHK Type {config.typeNumber}</h3>

      <InputF
        label="2 BHK Units"
        section="twoBHKConfigs"
        field="type2Units"
        value={config.type2Units}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="2 BHK Area (sqft)"
        section="twoBHKConfigs"
        field="type2area"
        value={config.type2area}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Bedroom Count"
        section="twoBHKConfigs"
        field="type2Bedrooms"
        value={config.type2Bedrooms}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="2 BHK Bedroom 1 Area"
        section="twoBHKConfigs"
        field="type2Bedroom1"
        value={config.type2Bedroom1}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Bedroom 2 Area"
        section="twoBHKConfigs"
        field="type2Bedroom2"
        value={config.type2Bedroom2}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Hall Area"
        section="twoBHKConfigs"
        field="type2HallArea"
        value={config.type2HallArea}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Kitchen Area"
        section="twoBHKConfigs"
        field="type2KitchenArea"
        value={config.type2KitchenArea}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Total Bathrooms"
        section="twoBHKConfigs"
        field="type2bathrooms"
        value={config.type2bathrooms}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="2 BHK Bathroom 1 Area"
        section="twoBHKConfigs"
        field="type2bathroom1"
        value={config.type2bathroom1}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Bathroom 2 Area"
        section="twoBHKConfigs"
        field="type2bathroom2"
        value={config.type2bathroom2}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Balcony Area"
        section="twoBHKConfigs"
        field="type2balcony"
        value={config.type2balcony}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Parking Slots"
        section="twoBHKConfigs"
        field="type2parking"
        value={config.type2parking}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="2 BHK Floor Plan URL"
        section="twoBHKConfigs"
        field="type2floorplan"
        value={config.type2floorplan}
        onChange={handleChange}
      />

      <InputF
        label="2 BHK Images URL"
        section="twoBHKConfigs"
        field="type2images"
        value={config.type2images}
        onChange={handleChange}
      />
    </div>
  );
};

export default TwoBHKConfig;
