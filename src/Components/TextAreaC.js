import React from "react";

const TextAreaField = ({
  label,
  section,
  field,
  value,
  onChange,
  error,
}) => {
  const handleInputChange = (e) => {
    onChange(section, field, e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-gray-500">{label}</label>
      <textarea
        className="w-full p-2 bg-black text-white border border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"
        value={value}
        onChange={handleInputChange}
        rows={4}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaField;