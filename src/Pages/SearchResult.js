<<<<<<< HEAD

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
=======
// import React, { useState, useEffect, useCallback } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import Header from "../Components/Header"; // Import your header
// import Footer from "../Components/DiscoverServices"; // Import your footer

// const mapContainerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const center = {
//   lat: 18.5204, // Pune
//   lng: 73.8567,
// };

// const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Use your API Key

// // 🏡 Property Listings
// const propertyListings = [
//   { id: 1, lat: 18.5214, lng: 73.8543, price: "₹75L", beds: 2, image: "https://via.placeholder.com/150" },
//   { id: 2, lat: 18.5310, lng: 73.8621, price: "₹1.5Cr", beds: 3, image: "https://via.placeholder.com/150" },
//   { id: 3, lat: 18.5407, lng: 73.8702, price: "₹95L", beds: 3, image: "https://via.placeholder.com/150" },
//   { id: 4, lat: 18.5503, lng: 73.8805, price: "₹2Cr", beds: 4, image: "https://via.placeholder.com/150" },
// ];

// const SearchResults = () => {
//   const [map, setMap] = useState(null);
//   const [visibleProperties, setVisibleProperties] = useState([]);

//   // Filter properties inside the visible map bounds
//   const filterVisibleProperties = useCallback(() => {
//     if (!map) return;
//     const bounds = map.getBounds();
//     if (!bounds) return;

//     const filtered = propertyListings.filter((prop) =>
//       bounds.contains({ lat: prop.lat, lng: prop.lng })
//     );

//     setVisibleProperties(filtered);
//   }, [map]);

//   // Listen for zoom or pan events to update visible properties
//   useEffect(() => {
//     if (!map) return;

//     const listener = map.addListener("idle", filterVisibleProperties);
//     return () => listener.remove(); // Cleanup listener on unmount
//   }, [map, filterVisibleProperties]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* 🏠 Header Section */}
//       <Header />

//       {/* 🌍 Main Content: Map & Property Cards */}
//       <div style={{ display: "flex", flex: 1 }}>
//         {/* 🗺️ Left Section: Google Map (50%) */}
//         <div style={{ width: "50%" }}>
//           <LoadScript googleMapsApiKey={API_KEY}>
//             <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               center={center}
//               zoom={12}
//               onLoad={setMap} // Set the map instance
//             >
//               {propertyListings.map((prop) => (
//                 <Marker
//                   key={prop.id}
//                   position={{ lat: prop.lat, lng: prop.lng }}
//                   title={`₹${prop.price} - ${prop.beds} BHK`}
//                 />
//               ))}
//             </GoogleMap>
//           </LoadScript>
//         </div>

//         {/* 🏡 Right Section: Property Cards (50%) */}
//         <div
//           style={{
//             width: "50%",
//             backgroundColor: "black",
//             padding: "20px",
//             overflowY: "scroll",
//           }}
//         >
//           <h2 style={{ color: "white", textAlign: "center" }}>Search Results</h2>
//           {visibleProperties.length === 0 ? (
//             <p style={{ color: "white", textAlign: "center" }}>No properties found.</p>
//           ) : (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, 1fr)", // 🔥 Two columns
//                 gap: "15px",
//               }}
//             >
//               {visibleProperties.map((prop) => (
//                 <div
//                   key={prop.id}
//                   style={{
//                     border: "1px solid white",
//                     padding: "10px",
//                     color: "white",
//                     textAlign: "center",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <img
//                     src={prop.image}
//                     alt="property"
//                     style={{ width: "100%", height: "120px", borderRadius: "5px" }}
//                   />
//                   <p>Price: {prop.price}</p>
//                   <p>Beds: {prop.beds}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 📌 Footer Section */}
//       <Footer />
//     </div>
//   );
// };

// export default SearchResults;

import React, { useState, useEffect } from "react";
>>>>>>> 804eb2b (Home Page Design Completed)
import PropertyDetails from "../Components/Cards";
import PropertyDropdowns from "../Components/MapDropdown";
import MapComponent from "../Components/MapSection";
import DemoNavbar from "../Components/Header";

<<<<<<< HEAD
const Display_D = () => {
  const location = useLocation();
  const navigate = useNavigate();

=======

const Display_D = () => {
>>>>>>> 804eb2b (Home Page Design Completed)
  // States for filters and properties
  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
<<<<<<< HEAD
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

=======
    budget:100000000,
  });
  

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState([]); 
  const [showMap, setShowMap] = useState(false); // ✅ Toggle map/list view for small screens
  const [showDropdowns, setShowDropdowns] = useState(false); // ✅ Toggle Dropdowns
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune Default

  // Fetch properties from backend when component loads
   // ✅ Function to update visible properties based on the map view
   const handleVisiblePropertiesChange = (visibleProps) => {
    setVisibleProperties(visibleProps);
    console.log("Visible Properties Updated:", visibleProps);
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/full-details");
        const data = await response.json();

        // Ensure valid latitude & longitude
>>>>>>> 804eb2b (Home Page Design Completed)
        const validProperties = data.map((property) => ({
          ...property,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
<<<<<<< HEAD
          bhk: property.bhk_1 || property.bhk_2 || property.bhk_3,
          name: property.projectName,
          image: property.projectImages ? property.projectImages[0] : "",
        }));

        setAllProperties(validProperties);
        setFilteredProperties(validProperties);

        if (validProperties.length > 0) {
          setMapCenter({ lat: validProperties[0].latitude, lng: validProperties[0].longitude });
        }

=======
          bhk: property.bhk_1 || property.bhk_2 || property.bhk_3, // Ensure BHK status
          name: property.project_name, // Ensure name is sent
          image:property.bhk2_type1_images,
        }));

        setAllProperties(validProperties);
        setFilteredProperties(validProperties); // Initially display all properties

        // Set map to the first property if available
        if (validProperties.length > 0) {
          setMapCenter({
            lat: validProperties[0].latitude,
            lng: validProperties[0].longitude,
          });
        }
        console.log("DATa",validProperties);
>>>>>>> 804eb2b (Home Page Design Completed)
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
<<<<<<< HEAD
  }, [filters]); // ✅ Runs API call when filters change

  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
      <DemoNavbar />
      <div className="pt-16 sm:pt-12">

      {/* 🌟 Mobile View: Show Filters Summary */}
      <div className="block md:hidden mb-4">
        {!showDropdowns && (
          <div className="flex justify-between items-center bg-gray-500 p-2 rounded-md">
            <p className="text-sm font-medium text-white">
              Location: {filters.location || "Any"}, Budget: {filters.budget || "Any"}, BHK: {filters.bhk || "Any"}
            </p>
            <button className="text-blue-600 underline text-sm" onClick={() => setShowDropdowns(true)}>
              Edit Search
            </button>
          </div>
        )}
      </div>

      {/* 📌 Dropdowns Section */}
      <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
        {showDropdowns && (
          <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs" onClick={() => setShowDropdowns(false)}>
            ✕
          </button>
        )}
        <PropertyDropdowns filters={filters} updateFilter={updateFilter} />
      </div>

      {/* 🌍 Main Layout */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] mt-1 px-4 md:px-6 lg:px-8">
        {/* 🗺️ Map Section */}
        <div className={`relative w-full md:w-1/2 h-full transition-all duration-300 ${showMap ? "block fixed inset-0 z-50 bg-white" : "hidden md:block"}`}>
          <MapComponent center={mapCenter} properties={filteredProperties} onVisiblePropertiesChange={setVisibleProperties} />
          <button className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-md md:hidden" onClick={() => setShowMap(false)}>
            List View
          </button>
        </div>

        {/* 🏡 Property List Section */}
        <div className={`w-full md:w-1/2 overflow-y-auto max-h-full px-4 transition-all duration-300 ${showMap ? "hidden" : "block"}`}>
          <div className="flex justify-center gap-2 mb-2">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md md:hidden" onClick={() => setShowMap(true)}>
              Map View
            </button>
          </div>
          <PropertyDetails properties={visibleProperties.length > 0 ? visibleProperties : filteredProperties} />
        </div>
      </div>
    </div>
    </div>
=======
  }, []);

  // Apply filters dynamically
  useEffect(() => {
    const applyFilters = () => {
      const { location, bhk, budget  } = filters;

      const filtered = allProperties.filter((property) => {
        const matchesLocation =
          !location || property.location.toLowerCase().includes(location.toLowerCase());
        const matchesBHK =
          !bhk ||
          (bhk === "1" && property.bhk_1) ||
          (bhk === "2" && property.bhk_2) ||
          (bhk === "3" && property.bhk_3);

        const matchesBudget = !budget || property.budget <= budget;

        return matchesLocation && matchesBHK  && matchesBudget;
      });

      setFilteredProperties(filtered);

      // Update map center based on the first filtered property
      if (filtered.length > 0) {
        setMapCenter({
          lat: filtered[0].latitude,
          lng: filtered[0].longitude,
        });
      }
    };

    applyFilters();
  }, [filters, allProperties]);

  // Update filter handler
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

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
>>>>>>> 804eb2b (Home Page Design Completed)
  );
};

export default Display_D;
<<<<<<< HEAD
=======

>>>>>>> 804eb2b (Home Page Design Completed)
