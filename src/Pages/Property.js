import { useState, useEffect } from "react";
import CustomSwiper from "../Components/CustomSwiper";
import Header from "../Components/Header";
import PhoneIcon from "@mui/icons-material/Phone";
import Calculations from "../Components/Calculations";
import { useParams } from "react-router-dom";
 
const bhkOptions = [
  "1 BHK",
  "Amenities",
  "Nearby",
  "Calculations",
];
 
const PropertyDetails = () => {
  const { projectId } = useParams(); // 🔹 Get Project_Id from URL
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedBHK, setSelectedBHK] = useState("oneBHKConfig");
  const [showCalculations, setShowCalculations] = useState(false);
  const Image_URL = "http://localhost:8080"; // Update API URL
  const BASE_URL = `http://localhost:8080/api/entities/${projectId}`;
  const [error, setError] = useState("");
 
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(BASE_URL);
 
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
 
        if (!data || Object.keys(data).length === 0) {
          setError("Property not found.");
          setProperty(null);
        } else {
          setProperty(data);
          setError("");  // Clear error if data exists
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Error loading property details.");
      }
    };
 
    if (projectId) fetchPropertyDetails();
  }, [projectId]);
 
  if (!property && !error) {
    return <p className="text-white">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!property) return <p className="text-red-500">Property not found.</p>;
 
  // Handle filtered details based on selected BHK
  const filteredDetails =
    selectedBHK === "1 BHK"
      ? property?.oneBHKConfig || []
      : selectedBHK === "Amenities"
      ? property?.Amenities || {}
      : selectedBHK === "Nearby"
      ? property?.Nearby || {}
      : [];
 
  const handleBHKChange = (bhk) => {
    setSelectedBHK(bhk);
    setShowCalculations(bhk === "Calculations");
  };
 
  const layout = [];
  const area = [];
 
  // Create layout for Amenities
  if (selectedBHK === "Amenities") {
    layout.push("Amenities");
    const amenities = JSON.parse(property.Amenities.swimmingPool || "[]");
    area.push(`Swimming Pool: ${amenities[0] || "Not Available"}`);
    // Add other amenities similarly
    // Example for gym
    const gym = JSON.parse(property.Amenities.gym || "[]");
    area.push(`Gym: ${gym[0] || "Not Available"}`);
    // Continue for other amenities...
  } else if (selectedBHK === "Nearby") {
    layout.push("Nearby Places");
    const schools = JSON.parse(property.Nearby.schools || "[]");
    area.push(`Schools: ${schools.join(", ") || "No schools available"}`);
    // Add other nearby places similarly
  } else if (selectedBHK === "1 BHK") {
    layout.push("Hall", "Kitchen", "Bed 1");
    const bhkConfig = filteredDetails[0]; // Assuming we take the first config
    area.push(bhkConfig.hallArea, bhkConfig.kitchenArea, bhkConfig.bedroom1Area);
    if (bhkConfig.bedroom3Area) {
      layout.push("Bed 3");
      area.push(bhkConfig.bedroom3Area);
    }
    layout.push("Bath 1");
    area.push(bhkConfig.bathroom1Area);
    if (bhkConfig.bathroom2Area) {
      layout.push("Bath 2");
      area.push(bhkConfig.bathroom2Area);
    }
    

  
    layout.push("Balcony", "Parking");
    area.push(
      (bhkConfig.type1Balcony || 0) +
        (bhkConfig.type2Balcony || 0) +
        (bhkConfig.type3Balcony || 0)
    );
    area.push(
      (bhkConfig.type1Parking || 0) +
        (bhkConfig.type2Parking || 0) +
        (bhkConfig.type3Parking || 0)
    );

  }
 

 

 
    // Add other areas similarly...
  
 
  return (
<div className="bg-black text-white px-4 sm:px-6 lg:px-14">
<Header />
<div className="bg-black text-white p-6 lg:p-8">
<div className="flex justify-between items-center flex-wrap pt-8">
          {property?.projectName && (
<h1 className="text-yellow-400 text-xl font-bold mt-1">
              {property.projectName}, {property.address}
</h1>
          )}
<p className="text-gray-200 text-lg mt-1">
            Property range from ₹{property.priceMin} to ₹{property.priceMax}
</p>
</div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
<div className="max-w-full md:max-w-[70%] mx-auto mb-3">
<h2 className="text-gray-300 text-lg font-bold mb-1">
              Project Pictures
</h2>
<CustomSwiper
              key={`swiper-project-${selectedBHK}`}
              images={
                Array.isArray(property?.projectImages) && property.projectImages.length > 0
                  ? property.projectImages.map((img) => `${Image_URL}${img}`)
                  : [
                      "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    ]
              }
            />
</div>
<div className="max-w-full md:max-w-[70%] mx-auto">
<h2 className="text-gray-300 text-lg font-bold mb-1">Floor Plans</h2>
<CustomSwiper
              key={`swiper-floor-${selectedBHK}`}
              images={
                Array.isArray(property?.oneBHKConfig) && property.oneBHKConfig.length > 0
                  ? property.oneBHKConfig[0].type1FloorPlan.map(img => `${Image_URL}${img}`)
                  : ["https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
              }
            />
</div>
</div>
 
        <div className="overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
<div className="flex space-x-4 border-b border-gray-600">
            {bhkOptions.map((bhk) => (
<button
                key={bhk}
                onClick={() => handleBHKChange(bhk)}
                className={`px-4 py-2 ${
                  selectedBHK === bhk
                    ? "text-white border-b-2 border-white"
                    : "text-[#36454F]"
                } transition duration-200`}
>
                {bhk}
</button>
            ))}
</div>
</div>
 
        {filteredDetails.length > 0 || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
<div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
<div className="p-4 rounded-lg shadow-md">
<h2 className="text-lg font-bold text-white">{selectedBHK}</h2>
<div className="overflow-x-auto mt-2">
<table className="min-w-full text-left border-collapse">
<thead>
<tr className="border-b border-gray-600">
                      {layout.map((room, idx) => (
<th key={idx} className="p-2 text-center text-gray-300">{room}</th>
                      ))}
</tr>
</thead>
<tbody>
<tr className="border-b border-gray-600">
                      {area.map((areaVal, idx) => (
<td key={idx} className="p-2 text-center text-gray-200">{areaVal}</td>
                      ))}
</tr>
</tbody>
</table>
</div>
</div>
</div>
        ) : (
<p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
        )}
 
        {/* Calculations Section */}
        {showCalculations && <Calculations />}
 
        <div className="fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
<PhoneIcon className="w-5 h-5 text-yellow-500" />
<span>Book Consultation</span>
</div>
</div>
</div>
  );
}
 
export default PropertyDetails;