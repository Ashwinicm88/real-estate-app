// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import PropertyDetails from "../Components/Cards";
// import PropertyDropdowns from "../Components/MapDropdown";
// import MapComponent from "../Components/MapSection";
// import DemoNavbar from "../Components/Header";

// const Display_D = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // States for filters and properties
//   const [filters, setFilters] = useState({
//     location: "",
//     bhk: "",
//     budget: "",
//     typeProperty: "",
//   });

//   const [allProperties, setAllProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [visibleProperties, setVisibleProperties] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showDropdowns, setShowDropdowns] = useState(false);
//   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });

//   const [cameFromAffordability, setCameFromAffordability] = useState(false);

//   // Load Filters from URL when page loads
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const cityParam = params.get("city");
//     const budgetParam = params.get("budgetMax");

//     if(budgetParam) setCameFromAffordability(true);
  
//     // console.log("URL Params:", { city: cityParam, budget: homeAffordabilityParam });
//      // ✅ Set the flag only if homeAffordability is present

//     setFilters((prevFilters) => ({
//       location: params.get("city") || prevFilters.location,
//       bhk: params.get("bhkType") || prevFilters.bhk,
//       budget: params.get("budgetMax") || prevFilters.budget || budgetParam,
//       typeProperty: params.get("typeProperty") || prevFilters.typeProperty,
//     }));
//     if (location.search) {
//       fetchProperties(); // Fetch only if filters exist
//     } else {
//       fetchAllProperties(); // Fetch all properties if no filters
//     }
//     // fetchProperties();
//   }, [location.search]);

//  // ✅ Set budget only from homeAffordability param


//   // Update filters and URL when dropdowns change
//   const updateFilter = (key, value) => {
//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters, [key]: value };

//         // ✅ Reset BHK if typeProperty changes to non-residential
//     if (key === "typeProperty" && !["Apartment", "Bungalow"].includes(value)) {
//       updatedFilters.bhk = ""; // Clear BHK selection
//     }
    
//       const params = new URLSearchParams(location.search);
//       Object.entries(updatedFilters).forEach(([k, v]) => {
//         if (v) params.set(k, v);
//         else params.delete(k);
//       });

//       navigate(`?${params.toString()}`, { replace: true });

//       return updatedFilters;
//     });
//   };

//   // Fetch properties based on filters
//   const fetchProperties = async () => {
//     try {
//       const { location, bhk, budget,typeProperty } = filters;
//       const params = new URLSearchParams();

//       // Construct the API call based on filters
//       if (location) params.append("city", location);
//       if (bhk) params.append("bhkType", bhk.toUpperCase());
//       if (budget) params.append("budgetMax", budget);
//       if (typeProperty) params.append("typeProperty", typeProperty);

//       // If no filters are applied, fetch all properties
//       const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;
//       console.log("API URL:", apiUrl);

//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         if (response.status === 404) {
//           const errorData = await response.json();
//           alert(errorData.message || "No properties found for the selected filters.");
//           setAllProperties([]); // Clear previous projects
//           return;
//         }
//         throw new Error("Failed to fetch properties");
//       }

//       const data = await response.json();
//       if (data.length === 0) {
//         alert(`${bhk ? bhk.toUpperCase() : "Property"} for the search criteria is not available.`);
//         // setAllProperties([]);
//         return;
//       }

//       const validProperties = data.map((property) => ({
//         ...property,
//         latitude: parseFloat(property.latitude),
//         longitude: parseFloat(property.longitude),
//         bhk: property.bhk_1 || property.bhk_2 || property.bhk_3,
//         name: property.projectName,
//         image: property.projectImages ? property.projectImages[0] : "",
//       }));

//       setAllProperties(validProperties);
//       setFilteredProperties(validProperties);

//       if (validProperties.length > 0) {
//         setMapCenter({ lat: validProperties[0].latitude, lng: validProperties[0].longitude });
//       }

//     } catch (error) { 
//       console.error("Error fetching properties:", error);
//     }
//   };

// // ✅ New Function to Fetch ALL Properties (When No Filters Exist)
// const fetchAllProperties = async () => {
//   try {
//     const response = await fetch("http://localhost:8080/api/entities/search");
//     const data = await response.json();
//     setAllProperties(data);
//     setFilteredProperties(data);
//   } catch (error) {
//     console.error("Error fetching all properties:", error);
//   }
// };
//   // Call fetchProperties when filters change
//   useEffect(() => {
//     // Only fetch properties if filters are set
//     if (filters.location || filters.bhk || filters.budget || filters.typeProperty) {
//       fetchProperties();
//     } else {
//       // If no filters are set, you can choose to fetch all properties or do nothing
//       console.log("No filters set, not fetching properties.");
//     }
//   }, [filters]); // Runs API call when filters change

//   return (
//     <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
//       <DemoNavbar />
//       <div className="pt-16 sm:pt-12">

//         {/* Mobile View: Show Filters Summary */}
//         <div className="block md:hidden mb-4">
//           {!showDropdowns && (
//             <div className="flex justify-between items-center p-2 rounded-md">
//               <p className="text-sm font-medium text-white">
//                 Location: {filters.location || "Any"}, Budget: {filters.budget || "Any"}, BHK: {filters.bhk || "Any"}, Type: {filters.typeProperty || "Any"}
//               </p>
//               <button className="text-blue-600 text-sm" onClick={() => setShowDropdowns(true)}>
//                 Edit Search
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Dropdowns Section */}
//         <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
//           {showDropdowns && (
//             <button className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs" onClick={() => setShowDropdowns(false)}>
//               ✕
//             </button>
//           )}
//           <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
//         </div>

//         {/* Main Layout */}
//         <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] mt-1 px-4 md:px-6 lg:px-8">
//           {/* Map Section */}
//           <div className={`relative w-full md:w-1/2 h-full transition-all duration-300 ${showMap ? "block fixed inset-0 z-50 bg-white" : "hidden md:block"}`}>
//             <MapComponent center={mapCenter} properties={filteredProperties} onVisiblePropertiesChange={setVisibleProperties} />
//             <button className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-transparent border border-white text-white px-4 py-2 rounded-md md:hidden" onClick={() => setShowMap(false)}>
//               View List
//             </button>
//           </div>

//           {/* Property List Section */}
//           <div className={`w-full md:w-1/2 overflow-y-auto max-h-full px-4 transition-all duration-300 ${showMap ? "hidden" : "block"}`}>
//             <div className="relative">
//               <button
//                 className="absolute bottom-4 right-4 bg-transparent border border-white text-white px-4 py-2 rounded-md md:hidden"
//                 onClick={() => setShowMap(true)}
//               >
//                 View Map
//               </button>
//             </div>
//             <PropertyDetails properties={visibleProperties.length > 0 ? visibleProperties : filteredProperties} />
//           </div>
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

  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
    budget: "",
    typeProperty: "",
  });

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
  const [cameFromAffordability, setCameFromAffordability] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const cityParam = params.get("city");
//     const budgetParam = params.get("budgetMax");

//     // if (budgetParam) setCameFromAffordability(true);

//      // Cost of Ownership filters
//      const ownershipCity = params.get("ownershipCity");
//      const ownershipBudget = params.get("ownershipBudget");
// if(ownershipCity && ownershipBudget){
//   const roundedBudget = Math.ceil(parseInt(ownershipBudget) / 500000) * 500000; // Round budget
//   setCameFromAffordability(true);
//   setFilters((prevFilters) => ({
//     ...prevFilters,
//     location: ownershipCity || prevFilters.location,
//     budget: roundedBudget.toString(), // Ensure it's a string
//   }));
// }
//    else if (budgetParam) {
//       const roundedBudget = Math.ceil(parseInt(budgetParam) / 500000) * 500000;
//       setCameFromAffordability(true);
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         location: cityParam || prevFilters.location,
//         bhk: params.get("bhkType") || prevFilters.bhk,
//         budget: roundedBudget.toString(), // <- this ensures it's a string, just like dropdown expects
//         typeProperty: params.get("typeProperty") || prevFilters.typeProperty,
//       }));
//     } 
//     else {
//       setFilters((prevFilters) => ({
//         location: cityParam || prevFilters.location,
//         bhk: params.get("bhkType") || prevFilters.bhk,
//         budget: prevFilters.budget,
//         typeProperty: params.get("typeProperty") || prevFilters.typeProperty,
//       }));
//     }

//     setFilters((prevFilters) => ({
//       location: cityParam || prevFilters.location,
//       bhk: params.get("bhkType") || prevFilters.bhk,
//       budget: budgetParam || prevFilters.budget,
//       typeProperty: params.get("typeProperty") || prevFilters.typeProperty,
//     }));

//     if (location.search) {
//       fetchProperties(params);
//     } else {
//       fetchAllProperties();
//     }
//   }, [location.search]);
useEffect(() => {
  const params = new URLSearchParams(location.search);

  const cityParam = params.get("city");
  const budgetParam = params.get("budgetMax");

  const ownershipCity = params.get("ownershipCity");
  const ownershipBudget = params.get("ownershipBudget");

  if (ownershipCity && ownershipBudget) {
    const roundedBudget = Math.ceil(parseInt(ownershipBudget) / 500000) * 500000;
    setCameFromAffordability(true);
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: ownershipCity || prevFilters.location,
      budget: roundedBudget.toString(),
    }));
  } else if (budgetParam) {
    const roundedBudget = Math.ceil(parseInt(budgetParam) / 500000) * 500000;
    setCameFromAffordability(true);
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: cityParam || prevFilters.location,
      bhk: params.get("bhkType") || prevFilters.bhk,
      budget: roundedBudget.toString(),
      typeProperty: params.get("typeProperty") || prevFilters.typeProperty,
    }));
  } else {
    setFilters((prevFilters) => ({
      location: cityParam || prevFilters.location,
      bhk: params.get("bhkType") || prevFilters.bhk,
      budget: prevFilters.budget,
      typeProperty: params.get("typeProperty") || prevFilters.typeProperty,
    }));
  }

  if (location.search) {
    fetchProperties(params);
  } else {
    fetchAllProperties();
  }
}, [location.search]);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: value };

      if (key === "typeProperty" && !["Apartment", "Bungalow","Residential"].includes(value)) {
        updatedFilters.bhk = "";
      }

      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });

      navigate(`?${params.toString()}`, { replace: true });
      return updatedFilters;
    });
  };

  const fetchProperties = async (paramsFromURL) => {
    try {
      const { location, bhk, budget, typeProperty } = filters;
      const params = new URLSearchParams(paramsFromURL);

      if (!params.has("city") && location) params.set("city", location);
      if (!params.has("bhkType") && bhk) params.set("bhkType", bhk.toUpperCase());
      if (!params.has("budgetMax") && budget) params.set("budgetMax", budget);
      if (!params.has("typeProperty") && typeProperty) params.set("typeProperty", typeProperty);

      const apiUrl = `http://localhost:8080/api/entities/search?${params.toString()}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "No properties found for the selected filters.");
        setAllProperties([]);
        setFilteredProperties([]);
        return;
      }

      const data = await response.json();

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

  const fetchAllProperties = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/entities/search");
      const data = await response.json();

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
    } catch (error) {
      console.error("Error fetching all properties:", error);
    }
  };

  useEffect(() => {
    if (filters.location || filters.bhk || filters.budget || filters.typeProperty) {
      fetchProperties(new URLSearchParams(location.search));
    }
  }, [filters]);

  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
      <DemoNavbar />
      <div className="pt-16 sm:pt-12">
        <div className="block md:hidden mb-4">
          {!showDropdowns && (
            <div className="flex justify-between items-center p-2 rounded-md">
              <p className="text-sm font-medium text-white">
                Location: {filters.location || "Any"}, Budget: {filters.budget || "Any"}, BHK: {filters.bhk || "Any"}, Type: {filters.typeProperty || "Any"}
              </p>
              <button className="text-blue-600 text-sm" onClick={() => setShowDropdowns(true)}>
                Edit Search
              </button>
            </div>
          )}
        </div>

        <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
          {showDropdowns && (
            <button className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs" onClick={() => setShowDropdowns(false)}>
              ✕
            </button>
          )}
          <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
        </div>

        <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] mt-1 px-4 md:px-6 lg:px-8">
          <div className={`relative w-full md:w-1/2 h-full transition-all duration-300 ${showMap ? "block fixed inset-0 z-50 bg-white" : "hidden md:block"}`}>
            <MapComponent center={mapCenter} properties={filteredProperties} onVisiblePropertiesChange={setVisibleProperties} />
            <button
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-transparent border border-white text-white px-4 py-2 rounded-md md:hidden"
              onClick={() => setShowMap(false)}
            >
              View List
            </button>
          </div>

          <div className={`w-full md:w-1/2 overflow-y-auto  h-[calc(100vh-130px)] px-4 transition-all duration-300 ${showMap ? "hidden" : "block"}`}>
            <div className="relative">
            <button
  className="z-50 fixed bottom-4 right-4 bg-tranparent border border-white text-white px-4 py-2 rounded-md shadow md:hidden"
  onClick={() => setShowMap(true)}
>
  View Map
</button>

            </div>
            <PropertyDetails properties={visibleProperties.length > 0 ? visibleProperties : filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display_D;


