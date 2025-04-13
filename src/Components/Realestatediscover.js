import React, { useState } from 'react';
import DropdownField from '../Components/DropdownField'; // Ensure correct import path
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
 
const CustomDropdownPage = () => {
  const navigate = useNavigate(); // Add navigation hook
 
  // Toggle state for Search and AI Talk
  const [activeToggle, setActiveToggle] = useState('search');
   
 
  // State to toggle search box visibility
 
 
  // State for dropdown values
  const [selectedValues, setSelectedValues] = useState({
    location: '',
    bhk: '',
    budget: '',
    typeProperty: '',
  });
 
  // State for API response data
  const [projects, setProjects] = useState([]);
 
  // Function to handle dropdown change
  const handleDropdownChange = (section, field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
 
   // Toggle between Search and AI Talk
   const toggleSection = (section) => {
    setActiveToggle(section);
  };
 
  // Sample options for dropdowns
  const typesOptions = [
    { label: "Apartment", value: "Apartment" },
    { label: "Bunglow", value: "Bunglow" },
    { label: "Row House", value: "Row House" },
    { label: "Plot", value: "Plot" },
    { label: "Commercial", value: "Commercial" },
  ];
 
  const locationOptions = [
    { label: 'Pune', value: 'pune' },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Airoli', value: 'airoli' },
  ];
 
  const bhkOptions = [
    { label: '1 BHK', value: '1bhk' },
    { label: '2 BHK', value: '2bhk' },
    { label: '3 BHK', value: '3bhk' },
  ];
 
  const budgetOptions = [
    { label: '10000', value: '10000' },
    { label: '200000', value: '200000' },
    { label: '500000', value: '500000' },
    { label: '30 Lakhs - 50 Lakhs', value: '30to50' },
    { label: 'Above 50 Lakhs', value: 'above50' },
  ];
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", selectedValues);
 
    const { location: selectedLocation, bhk, budget, typeProperty} = selectedValues;
 
    // Construct query parameters dynamically
    const params = new URLSearchParams();
 
    if (selectedLocation) {
      params.append("city", selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1));
    }
 
    if (bhk) {
      params.append("bhkType", bhk.toUpperCase()); // Convert "2bhk" -> "2BHK"
    }
 
    if (budget) {
      let budgetMin = 0, budgetMax = 0;
 
      switch (budget) {
        case "10000":
          budgetMin = 0; budgetMax = 10000;
          break;
        case "200000":
          budgetMin = 0; budgetMax = 200000;
          break;
        case "500000":
          budgetMin = 0; budgetMax = 500000;
          break;
        case "30to50":
          budgetMin = 3000000; budgetMax = 5000000;
          break;
        case "above50":
          budgetMin = 5000000; budgetMax = 100000000;
          break;
        default:
          break;
      }
      params.append("budgetMin", budgetMin);
      params.append("budgetMax", budgetMax);
    }
 
    // Add typeProperty to the query parameters
    if (typeProperty) {
      params.append("typeProperty", typeProperty); // Add typeProperty to params
    }
    // Prevent API call if no filters are selected
    if (!selectedLocation && !bhk && !budget && !typeProperty) {
      alert("Please select at least one field before submitting.");
      return;
    }
 
      navigate(`/search-result?${params.toString()}`);
 
  };
 
  return (
    <div className="p-4 flex justify-center relative">
    <div className="absolute top-1 left-8 md:left-32 md:ml-32 flex gap-0 z-10">
          <button
            onClick={() => toggleSection('search')}
            className={`px-2 py-0 rounded-l-lg ${activeToggle === 'search' ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}`}
          >
            Search
          </button>
          <button
            onClick={() => toggleSection('ai')}
            className={`px-2 py-0 rounded-r-lg ${activeToggle === 'ai' ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}`}
          >
            Ask AI Agent
          </button>
       
      </div>
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-5xl w-full border border-[#333] h-57">
        {/* Toggle Button Section */}
        {/* Conditional Rendering based on Active Toggle */}
        {activeToggle === 'search' ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full space-y-3 sm:space-y-0 sm:space-x-1 transition-opacity">
          {/* Type of Property Dropdown */}      
          {/* Location, BHK Type, and Budget Dropdowns */}
          <div className="flex flex-col items-center justify-center w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-0">
          <div className="w-full sm:w-[770px]">
          <DropdownField
              label="Type of Property"
              field="typeProperty"
              value={selectedValues.typeProperty}
              onChange={handleDropdownChange}
              options={typesOptions}
            />
          </div>
            <div className="w-full sm:w-[740px]">
              <DropdownField
                label="Select Location"
                field="location"
                value={selectedValues.location}
                onChange={handleDropdownChange}
                options={locationOptions}
              />
            </div>
            <div className="w-full sm:w-[780px]">
              <DropdownField
                label="Select BHK Type"
                field="bhk"
                value={selectedValues.bhk}
                onChange={handleDropdownChange}
                options={bhkOptions}
              />
            </div>
            <div className="w-full sm:w-[770px]">
              <DropdownField
                label="Select Budget"
                field="budget"
                value={selectedValues.budget}
                onChange={handleDropdownChange}
                options={budgetOptions}
              />
            </div>
            {/* Go Button */}
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-yellow-500 w-20 sm:w-28"
            >
              Go
            </button>
          </div>
        </form>
       
        ) : (
          <div className="mt-4 w-full flex flex-row items-center justify-start gap-2 sm:ml-4 ">
  <div className="w-full sm:w-[70%] ">
    <SearchBox />
  </div>
  <button
    type="submit"
    className="bg-white hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded flex items-center justify-center"
  >
    <FaPaperPlane className="text-black mr-2" />
  </button>
</div>
 
       
        )}
      </div>
 
     
    </div>
  );
};
 
export default CustomDropdownPage;