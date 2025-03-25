// // import React, { useState, useEffect } from "react";
// // import PropertyDetails from "../Components/Cards";
// // import PropertyDropdowns from "../Components/MapDropdown";
// // import MapComponent from "../Components/MapSection";
// // import DemoNavbar from "../Components/Header";
 
 
// // const Display_D = () => {
// //   // States for filters and properties
// //   const [filters, setFilters] = useState({
// //     location: "",
// //     bhk: "",
// //     budget:100000000,
// //   });
 
// //   // State for API response data
// //     const [projects, setProjects] = useState([]);
 
// //   const [allProperties, setAllProperties] = useState([]);
// //   const [filteredProperties, setFilteredProperties] = useState([]);
// //   const [visibleProperties, setVisibleProperties] = useState([]);
// //   const [showMap, setShowMap] = useState(false); // ✅ Toggle map/list view for small screens
// //   const [showDropdowns, setShowDropdowns] = useState(false); // ✅ Toggle Dropdowns
// //   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune Default
 
// //   // Fetch properties from backend when component loads
// //    // ✅ Function to update visible properties based on the map view
// //    const handleVisiblePropertiesChange = (visibleProps) => {
// //     setVisibleProperties(visibleProps);
// //     console.log("Visible Properties Updated:", visibleProps);
// //   };
// // //   useEffect(() => {
// // //     const fetchProperties = async () => {
// // //       try {
// // //         const { location: selectedLocation, bhk, budget } = filters;
// // //          // Construct query parameters dynamically
// // //       const params = new URLSearchParams();

// // //       if (selectedLocation) {
// // //         params.append("city", selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1));
// // //       }

// // //       if (bhk) {
// // //         params.append("bhkType", bhk.toUpperCase()); // Convert "2bhk" -> "2BHK"
// // //       }

// // //       if (budget) {
// // //         let budgetMin = 0, budgetMax = 0;
        
// // //         switch (budget) {
// // //           case "10000":
// // //             budgetMin = 0; budgetMax = 10000;
// // //             break;
// // //           case "200000":
// // //             budgetMin = 0; budgetMax = 200000;
// // //             break;
// // //           case "500000":
// // //             budgetMin = 0; budgetMax = 500000;
// // //             break;
// // //           case "30to50":
// // //             budgetMin = 3000000; budgetMax = 5000000;
// // //             break;
// // //           case "above50":
// // //             budgetMin = 5000000; budgetMax = 100000000;
// // //             break;
// // //           default:
// // //             break;
// // //         }
// // //         params.append("budgetMin", budgetMin);
// // //         params.append("budgetMax", budgetMax);
// // //       }

// // //       // 🚨 Prevent API call if no filters are selected
// // //       if (!selectedLocation && !bhk && !budget) {
// // //         alert("Please select at least one field before submitting.");
// // //         return;
// // //       }

// // //       // Construct final URL
// // //       const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;
// // //       console.log("API URL:", apiUrl);

// // //         const response = await fetch(apiUrl);
// // //         const data = await response.json();
 
// // //         // Ensure valid latitude & longitude
// // //         const validProperties = data.map((property) => ({
// // //           ...property,
// // //           latitude: parseFloat(property.latitude),
// // //           longitude: parseFloat(property.longitude),
// // //           bhk: property.bhk_1 || property.bhk_2 || property.bhk_3, // Ensure BHK status
// // //           name: property.projectName, // Ensure name is sent
// // //           image:property.projectImages? property.projectImages[0] : "", // First image if available
// // //         }));
 
// // //         setAllProperties(validProperties);
// // //         setFilteredProperties(validProperties); // Initially display all properties
 
// // //         // Set map to the first property if available
// // //         if (validProperties.length > 0) {
// // //           setMapCenter({
// // //             lat: validProperties[0].latitude,
// // //             lng: validProperties[0].longitude,
// // //           });
// // //         }
// // //         console.log("DATa",validProperties);
// // //       } catch (error) {
// // //         console.error("Error fetching properties:", error);
// // //       }
// // //     };
 
// // //     fetchProperties();
// // //   }, []);
 
// //   // Apply filters dynamically
// //   useEffect(() => {
// //     const applyFilters = () => {
// //       const { location, bhk, budget  } = filters;
 
// //       const filtered = allProperties.filter((property) => {
// //         const matchesLocation =
// //           !location || property.location.toLowerCase().includes(location.toLowerCase());
// //         const matchesBHK =
// //           !bhk ||
// //           (bhk === "1" && property.bhk_1) ||
// //           (bhk === "2" && property.bhk_2) ||
// //           (bhk === "3" && property.bhk_3);
 
// //         const matchesBudget = !budget || property.budget <= budget;
 
// //         return matchesLocation && matchesBHK  && matchesBudget;
// //       });
 
// //       setFilteredProperties(filtered);
 
// //       // Update map center based on the first filtered property
// //       if (filtered.length > 0) {
// //         setMapCenter({
// //           lat: filtered[0].latitude,
// //           lng: filtered[0].longitude,
// //         });
// //       }
// //     };
 
// //     applyFilters();
// //   }, [filters, allProperties]);
 
// //   // Update filter handler
// //   const updateFilter = (key, value) => {
// //     setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
// //   };
 
// //   return (  
// //     <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
// //     {/* 🏠 Navbar */}
// //     <DemoNavbar />
 
// // <div className="pt-16 sm:pt-12">
// //   {/* 🌟 Mobile View: Show Filters Summary + Edit Button */}
// //   <div className="block md:hidden mb-4">
// //     {!showDropdowns && (
// //       <div className="flex justify-between items-center bg-gray-500 p-2 rounded-md">
// //         <p className="text-sm font-medium text-white">
// //           Location: {filters.location || "Any"},
// //           Budget: {filters.budget || "Any"},
// //           BHK: {filters.bhk || "Any"}
// //         </p>
// //         <button
// //           className="text-blue-600 underline text-sm"
// //           onClick={() => setShowDropdowns(true)}
// //         >
// //           Edit Search
// //         </button>
// //       </div>
// //     )}
   
// //   </div>
 
// //   {/* 📌 Dropdowns Section (Hidden on mobile initially, visible on large screens) */}
// //   <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
// //     {showDropdowns && (
// //       <button
// //         className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
// //         onClick={() => setShowDropdowns(false)}
// //       >
// //         ✕
// //       </button>
// //     )}
// //     <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
// //   </div>
// // </div>
 
// //     {/* 🌍 Main Layout (Map Left, Properties Right) */}
// //     <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] mt-1 px-4 md:px-6 lg:px-8">
// //       {/* 🗺️ Map Section */}
// //       <div
// //         className={`relative w-full md:w-1/2 h-full transition-all duration-300 ${
// //           showMap ? "block fixed inset-0 z-50 bg-white" : "hidden md:block"
// //         }`}
// //       >
// //         <MapComponent
// //           center={mapCenter}
// //           properties={filteredProperties}
// //           onVisiblePropertiesChange={handleVisiblePropertiesChange}
// //         />
// //         {/* 🔘 Button to switch to List View on small screens */}
// //         <button
// //           className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-md md:hidden"
// //           onClick={() => setShowMap(false)}
// //         >
// //           List View
// //         </button>
// //       </div>
     
 
// //       {/* 🏡 Property List Section */}
// //       <div
// //         className={`w-full md:w-1/2 overflow-y-auto max-h-full px-4 transition-all duration-300 ${
// //           showMap ? "hidden" : "block"
// //         }`}
// //       >
// //          {/* 🗺️ Map & List Buttons (Above Cards) */}
// //          <div className="flex justify-center gap-2 mb-2">
// //             <button
// //               className="bg-gray-500 text-white px-4 py-2 rounded-md md:hidden"
// //               onClick={() => setShowMap(true)}
// //             >
// //               Map View
// //             </button>
// //           </div>
// //         <PropertyDetails properties={visibleProperties.length > 0 ? visibleProperties : filteredProperties} />
       
// //       </div>
// //     </div>
// //   </div>
// //   );
// // };
 
// // export default Display_D;
// import React, { useState, useEffect } from "react";
// import PropertyDetails from "../Components/Cards";
// import PropertyDropdowns from "../Components/MapDropdown";
// import MapComponent from "../Components/MapSection";
// import DemoNavbar from "../Components/Header";

// const Display_D = () => {
//   // States for filters and properties
//   const [filters, setFilters] = useState({
//     location: "",
//     bhk: "",
//     budget: 100000000,
//   });

//   // State for API response data
//   const [allProperties, setAllProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [visibleProperties, setVisibleProperties] = useState([]);
//   const [showMap, setShowMap] = useState(false); // ✅ Toggle map/list view
//   const [showDropdowns, setShowDropdowns] = useState(false); // ✅ Toggle dropdowns
//   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Default: Pune

//   // ✅ Function to update visible properties based on the map view
//   const handleVisiblePropertiesChange = (visibleProps) => {
//     setVisibleProperties(visibleProps);
//     console.log("Visible Properties Updated:", visibleProps);
//   };

//   // ✅ Fetch properties whenever filters change
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const { location, bhk, budget } = filters;

//         // Construct query parameters dynamically
//         const params = new URLSearchParams();

//         if (location) {
//           params.append("city", location.charAt(0).toUpperCase() + location.slice(1));
//         }

//         if (bhk) {
//           params.append("bhkType", bhk.toUpperCase()); // Convert "2bhk" -> "2BHK"
//         }

//         if (budget) {
//           let budgetMin = 0, budgetMax = 0;

//           switch (budget) {
//             case "10000":
//               budgetMin = 0; budgetMax = 10000;
//               break;
//             case "200000":
//               budgetMin = 0; budgetMax = 200000;
//               break;
//             case "500000":
//               budgetMin = 0; budgetMax = 500000;
//               break;
//             case "30to50":
//               budgetMin = 3000000; budgetMax = 5000000;
//               break;
//             case "above50":
//               budgetMin = 5000000; budgetMax = 100000000;
//               break;
//             default:
//               break;
//           }
//           params.append("budgetMin", budgetMin);
//           params.append("budgetMax", budgetMax);
//         }

//         // 🚨 Prevent API call if no filters are selected
//         if (!location && !bhk && !budget) {
//           console.log("No filters selected. Skipping API call.");
//           return;
//         }

//         // Construct final URL
//         const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;
        
//         const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    
//         console.log("API URL:", apiUrl);
//         try {
//           const response = await fetch(apiUrl);
          
//           // Handle API errors
//           if (!response.ok) {
//             if (response.status === 404) {
//               const errorData = await response.json();
//               alert(errorData.message || "No properties found for the selected filters.");
//               setAllProperties([]); // Clear previous projects
//               return;
//             }
//             throw new Error("Failed to fetch projects");
//           }
      
//           const data = await response.json();
//           console.log("Raw API Response:", data); // Debugging
      
//           if (data.length === 0) {
//             alert(`${bhk ? bhk.toUpperCase() : "Property"} for this search criteria is not available.`);
//             setAllProperties([]);
//             return;
//           }
      
//           // Ensure prices are numbers
//           const transformedData = data.map(project => ({
//             ...project,
//             priceMin: Number(project.priceMin),
//             priceMax: Number(project.priceMax)
//           }));
      
//           setAllProperties(transformedData); // Store API response in state
      
//         } catch (error) {
//           console.error("Error fetching projects:", error);
//           alert("Something went wrong while fetching properties.");
//         }
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         // Ensure valid latitude & longitude
//         const validProperties = data.map((property) => ({
//           ...property,
//           latitude: parseFloat(property.latitude),
//           longitude: parseFloat(property.longitude),
//           bhk: property.bhk_1 || property.bhk_2 || property.bhk_3, // Ensure BHK status
//           name: property.projectName, // Ensure name is sent
//           image: property.image ? property.projectImages[0] : "", // First image if available
//         }));

//         setAllProperties(validProperties);
//         setFilteredProperties(validProperties); // Initially display all properties

//         // Set map to the first property if available
//         if (validProperties.length > 0) {
//           setMapCenter({
//             lat: validProperties[0].latitude,
//             lng: validProperties[0].longitude,
//           });
//         }
//         console.log("Data fetched:", validProperties);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, [filters]); // ✅ Runs API call whenever filters change

//   // ✅ Update filter handler (triggers API call)
//   const updateFilter = (key, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
//   };

//   return (
//     <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
//       {/* 🏠 Navbar */}
//       <DemoNavbar />

//       <div className="pt-16 sm:pt-12">
//         {/* 🌟 Mobile View: Show Filters Summary + Edit Button */}
//         <div className="block md:hidden mb-4">
//           {!showDropdowns && (
//             <div className="flex justify-between items-center bg-gray-500 p-2 rounded-md">
//               <p className="text-sm font-medium text-white">
//                 Location: {filters.location || "Any"},
//                 Budget: {filters.budget || "Any"},
//                 BHK: {filters.bhk || "Any"}
//               </p>
//               <button
//                 className="text-blue-600 underline text-sm"
//                 onClick={() => setShowDropdowns(true)}
//               >
//                 Edit Search
//               </button>
//             </div>
//           )}
//         </div>

//         {/* 📌 Dropdowns Section */}
//         <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
//           {showDropdowns && (
//             <button
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
//               onClick={() => setShowDropdowns(false)}
//             >
//               ✕
//             </button>
//           )}
//           <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
//         </div>
//       </div>

//       {/* 🌍 Main Layout */}
//       <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] mt-1 px-4 md:px-6 lg:px-8">
//         {/* 🗺️ Map Section */}
//         <div
//           className={`relative w-full md:w-1/2 h-full transition-all duration-300 ${
//             showMap ? "block fixed inset-0 z-50 bg-white" : "hidden md:block"
//           }`}
//         >
//           <MapComponent
//             center={mapCenter}
//             properties={filteredProperties}
//             onVisiblePropertiesChange={handleVisiblePropertiesChange}
//           />
//           <button
//             className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-md md:hidden"
//             onClick={() => setShowMap(false)}
//           >
//             List View
//           </button>
//         </div>

//         {/* 🏡 Property List Section */}
//         <div
//           className={`w-full md:w-1/2 overflow-y-auto max-h-full px-4 transition-all duration-300 ${
//             showMap ? "hidden" : "block"
//           }`}
//         >
//           <div className="flex justify-center gap-2 mb-2">
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded-md md:hidden"
//               onClick={() => setShowMap(true)}
//             >
//               Map View
//             </button>
//           </div>
//           <PropertyDetails properties={visibleProperties.length > 0 ? visibleProperties : filteredProperties} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Display_D;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyDetails from "../Components/Cards";
import PropertyDropdowns from "../Components/MapDropdown";
import MapComponent from "../Components/MapSection";
import DemoNavbar from "../Components/Header";

const Display_D = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // States for filters and properties
  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
    budget: "",
  });

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });

  // 🆕 **Load Filters from URL when page loads**
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      location: params.get("city") || "",
      bhk: params.get("bhkType") || "",
      budget: params.get("budgetMax") || "",
    };
    setFilters(newFilters);
  }, [location.search]);

  // ✅ Update filters and URL when dropdowns change
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    navigate(`?${params.toString()}`, { replace: true });
  };

  // ✅ Fetch properties whenever filters change
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { location, bhk, budget } = filters;
        const params = new URLSearchParams();

        if (location) params.append("city", location);
        if (bhk) params.append("bhkType", bhk.toUpperCase());
        if (budget) params.append("budgetMax", budget);

        if (!location && !bhk && !budget) return;

        const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl);
        // if (!response.ok) throw new Error("Failed to fetch properties");
        if (!response.ok) {
          if (response.status === 404) {
            const errorData = await response.json();
            alert(errorData.message || "No properties found for the selected filters.");
            setAllProperties([]); // Clear previous projects
            return;
          }
          throw new Error("Failed to fetch projects");
        }
    
        const data = await response.json();
        if (data.length === 0) {
          alert(`${bhk ? bhk.toUpperCase() : "Property"} for the search criteria is not available.`);
          setAllProperties([]);
          return;
        }

        const validProperties = data.map((property) => ({
          ...property,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
          bhk: property.bhk_1 || property.bhk_2 || property.bhk_3,
          name: property.projectName,
          image: property.projectImages ? property.projectImages[0] : "",
        }));

        setAllProperties(validProperties);
        setFilteredProperties(validProperties);

        if (validProperties.length > 0) {
          setMapCenter({ lat: validProperties[0].latitude, lng: validProperties[0].longitude });
        }

      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [filters]); // ✅ Runs API call when filters change

  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
    {/* 🏠 Navbar */}
    <DemoNavbar />

<div className="pt-16 sm:pt-12">
  {/* 🌟 Mobile View: Show Filters Summary + Edit Button */}
  <div className="block md:hidden mb-4">
    {!showDropdowns && (
      <div className="flex justify-between items-center bg-gray-500 p-2 rounded-md">
        <p className="text-sm font-medium text-white">
          Location: {filters.location || "Any"}, 
          Budget: {filters.budget || "Any"}, 
          BHK: {filters.bhk || "Any"}
        </p>
        <button 
          className="text-blue-600 underline text-sm" 
          onClick={() => setShowDropdowns(true)}
        >
          Edit Search
        </button>
      </div>
    )}
    
  </div>

  {/* 📌 Dropdowns Section (Hidden on mobile initially, visible on large screens) */}
  <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
    {showDropdowns && (
      <button 
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs" 
        onClick={() => setShowDropdowns(false)}
      >
        ✕
      </button>
    )}
    <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
  </div>
</div>

    {/* 🌍 Main Layout (Map Left, Properties Right) */}
    <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] mt-1 px-4 md:px-6 lg:px-8">
      {/* 🗺️ Map Section */}
      <div
        className={`relative w-full md:w-1/2 h-full transition-all duration-300 ${
          showMap ? "block fixed inset-0 z-50 bg-white" : "hidden md:block"
        }`}
      >
        <MapComponent 
          center={mapCenter} 
          properties={filteredProperties}
          onVisiblePropertiesChange={handleVisiblePropertiesChange}
        />
        {/* 🔘 Button to switch to List View on small screens */}
        <button
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-md md:hidden"
          onClick={() => setShowMap(false)}
        >
          List View
        </button>
      </div>
      

      {/* 🏡 Property List Section */}
      <div
        className={`w-full md:w-1/2 overflow-y-auto max-h-full px-4 transition-all duration-300 ${
          showMap ? "hidden" : "block"
        }`}
      >
         {/* 🗺️ Map & List Buttons (Above Cards) */}
         <div className="flex justify-center gap-2 mb-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md md:hidden"
              onClick={() => setShowMap(true)}
            >
              Map View
            </button>
          </div>
          <PropertyDetails properties={visibleProperties.length > 0 ? visibleProperties : filteredProperties} />
        </div>
      </div>
    </div>
    
  );
};

export default Display_D;
