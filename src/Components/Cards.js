// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useNavigate } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";
 
// const PropertyList = ({ properties }) => {
//   const navigate = useNavigate(); // React Router navigation hook

//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }
 
//   console.log("Received Properties:", properties);
//   const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    
 
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//       {properties.map((property,index) => (
//         console.log("Property at index:",index,property);
//         if(!property){
//           return <p  key={index} className="text-red-500">Error: Invalid property data</p>;
//         }
//         <div
//           key={property.Wing_Id || property.Project_Id}
//           className="border border-gray-500  rounded-lg shadow-2xl bg-black"
//           onClick={() => navigate(`/property-details/${property.property.id}`)}
//         >
//           {/* ✅ Image Slider
//           {property.bhk2_type1_images?.length > 0 ? (
//             <Swiper
//               modules={[Navigation, Pagination]}
//               navigation
//               pagination={{ clickable: true }}
//               className="h-40"
//             >
//               {property.bhk2_type1_images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={img}
//                     alt={`${property.Project_Name || "Property"} ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg" // Added rounded corners for images
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <p className="text-gray-400">No images available.</p>
//           )} */}
 
//            {/* ✅ Render Swiper only if images exist */}
//           {/* ✅ Render Swiper if images exist, otherwise show message
// {property.image?.length > 0 ? (
//   <CustomSwiper images={property.projectImages} />
// ) : (
//   <p className="text-gray-400 text-center p-2">No images available.</p>
// )}
//   */}
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
//               {/* {property.bhk_1 ? " 1," : ""}
//               {property.bhk_2 ? " 2," : ""}
//               {property.bhk_3 ? " 3" : ""} */}
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

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useNavigate } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";

// const PropertyList = ({ properties }) => {
//   const navigate = useNavigate(); // React Router navigation hook

//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }

//   console.log("Received Properties:", properties);
//   const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//       {properties.map((property, index) => {
//         console.log("Property at index:", index, property);

//         if (!property) {
//           return (
//             <p key={index} className="text-red-500">
//               Error: Invalid property data
//             </p>
//           );
//         }

//         return (
//           <div
//             key={property.Project_Id} // Corrected to use `Project_Id`
//             className="border border-gray-500 rounded-lg shadow-2xl bg-black"
//             onClick={() => {
//               console.log("Navigating to project:", property.projectId); // Debugging
//               if (property.projectId) {
//                 navigate(`/property-details/${property.projectId}`);
//               } else {
//                 console.error("Project ID is undefined:", property);
//               }
//             }}
//             // onClick={() => navigate(`/property-details/${property.Project_Id}`)} // Corrected `Project_Id`
//           >
//             {/* ✅ Render Swiper if images exist, otherwise show message */}
//             {property.projectImages?.length > 0 ? (
//               <CustomSwiper images={property.projectImages.map(img => `${BASE_URL}${img}`)} />
//             ) : (
//               <p className="text-gray-400 text-center p-2">No images available.</p>
//             )}

//             <div className="p-1">
//               {/* ✅ Project Name */}
//               <h2 className="text-lg font-semibold text-white">
//                 ₹{property.priceMax?.toLocaleString() || "N/A"}
//               </h2>

//               {/* ✅ BHK Types */}
//               <p className="text-white">
//                 BHK: {property.availableBHKs?.length > 0
//                   ? property.availableBHKs.map(bhk => bhk.replace("BHK", "")).join(", ")
//                   : "N/A"}
//                 | Units: {property.units || "N/A"} | Location: {property.city || "Unknown"}
//               </p>

//               {/* ✅ Address */}
//               <p className="text-white">
//                 {property.address || "N/A"}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PropertyList;
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useNavigate } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";

// const PropertyList = ({ properties }) => {
//   const navigate = useNavigate(); // React Router navigation hook

//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }

//   console.log("Received Properties:", properties);
//   const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//       {properties.filter(property => [property && property.projectId])
//       map((property, index) => {
//         console.log("Property at index:", index, property);

//         // ✅ Use the correct project ID key based on API response
//         const projectId = property.projectId || property.Project_Id; 

//         if (!property || !projectId) {
//           return (
//             <p key={index} className="text-red-500">
//               Error: Invalid property data
//             </p>
//           );
//         }

//         return (
//           <div
//             key={projectId} // ✅ Use the correct project ID
//             className="border border-gray-500 rounded-lg shadow-2xl bg-black cursor-pointer"
//             onClick={() => {
//               console.log("Navigating to project:", projectId); // ✅ Log projectId
//               navigate(`/property-details/${projectId}`);
//             }}
//           >
//             {/* ✅ Render Swiper if images exist, otherwise show message */}
//             {property.projectImages?.length > 0 ? (
//               <CustomSwiper images={property.projectImages.map(img => `${BASE_URL}${img}`)} />
//             ) : (
//               <p className="text-gray-400 text-center p-2">No images available.</p>
//             )}

//             <div className="p-1">
//               {/* ✅ Project Price */}
//               <h2 className="text-lg font-semibold text-white">
//                 ₹{property.priceMax?.toLocaleString() || "N/A"}
//               </h2>

//               {/* ✅ BHK Types */}
//               <p className="text-white">
//                 BHK: {property.availableBHKs?.length > 0
//                   ? property.availableBHKs.map(bhk => bhk.replace("BHK", "")).join(", ")
//                   : "N/A"}
//                 | Units: {property.units || "N/A"} | Location: {property.city || "Unknown"}
//               </p>

//               {/* ✅ Address */}
//               <p className="text-white">
//                 {property.address || "N/A"}
//               </p>
//             </div>
//           </div>
//         );
//       })}
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
