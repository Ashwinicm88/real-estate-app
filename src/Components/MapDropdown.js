// import SearchIcon from '@mui/icons-material/Search';

// const PropertyFilters = ({ filters, updateFilter }) => {
//   return (
//     <div className="rounded-lg flex items-center gap-4 justify-center">
//       {/* Budget Dropdown */}
//       <select
//         value={filters.budget}
//         onChange={(e) => updateFilter("budget", e.target.value)}
//         className="p-3 w-52 bg-white text-gray-700 rounded-lg shadow-md focus:outline-none"
//       >
//         <option value="">Budget</option>
//         <option value="500000">₹5 Lakh</option>
//         <option value="1000000">₹10 Lakh</option>
//         <option value="5000000">₹50 Lakh</option>
//       </select>

//       {/* Location Dropdown */}
//       <select
//         value={filters.location}
//         onChange={(e) => updateFilter("location", e.target.value)}
//         className="p-3 w-52 bg-white text-gray-700 rounded-lg shadow-md focus:outline-none"
//       >
//         <option value="">Location</option>
//         <option value="Pune">Pune</option>
//         <option value="Hyderabad">Hyderabad</option>
//         <option value="Bangalore">Bangalore</option>
//       </select>

//       {/* BHK Dropdown */}
//       <select
//         value={filters.bhk}
//         onChange={(e) => updateFilter("bhk", e.target.value)}
//         className="p-3 w-52 bg-white text-gray-700 rounded-lg shadow-md focus:outline-none"
//       >
//         <option value="">Bedrooms</option>
//         <option value="1">1 BHK</option>
//         <option value="2">2 BHK</option>
//         <option value="3">3 BHK</option>
//       </select>

//       {/* Find Button */}
//       <button
//         onClick={() => alert("Search Initiated")}
//         className="p-3 w-32 bg-yellow-500 text-black font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-yellow-400 transition"
//       >
//         FIND <SearchIcon />
//       </button>
//     </div>
//   );
// };

// export default PropertyFilters;
import React from 'react';

// Reusable Dropdown Component
const DropdownField = ({ label, value, options, onChange }) => {
  return (
    <div className="relative w-full sm:w-48"> {/* Full width on small screens, fixed width on larger screens */}
      <select
        className="w-full p-2 border-b border-gray-300 rounded-md bg-black text-white focus:outline-none"
        value={value}
        onChange={onChange}
      >
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const PropertyFilters = ({ filters, updateFilter }) => {
  return (
    <div className="flex flex-wrap px-8 gap-4 py-4"> {/* Allow wrapping and adjust gap */}
      {/* Budget Dropdown */}
      <DropdownField
        label="Budget"
        value={filters.budget}
        options={[
          { value: '500000', label: '₹5 Lakh' },
          { value: '1000000', label: '₹10 Lakh' },
          { value: '5000000', label: '₹50 Lakh' },
        ]}
        onChange={(e) => updateFilter('budget', e.target.value)}
      />

      {/* Location Dropdown */}
      <DropdownField
        label="Location"
        value={filters.location}
        options={[
          { value: 'Pune', label: 'Pune' },
          { value: 'Hyderabad', label: 'Hyderabad' },
          { value: 'Bangalore', label: 'Bangalore' },
        ]}
        onChange={(e) => updateFilter('location', e.target.value)}
      />

      {/* BHK Dropdown */}
      <DropdownField
        label="Bedrooms"
        value={filters.bhk}
        options={[
          { value: '1', label: '1 BHK' },
          { value: '2', label: '2 BHK' },
          { value: '3', label: '3 BHK' },
        ]}
        onChange={(e) => updateFilter('bhk', e.target.value)}
      />

      {/* Find Button
      <button
        onClick={() => alert('Search Initiated')}
        className="p-2 w-full sm:w-20 bg-white text-black font-semibold rounded-md shadow-md flex items-center justify-center gap-2 hover:bg-yellow-400 transition"
      >
        Go
      </button> */}
    </div>
  );
};

export default PropertyFilters;

