<<<<<<< HEAD
=======
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const PropertyList = ({ properties }) => {
//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }

//   console.log("Received Properties:", properties);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//       {properties.map((property) => (
//         <div
//           key={property.Wing_Id || property.Project_Id}
//           className="border border-yellow-500 p-5 rounded-lg shadow-2xl"
//         >
//            {/* ✅ Image Slider */}
//            {property.bhk2_type1_images?.length > 0 ? (
//             <Swiper
//               modules={[Navigation, Pagination]}
//               navigation
//               pagination={{ clickable: true }}
//               className="h-52"
//             >
//               {property.bhk2_type1_images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={img}
//                     alt={`${property.Project_Name || "Property"} ${index + 1}`}
//                     className="w-full h-full object-cover"
                   
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           ) : (
//             <p className="text-gray-400">No images available.</p>
//           )}
//          <div className="p-1">
//           {/* ✅ Project Name */}
//           <h2 className="text-lg font-semibold text-white">
//             {property.project_name || "Unnamed Property"}
//           </h2>

//           {/* ✅ BHK Types */}
//           <p className="text-white">
//             BHK:
//             {property.bhk_1 ? " 1, " : ""}
//             {property.bhk_2 ? " 2, " : ""}
//             {property.bhk_3 ? " 3 " : ""}
//             | Units: {property.bhk2_type1_units || "N/A "}
//              {" "}| Location: {property.location || "Unknown"}
//           </p>

//           {/* ✅ Budget */}
//           <p className="text-white">
//             Budget: ₹{property.budget?.toLocaleString() || "N/A"}
//           </p>

//           </div>

         
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PropertyList;
>>>>>>> 804eb2b (Home Page Design Completed)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomSwiper from "../Components/CustomSwiper";
<<<<<<< HEAD
 
=======

>>>>>>> 804eb2b (Home Page Design Completed)
const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p className="text-gray-600">No properties found.</p>;
  }
<<<<<<< HEAD
 
  console.log("Received Properties:", properties);
  const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL    
 
=======

  console.log("Received Properties:", properties);

>>>>>>> 804eb2b (Home Page Design Completed)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {properties.map((property) => (
        <div
          key={property.Wing_Id || property.Project_Id}
          className="border border-gray-500  rounded-lg shadow-2xl bg-black"
        >
          {/* ✅ Image Slider
          {property.bhk2_type1_images?.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="h-40"
            >
              {property.bhk2_type1_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${property.Project_Name || "Property"} ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg" // Added rounded corners for images
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">No images available.</p>
          )} */}
<<<<<<< HEAD
 
           {/* ✅ Render Swiper only if images exist */}
          {/* ✅ Render Swiper if images exist, otherwise show message
{property.image?.length > 0 ? (
  <CustomSwiper images={property.projectImages} />
) : (
  <p className="text-gray-400 text-center p-2">No images available.</p>
)}
  */}
  {property.projectImages?.length > 0 ? (
  <CustomSwiper images={property.projectImages.map(img => `${BASE_URL}${img}`)} />
=======

           {/* ✅ Render Swiper only if images exist */}
          {/* ✅ Render Swiper if images exist, otherwise show message */}
{property.bhk2_type1_images?.length > 0 ? (
  <CustomSwiper images={property.bhk2_type1_images} />
>>>>>>> 804eb2b (Home Page Design Completed)
) : (
  <p className="text-gray-400 text-center p-2">No images available.</p>
)}

<<<<<<< HEAD
         
          <div className="p-1">
            {/* ✅ Project Name */}
            <h2 className="text-lg font-semibold text-white">
            ₹{property.priceMax?.toLocaleString() || "N/A"}
            </h2>
 
            {/* ✅ BHK Types */}
            <p className="text-white">
              BHK:{
                property.availableBHKs && property.availableBHKs.length>0
                ? property.availableBHKs.map(bhk => bhk.replace("BHK","")).join(", ")
                :"N/A"
              }
              {/* {property.bhk_1 ? " 1," : ""}
              {property.bhk_2 ? " 2," : ""}
              {property.bhk_3 ? " 3" : ""} */}
              | Units: {property.units || "N/A"} | Location: {property.city || "Unknown"}
            </p>
 
            {/* ✅ Budget */}
            <p className="text-white">
            
            
=======
          
          <div className="p-1">
            {/* ✅ Project Name */}
            <h2 className="text-lg font-semibold text-white">
            ₹{property.budget?.toLocaleString() || "N/A"}
            </h2>

            {/* ✅ BHK Types */}
            <p className="text-white">
              BHK:
              {property.bhk_1 ? " 1," : ""}
              {property.bhk_2 ? " 2," : ""}
              {property.bhk_3 ? " 3" : ""}
              | Units: {property.bhk2_type1_units || "N/A"} | Location: {property.location || "Unknown"}
            </p>

            {/* ✅ Budget */}
            <p className="text-white">
>>>>>>> 804eb2b (Home Page Design Completed)
              {property.address || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
<<<<<<< HEAD
 
=======

>>>>>>> 804eb2b (Home Page Design Completed)
export default PropertyList;