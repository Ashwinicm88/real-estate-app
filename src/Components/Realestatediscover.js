// import React, { useState } from 'react';
// import DropdownField from './DropdownField'; // Ensure correct import path
// import SearchBox from './SearchBox';

// const CustomDropdownPage = () => {
//   // State for dropdown values
//   const [selectedValues, setSelectedValues] = useState({
//     location: '',
//     bhk: '',
//     budget: '',
//   });

//   // Function to handle dropdown change
//   const handleDropdownChange = (section, field, value) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Sample options for dropdowns
//   const locationOptions = [
//     { label: 'Hadapsar', value: 'hadapsar' },
//     { label: 'Kothrud', value: 'kothrud' },
//     { label: 'Airoli', value: 'airoli' },
//   ];

//   const bhkOptions = [
//     { label: '1 BHK', value: '1bhk' },
//     { label: '2 BHK', value: '2bhk' },
//     { label: '3 BHK', value: '3bhk' },
//   ];

//   const budgetOptions = [
//     { label: 'Below 30 Lakhs', value: 'below30' },
//     { label: '30 Lakhs - 50 Lakhs', value: '30to50' },
//     { label: 'Above 50 Lakhs', value: 'above50' },
//   ];

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted:', selectedValues);
//   };

//   return (
//     <div maxWidth="lg" className="mt-8 p-6">
//       <form onSubmit={handleSubmit} className="flex items-center justify-center w-full space-x-4">
//         {/* All fields in a single row */}
//         <div className="flex space-x-4 w-full max-w-4xl">
//           <DropdownField
//             label="Location"
//             section="search"
//             field="location"
//             value={selectedValues.location}
//             onChange={handleDropdownChange}
//             options={locationOptions}
//           />

//           <DropdownField
//             label="BHK Type"
//             section="search"
//             field="bhk"
//             value={selectedValues.bhk}
//             onChange={handleDropdownChange}
//             options={bhkOptions}
//           />

//           <DropdownField
//             label="Budget"
//             section="search"
//             field="budget"
//             value={selectedValues.budget}
//             onChange={handleDropdownChange}
//             options={budgetOptions}
//           />
//         </div>

//         {/* Submit button aligned in the same row */}
//         <button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className="bg-white hover:bg-yellow-500 text-black font-semibold px-5 py-1 rounded"
//         >
//           Discover Now
//         </button> 
      
//       </form> 
//       <SearchBox/>
    
//     </div>
//   );
// };

// export default CustomDropdownPage;
import React, { useState } from 'react';
import DropdownField from './DropdownField'; // Ensure correct import path
import SearchBox from './SearchBox';

const CustomDropdownPage = () => {
  // State to toggle search box visibility
  const [showSearchBox, setShowSearchBox] = useState(false);

  // State for dropdown values
  const [selectedValues, setSelectedValues] = useState({
    location: '',
    bhk: '',
    budget: '',
  });

  // Function to handle dropdown change
  const handleDropdownChange = (section, field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Show search box below the dropdowns and hide "Click Here"
  const toggleSearchBox = () => {
    setShowSearchBox(true);
  };

  // Sample options for dropdowns
  const locationOptions = [
    { label: 'Hadapsar', value: 'hadapsar' },
    { label: 'Kothrud', value: 'kothrud' },
    { label: 'Airoli', value: 'airoli' },
  ];

  const bhkOptions = [
    { label: '1 BHK', value: '1bhk' },
    { label: '2 BHK', value: '2bhk' },
    { label: '3 BHK', value: '3bhk' },
  ];

  const budgetOptions = [
    { label: 'Below 30 Lakhs', value: 'below30' },
    { label: '30 Lakhs - 50 Lakhs', value: '30to50' },
    { label: 'Above 50 Lakhs', value: 'above50' },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', selectedValues);
  };

  return (
    <div className="p-4 flex justify-center">
      {/* Card Container (Increased Width for Better Appearance) */}
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-5xl w-full border border-[#333]">
        {/* Dropdown Section + Discover Button in the Same Line */}
        <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
          {/* Explore Text */}
          {/* <span className="text-white font-semibold text-lg">Explore</span> */}

          <div className="flex space-x-3 w-full">
            <DropdownField
              label="Select Location"
              section="search"
              field="location"
              value={selectedValues.location}
              onChange={handleDropdownChange}
              options={locationOptions}
            />

            <DropdownField
              label="Select BHK Type"
              section="search"
              field="bhk"
              value={selectedValues.bhk}
              onChange={handleDropdownChange}
              options={bhkOptions}
            />

            <DropdownField
              label="Select Budget"
              section="search"
              field="budget"
              value={selectedValues.budget}
              onChange={handleDropdownChange}
              options={budgetOptions}
            />
          </div>

          {/* Discover Now Button (Same Line) */}
          <button
            type="submit"
            className="bg-white hover:bg-yellow-500 text-black font-semibold px-5 py-1 rounded mt-4"
          >
            Go
          </button>
        </form>

        {/* Click Here Text (Hidden When SearchBox Appears) */}
        {!showSearchBox && (
          <p 
            className="mt-4 text-[#36454F] cursor-pointer hover:underline text-center"
            onClick={toggleSearchBox}
          >
            Click Here , to talk with our AI Agent.
          </p>
        )}

        {/* Show Search Box Below the Dropdowns */}
        {showSearchBox && (
          <div className="mt-6">
            <SearchBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdownPage;
