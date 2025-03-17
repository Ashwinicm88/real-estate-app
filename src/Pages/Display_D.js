import React, { useState, useEffect } from "react";
import PropertyList from "../Components/PropertyList";
import PropertyFilters from "../Components/PropertyFilters";
import MapComponent from "../Components/GoogleMap";

const Display_D = () => {
  const [selectedBHK, setSelectedBHK] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(5000000);
  const [selectedLocation, setSelectedLocation] = useState("Pune");
  const [selectedArea, setSelectedArea] = useState("");
  //Display Property List
 // Store all properties and filtered properties
 const [allProperties, setAllProperties] = useState([]);
 const [filteredProperties, setFilteredProperties] = useState([]);

 const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });

  useEffect(() => {

    const fetchProperties = async () => { //Fetch the all Properties
      try {
        const response = await fetch("http://localhost:5000/filter-details");
        const data = await response.json();
        console.log("Fetched Properties:", data);

      // Validate and transform data
      const validProperties = data
        .filter((property) => property.latitude && property.longitude)
        .map((property) => ({
          ...property,
          latitude: parseFloat(property.latitude),
          longitude: parseFloat(property.longitude),
        }));

      console.log("Valid Properties for Map and Table:", validProperties);

      setAllProperties(validProperties);
      setFilteredProperties(validProperties);

     // Update center to the first valid property if available
     if (validProperties.length > 0) {
       setMapCenter({
         lat: validProperties[0].latitude,
         lng: validProperties[0].longitude,
       });
     }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

   // Filter properties based on user input
   useEffect(() => {
    const applyFilters = () => {
      const filtered = allProperties.filter((property) => {
        const matchesLocation =
          !selectedLocation || property.location.includes(selectedLocation);
        const matchesArea = !selectedArea || property.location.includes(selectedArea);
        const matchesBHK =
          !selectedBHK ||
          (selectedBHK === "1" && property.bhk_1) ||
          (selectedBHK === "2" && property.bhk_2) ||
          (selectedBHK === "3" && property.bhk_3);
        const matchesBudget = property.price <= selectedBudget;

        return matchesLocation && matchesArea && matchesBHK && matchesBudget;
      });

      setFilteredProperties(filtered);

      // Update map center if results exist
      if (filtered.length > 0) {
        setMapCenter({
          lat: filtered[0].latitude,
          lng: filtered[0].longitude,
        });
      }

      console.log("Filtered Properties:", filtered);
    };

    applyFilters();
  }, [selectedLocation, selectedArea, selectedBHK, selectedBudget, allProperties]);


  return (
    <div className="w-full p-4 bg-white min-h-screen">
       {/* Display PropertyFilters */}
       <div className="flex flex-col md:flex-row gap-4">
       <div className="md:w-1/4 bg-gray-900 p-4 rounded-lg text-white">
       <PropertyFilters
            onLocationChange={setSelectedLocation}
            onAreaChange={setSelectedArea}
            onBHKChange={setSelectedBHK}
            onBudgetChange={setSelectedBudget}
            selectedBudget={selectedBudget}
          />
        </div>
      {/* Render Google Map Component */}
      <div className="md:w-3/4">
      <MapComponent center={mapCenter} properties={filteredProperties} />
      </div>
    </div>
    {/* Render Property List component*/}
     <div className="mt-4">
     <PropertyList properties={filteredProperties} />
     </div>
      
    </div>
  );
  
};

export default Display_D;


