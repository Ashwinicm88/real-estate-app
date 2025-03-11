import { useState } from "react";

const ImageUpload = ({ handleChange, section, field, label }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files);

    // Generate previews for images
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Update form data
    handleChange(section, field, (prevFiles = []) => [...prevFiles, ...files]);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Dynamic Label */}
      {label && (
        <label htmlFor={`${section}-${field}`} className="mb-2 font-semibold text-[#9CA3AF]">
          {label}
        </label>
      )}

      {/* Image Previews */}
      <div className="flex flex-wrap gap-2 mb-2">
        {previews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="w-32 h-32 object-cover rounded-md"
          />
        ))}
      </div>

      {/* Input for Multiple Images */}
      <input
        id={`${section}-${field}`} // Unique id to link with label
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="border p-2 rounded-md"
      />
    </div>
  );
};

export default ImageUpload;
