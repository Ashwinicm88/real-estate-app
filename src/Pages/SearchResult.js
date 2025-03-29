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
  
    setFilters((prevFilters) => ({
      location: params.get("city") || prevFilters.location,
      bhk: params.get("bhkType") || prevFilters.bhk,
      budget: params.get("budgetMax") || prevFilters.budget,
    }));
  }, [location.search]);
  
 
  // ✅ Update filters and URL when dropdowns change
  const updateFilter = (key, value) => {
    setFilters((prevFilters) => {
      // ✅ Ensure only the selected key is updated
      const updatedFilters = { ...prevFilters, [key]: value };
  
      // ✅ Update URL params (only modifying the changed key)
      const params = new URLSearchParams(location.search);
      Object.entries(updatedFilters).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
  
      navigate(`?${params.toString()}`, { replace: true });
  
      return updatedFilters; // ✅ Keep other values unchanged
    });
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
      <DemoNavbar />
      <div className="pt-16 sm:pt-12">
 
      {/* 🌟 Mobile View: Show Filters Summary */}
      <div className="block md:hidden mb-4">
        {!showDropdowns && (
          <div className="flex justify-between items-center p-2 rounded-md">
            <p className="text-sm font-medium text-white">
              Location: {filters.location || "Any"}, Budget: {filters.budget || "Any"}, BHK: {filters.bhk || "Any"}
            </p>
            <button className="text-blue-600 text-sm" onClick={() => setShowDropdowns(true)}>
              Edit Search
            </button>
          </div>
        )}
      </div>
 
      {/* 📌 Dropdowns Section */}
      <div className={`${showDropdowns ? "block" : "hidden md:block"} relative`}>
        {showDropdowns && (
          <button className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs" onClick={() => setShowDropdowns(false)}>
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
          <button className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-transparent border border-white text-white px-4 py-2 rounded-md md:hidden" onClick={() => setShowMap(false)}>
            View List
          </button>
        </div>
 
        {/* 🏡 Property List Section */}
        <div className={`w-full md:w-1/2 overflow-y-auto max-h-full px-4 transition-all duration-300 ${showMap ? "hidden" : "block"}`}>
          <div className="realative">
          <button
    className="absolute overflow bottom-4 right-4 bg-transparent border border-white text-white px-4 py-2 rounded-md md:hidden"
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