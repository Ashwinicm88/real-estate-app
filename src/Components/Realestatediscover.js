// import React, { useState } from 'react';
// import DropdownField from '../Components/DropdownField'; // Ensure correct import path
// import SearchBox from './SearchBox';
 
// const CustomDropdownPage = () => {
//   // State to toggle search box visibility
//   const [showSearchBox, setShowSearchBox] = useState(false);
 
//   // State for dropdown values
//   const [selectedValues, setSelectedValues] = useState({
//     location: '',
//     bhk: '',
//     budget: '',
//   });
//    // State for API response data
//    const [projects, setProjects] = useState([]);
 
//   // Function to handle dropdown change
//   const handleDropdownChange = (section, field, value) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };
 
//   // Show search box below the dropdowns and hide "Click Here"
//   const toggleSearchBox = () => {
//     setShowSearchBox(true);
//   };
 
//   // Sample options for dropdowns
//   const locationOptions = [
//     { label: 'Pune', value: 'pune' },
//     { label: 'Mumbai', value: 'mumbai' },
//     { label: 'Airoli', value: 'airoli' },
//   ];
 
//   const bhkOptions = [
//     { label: '1 BHK', value: '1bhk' },
//     { label: '2 BHK', value: '2bhk' },
//     { label: '3 BHK', value: '3bhk' },
//   ];
 
//   const budgetOptions = [
//     { label: '10000', value: '10000' },
//     { label: '30 Lakhs - 50 Lakhs', value: '30to50' },
//     { label: 'Above 50 Lakhs', value: 'above50' },
//   ];
//    // Convert location to match backend format
//    const city = location.charAt(0).toUpperCase() + location.slice(1);

//   // Handle form submission
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", selectedValues);

//     const {location:selectedLocation,bhk,budget}=selectedValues;
//     // Convert budget to API parameters
//     let budgetMin = 0;
//     let budgetMax = 0;
//     if (budget === "10000") {
//       budgetMin = 0;
//       budgetMax = 10000;
//     } else if (budget === "30to50") {
//       budgetMin = 3000000;
//       budgetMax = 5000000;
//     } else if (budget === "above50") {
//       budgetMin = 5000000;
//       budgetMax = 100000000; // Assuming a high max value
//     }
    
//   // Fix BHK format to match backend expectations
//   const bhkType = bhk.toUpperCase(); // Convert "2bhk" -> "2BHK"
//     // Construct the API URL dynamically
//     const apiUrl = `http://localhost:8080/api/entities/search?city=${location}&bhkType=${bhk}&budgetMin=${budgetMin}&budgetMax=${budgetMax}`;
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Failed to fetch projects');
//       }
//       const data = await response.json();
//       setProjects(data); // Store API response in state
//       console.log('API Response:', data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//     // console.log('Form Submitted:', selectedValues);
//   };
 
//   return (
//     <div className="p-4 flex justify-center">
//       {/* Card Container (Increased Width for Better Appearance) */}
//       <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-5xl w-full border border-[#333]">
//         {/* Dropdown Section + Discover Button in the Same Line */}
//         <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
//           {/* Explore Text */}
//           {/* <span className="text-white font-semibold text-lg">Explore</span> */}
 
//           <div className="flex space-x-3 w-full">
//             <DropdownField
//               label="Select Location"
//               section="search"
//               field="location"
//               value={selectedValues.location}
//               onChange={handleDropdownChange}
//               options={locationOptions}
//             />
 
//             <DropdownField
//               label="Select BHK Type"
//               section="search"
//               field="bhk"
//               value={selectedValues.bhk}
//               onChange={handleDropdownChange}
//               options={bhkOptions}
//             />
 
//             <DropdownField
//               label="Select Budget"
//               section="search"
//               field="budget"
//               value={selectedValues.budget}
//               onChange={handleDropdownChange}
//               options={budgetOptions}
//             />
//           </div>
 
//           {/* Discover Now Button (Same Line) */}
//           <button
//             type="submit"
//             className="bg-white hover:bg-yellow-500 text-black font-semibold px-5 py-1 rounded mt-4"
//           >
//             Go
//           </button>
//         </form>
 
//         {/* Click Here Text (Hidden When SearchBox Appears) */}
//         {!showSearchBox && (
//           <p
//             className="mt-4 text-[#36454F] cursor-pointer hover:underline text-center"
//             onClick={toggleSearchBox}
//           >
//             Click Here , to talk with our AI Agent.
//           </p>
//         )}
 
//         {/* Show Search Box Below the Dropdowns */}
//         {showSearchBox && (
//           <div className="mt-6">
//             <SearchBox />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default CustomDropdownPage;
import React, { useState } from 'react';
import DropdownField from '../Components/DropdownField'; // Ensure correct import path
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

  // State for API response data
  const [projects, setProjects] = useState([]);

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

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted:", selectedValues);

  //   const { location: selectedLocation, bhk, budget } = selectedValues;


  // // Construct query parameters dynamically
  // const params = new URLSearchParams();

  // if (selectedLocation) {
  //   params.append("city", selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1));
  // }

  // if (bhk) {
  //   params.append("bhkType", bhk.toUpperCase()); // Convert "2bhk" -> "2BHK"
  // }

  // if (budget) {
  //   let budgetMin = 0;
  //   let budgetMax = 0;
  //   if (budget === "10000") {
  //     budgetMin = 0;
  //     budgetMax = 10000;
  //   }
  //   else if(budget === "200000"){
  //     budgetMin = 0;
  //     budgetMax= 200000;
  //   } 
  //   else if (budget === "500000") {
  //     budgetMin = 0;
  //     budgetMax = 500000;
  //   }
  //   else if (budget === "30to50") {
  //     budgetMin = 3000000;
  //     budgetMax = 5000000;
  //   } else if (budget === "above50") {
  //     budgetMin = 5000000;
  //     budgetMax = 100000000;
  //   }
  //   params.append("budgetMin", budgetMin);
  //   params.append("budgetMax", budgetMax);
  // }

  //  // If no filters are selected, show an alert
  //   if (!selectedLocation && !bhk && !budget) {
  //     alert("Please select all fields before submitting.");
  //     return;
  //   }
  //   // Construct the API URL dynamically
  //   const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;

  //   console.log("API Request URL:", apiUrl); // Debugging

  //   try {
  //     const response = await fetch(apiUrl);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch projects");
  //     }
  //     const data = await response.json();
  //     console.log("Raw API Response:",data);// 🔹 Add this to check what you get from API

  //     // Ensure prices are numbers and not being modified unintentionally
  //   const transformedData = data.map(project => ({
  //     ...project,
  //     priceMin: Number(project.priceMin), // Ensure it's a number
  //     priceMax: Number(project.priceMax)
  //   }));
    
  //   if (data.length === 0) {
  //     alert(`${selectedValues.bhk.toUpperCase()} for this property is not available.`);
  //   } else {
  //     setProjects(data); // Store API response in state
  //   }

  //   // console.log("Transformed API Response:", transformedData);

  //     setProjects(transformedData); // Store API response in state
  //     console.log("API Response:", data);
  //   } catch (error) {
  //     console.error("Error fetching projects:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", selectedValues);
  
    const { location: selectedLocation, bhk, budget } = selectedValues;
  
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
  
    // 🚨 Prevent API call if no filters are selected
    if (!selectedLocation && !bhk && !budget) {
      alert("Please select at least one field before submitting.");
      return;
    }
  
    // Construct the API URL dynamically
    const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;
    console.log("API Request URL:", apiUrl); // Debugging
  
    try {
      const response = await fetch(apiUrl);
      
      // Handle API errors
      if (!response.ok) {
        if (response.status === 404) {
          const errorData = await response.json();
          alert(errorData.message || "No properties found for the selected filters.");
          setProjects([]); // Clear previous projects
          return;
        }
        throw new Error("Failed to fetch projects");
      }
  
      const data = await response.json();
      console.log("Raw API Response:", data); // Debugging
  
      if (data.length === 0) {
        alert(`${bhk ? bhk.toUpperCase() : "Property"} for this search criteria is not available.`);
        setProjects([]);
        return;
      }
  
      // Ensure prices are numbers
      const transformedData = data.map(project => ({
        ...project,
        priceMin: Number(project.priceMin),
        priceMax: Number(project.priceMax)
      }));
  
      setProjects(transformedData); // Store API response in state
      console.log("Transformed API Response:", transformedData);
  
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Something went wrong while fetching properties.");
    }
  };
  
  return (
    <div className="p-4 flex justify-center">
      {/* Card Container (Increased Width for Better Appearance) */}
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-5xl w-full border border-[#333]">
        {/* Dropdown Section + Discover Button in the Same Line */}
        <form onSubmit={handleSubmit} className="flex items-center justify-center w-full">
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
            Click Here, to talk with our AI Agent.
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
