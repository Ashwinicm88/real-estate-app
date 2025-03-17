import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  label,
  section,
  field,
  value,
  onChange,
  error,
  type = "text",
  maxLength,
}) => {
  // Handle Input Changes
  const handleInputChange = (e) => {
    let { value } = e.target;

    // Limit the value length if maxLength is specified
    if (maxLength) value = value.slice(0, maxLength);

    // Restrict to numeric values for integer and float types
    if (type === "integer") value = value.replace(/[^0-9]/g, "");
    if (type === "float") value = value.replace(/[^0-9.]/g, "");

    // Pass updated value to parent handler
    onChange(section, field, value);
  };

  return (
    <div className="mb-1 mr-1 w-3/4">
      <TextField
        className="w-full bg-transparent"
        label={label}
        variant="standard"
        value={value || ""}
        onChange={handleInputChange}
        error={Boolean(error)}
        helperText={error || ""}
        type={type === "integer" || type === "float" ? "text" : type}
        inputMode={type === "integer" || type === "float" ? "numeric" : "text"}
        sx={{
          "& .MuiInputLabel-root": { color: "#9CA3AF" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#1F2937" },
          "& .MuiInput-root": {
            color: "white",
            borderBottom: "1px solid #E5E7EB",
            width: "100%",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#E5E7EB",
          },
        }}
      />
    </div>
  );
};

export default InputField;
