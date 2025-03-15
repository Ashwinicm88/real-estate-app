import InputF from "./InputF";

const OneBHKConfig = ({ config, onChange, index }) => {
  const handleChange = (section, field, value) => {
    onChange(section, field, value, index);
  };

  return (
    <div>
      <h3>1 BHK Type {config.typeNumber}</h3>

      <InputF
        label="1 BHK Units"
        section="oneBHKConfigs"
        field="type1Units"
        value={config.type1Units}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="1 BHK Area (sqft)"
        section="oneBHKConfigs"
        field="type1Area"
        value={config.type1Area}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Bedroom Area"
        section="oneBHKConfigs"
        field="type1BedroomArea"
        value={config.type1BedroomArea}
        onChange={handleChange}
      />
       <InputF
        label="1 BHK Units"
        section="oneBHKConfigs"
        field="type1Units"
        value={config.type1Units}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="1 BHK Area (sqft)"
        section="oneBHKConfigs"
        field="type1area"
        value={config.type1area}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Bedroom Area"
        section="oneBHKConfigs"
        field="type1BedroomArea"
        value={config.type1BedroomArea}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Hall Area"
        section="oneBHKConfigs"
        field="type1HallArea"
        value={config.type1HallArea}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Kitchen Area"
        section="oneBHKConfigs"
        field="type1KitchenArea"
        value={config.type1KitchenArea}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Total Bathrooms"
        section="oneBHKConfigs"
        field="type1bathrooms"
        value={config.type1bathrooms}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="1 BHK Bathroom 1 Area"
        section="oneBHKConfigs"
        field="type1bathroom1"
        value={config.type1bathroom1}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Bathroom 2 Area"
        section="oneBHKConfigs"
        field="type1bathroom2"
        value={config.type1bathroom2}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Balcony Area"
        section="oneBHKConfigs"
        field="type1balcony"
        value={config.type1balcony}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Parking Slots"
        section="oneBHKConfigs"
        field="type1parking"
        value={config.type1parking}
        onChange={handleChange}
        type="integer"
      />

      <InputF
        label="1 BHK Floor Plan URL"
        section="oneBHKConfigs"
        field="type1floorplan"
        value={config.type1floorplan}
        onChange={handleChange}
      />

      <InputF
        label="1 BHK Images URL"
        section="oneBHKConfigs"
        field="type1images"
        value={config.type1images}
        onChange={handleChange}
      />
    </div>
  );
};

export default OneBHKConfig;
