import React from 'react';
 
// Reusable Dropdown Component
const DropdownField = ({ label, value, options, onChange,disabled }) => {
  return (
    <div className="relative w-full sm:w-48"> {/* Full width on small screens, fixed width on larger screens */}
      <select
        className="w-full p-2 border-b border-gray-300 rounded-md bg-black text-white focus:outline-none"
        value={value}
        onChange={onChange}
        disabled={disabled}
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
   // ✅ Condition to disable BHK dropdown
   const isBhkDisabled = filters.typeProperty && !["Apartment", "Bunglow","Residential","Villa"].includes(filters.typeProperty);
  return (
    <div className="flex flex-wrap px-8 gap-4 py-4"> {/* Allow wrapping and adjust gap */}
      {/* Budget Dropdown */}
      <DropdownField
        label="Budget"
        value={filters.budget}
        options={[
          { value: '500000', label: '₹5 Lakh' },
          { value: '1000000', label: '₹10 Lakh' },
          { value: '1500000', label: '₹15 Lakh' },
          { value: '2000000', label: '₹20 Lakh' },
          { value: '2300000', label: '₹23 Lakh' }, // ✅ Add this
          { value: '2500000', label: '₹25 Lakh' },
          { value: '3000000', label: '₹30 Lakh' },
          { value: '4000000', label: '₹40 Lakh' },
          { value: '5000000', label: '₹50 Lakh' },
        ]}
        onChange={(e) => updateFilter('budget', e.target.value)}
      />
 
      {/* location Dropdown */}
      <DropdownField
        label="location"
        value={filters.location}
        options={[
          { value: 'Pune', label: 'Pune' },
          { value: 'Mumbai', label: 'Mumbai' },
          { value: 'Airoli', label: 'airoli' },
          { value: 'Kothrud', label: 'Kothrud' },
        ]}
        onChange={(e) => updateFilter('location', e.target.value)}
      />
 
      {/* BHK Dropdown */}
      <DropdownField
        label="Bedrooms"
        value={filters.bhk}
        options={[
          { value: '1BHK', label: '1 BHK' },
          { value: '2BHK', label: '2 BHK' },
          { value: '3BHK', label: '3 BHK' },
        ]}
        onChange={(e) => updateFilter('bhk', e.target.value)}
        disabled={isBhkDisabled}//disabled condition
      />
       {/* Type of Property Dropdown */}
      <DropdownField
        label="Type"
        value={filters.typeProperty}
        options={[
          { value: 'Residential', label: 'Residential' },
          { value: 'Commercial', label: 'Commercial' },
          {value:'Apartment',label:'Apartment'},
          {value:'Villa',label:'Villa'},
          {value:'Plot',label:'Plot'},
          {value:'Bunglow',label:'Bunglow'},
        ]}
        onChange={(e) => updateFilter('typeProperty', e.target.value)}
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
