// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import CustomSwiper from "../Components/CustomSwiper";
 
// const PropertyList = ({ properties }) => {
//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }
 
//   console.log("Received Properties:", properties);
//   const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    
 
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//       {properties.map((property) => (
//         <div
//           key={property.Wing_Id || property.Project_Id}
//           className="border border-gray-500  rounded-lg shadow-2xl bg-black"
//         >
//   {property.projectImages?.length > 0 ? (
//   <CustomSwiper images={property.projectImages.map(img => `${BASE_URL}${img}`)} />
// ) : (
//   <p className="text-gray-400 text-center p-2">No images available.</p>
// )}

         
//           <div className="p-1">
//             {/* ✅ Project Name */}
//             <h2 className="text-lg font-semibold text-white">
//             ₹{property.priceMax?.toLocaleString() || "N/A"}
//             </h2>
 
//             {/* ✅ BHK Types */}
//             <p className="text-white">
//               BHK:{
//                 property.availableBHKs && property.availableBHKs.length>0
//                 ? property.availableBHKs.map(bhk => bhk.replace("BHK","")).join(", ")
//                 :"N/A"
//               }
//               | Units: {property.units || "N/A"} | Location: {property.city || "Unknown"}
//             </p>
 
//             {/* ✅ Budget */}
//             <p className="text-white">
            
            
//               {property.address || "N/A"}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
 
// export default PropertyList;
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import CustomSwiper from "../Components/CustomSwiper";
 
 
const PropertyList = ({ properties }) => {
  const navigate = useNavigate(); // React Router navigation hook
  const [apiResponse,setApiResponse] = useState([null]);
 
  useEffect(() => {
    if (properties && properties.length > 0) {
      properties.forEach((property) => {
        fetch(`http://localhost:8080/api/entities/${property.projectId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(`API Response for Project ID ${property.projectId}:`, data);
            setApiResponse(data); // ✅ Store API response if needed
          })
          .catch((error) => console.error("Error fetching data:", error));
      });
    }
  }, [properties]);
 
  if (!properties || properties.length === 0) {
    return <p className="text-gray-600">No properties found.</p>;
  }
 
  console.log("Received Properties:", properties);
  const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {properties
        .filter(property => property && property.projectId) // ✅ Proper filtering
        .map((property, index) => {
          console.log("Property at index:", index, property);
 
          return (
            <div
              key={property.projectId} // ✅ Correct projectId usage
              className="border border-gray-500 rounded-lg shadow-2xl bg-black cursor-pointer"
              onClick={() => {
                console.log("Navigating to project:", property.projectId);
                navigate(`/property-details/${property.projectId}`);
              }}
            >
              {/* ✅ Render Swiper if images exist, otherwise show message */}
              {property.projectImages?.length > 0 ? (
                <CustomSwiper images={property.projectImages.map(img => `${BASE_URL}${img}`)} />
              ) : (
                <p className="text-gray-400 text-center p-2">No images available.</p>
              )}
 
              <div className="p-1">
                {/* ✅ Project Price */}
                <h2 className="text-lg font-semibold text-white">
                  ₹{property.priceMax?.toLocaleString() || "N/A"}
                </h2>
 
                {/* ✅ BHK Types */}
                <p className="text-white">
                  BHK: {property.availableBHKs?.length > 0
                    ? property.availableBHKs.map(bhk => bhk.replace("BHK", "")).join(", ")
                    : "N/A"}
                  | Units: {property.units || "N/A"} | Location: {property.city || "Unknown"}
                </p>
 
                {/* ✅ Address */}
                <p className="text-white">
                  {property.address || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
 
export default PropertyList;