import React from "react";
<<<<<<< HEAD
 
const CheckBoxControl = ({ label, section, field, checked, onChange }) => {
=======

const Checkbox = ({ label, section, field, checked, onChange,error }) => {
>>>>>>> Gmap
  // Handle checkbox state change
  const handleCheckboxChange = (e) => {
    onChange(section, field, e.target.checked);
  };
<<<<<<< HEAD
 
  return (
    <div className="flex items-center space-x-2 mb-2">
=======

  return (
    <div className="w-full mb-1 mobile-s:mx-3 mobile-m:mx-4 
    text-base mobile-s:text-sm mobile-m:text-md mobile-l:text-lg md:ml-10 md:w-3/4 space-x-2">
>>>>>>> Gmap
      <input
        type="checkbox"
        id={`${section}-${field}`} // Unique ID for accessibility
        checked={checked}
<<<<<<< HEAD
        onChange={handleCheckboxChange}
        className="w-5 h-5 accent-gray-800 cursor-pointer"
      />
=======
        error={Boolean(error)}
        helperText={error || ''}
        onChange={handleCheckboxChange}
        className="appearance-none w-4 h-4 border-2 border-white bg-transparent checked:bg-white checked:after:content-['✔'] checked:after:text-black checked:after:block checked:after:text-xs checked:after:leading-none checked:after:text-center checked:after:translate-y-[-1px]"
      />
        
     
>>>>>>> Gmap
      {label && (
        <label
          htmlFor={`${section}-${field}`}
          className="text-white cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};
<<<<<<< HEAD
 
export default CheckBoxControl;
=======

export default Checkbox;
>>>>>>> Gmap
