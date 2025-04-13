// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const BASE_URL = "http://localhost:8080"; // Update with your actual backend URL
// // const API_ENDPOINT = 'http://localhost:8080/api/entities/recommended-properties`;
// const API_ENDPOINT = "http://localhost:8080/api/entities/recommended-properties";

// const PropertySection = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     axios
//       .get(API_ENDPOINT)
//       .then((response) => {
//         console.log("Fetched properties:", response.data);
//         setProperties(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching properties:", error);
//         setError("Failed to fetch properties.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-white text-center">Loading properties...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="w-full bg-black text-white">
//       <h1 className="text-3xl font-bold text-gray-200 text-center py-10">
//         Our Recommended Properties
//       </h1>
//       {properties.length === 0 ? (
//         <p className="text-center text-gray-400">No recommended properties available.</p>
//       ) : (
//         properties.map((property, index) => (
//           <section
//             key={index}
//             className="w-full flex flex-col justify-center items-start px-4 md:px-10 relative z-0"
//           >
//             {/* Property Title */}
//             <div className="mb-6">
//               <h2 className="text-xl font-bold text-gray-400">{property.projectName}</h2>
//               <p className="text-lg text-gray-400">{property.projectAddress}</p>
//             </div>
//             {/* Video & Image Row */}
//             <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-16">
//               {/* Video Section */}
//               <div className="w-full md:w-1/2 h-[300px] rounded-lg overflow-hidden border border-gray-600">
//                 {property.projectVideo ? (
//                   <video
//                     className="w-full h-full object-cover"
//                     src={
//                       property.projectVideo.startsWith("http")
//                         ? property.projectVideo
//                         : `${BASE_URL}${property.projectVideo}`
//                     }
//                     controls
//                   />
//                 ) : (
//                   <p className="text-center text-gray-400 flex justify-center items-center h-full">
//                     No video available
//                   </p>
//                 )}
//               </div>

//               {/* Swiper Image Carousel */}
//               <div className="w-full md:w-1/2 h-[300px] relative">
//                 <div className="w-full h-full rounded-lg border border-gray-600 overflow-hidden">
//                   <Swiper
//                     navigation={{
//                       nextEl: `.swiper-button-next-${index}`,
//                       prevEl: `.swiper-button-prev-${index}`,
//                     }}
//                     pagination={{ clickable: true }}
//                     autoplay={{ delay: 3000, disableOnInteraction: false }}
//                     modules={[Navigation, Pagination, Autoplay]}
//                     className="w-full h-full"
//                   >
//                     {property.projectPictures && property.projectPictures.length > 0 ? (
//                       property.projectPictures.map((image, imgIndex) => (
//                         <SwiperSlide key={imgIndex} className="h-full">
//                           <img
//                             src={image.startsWith("http") ? image : `${BASE_URL}${image}`}
//                             alt={`Property ${imgIndex}`}
//                             className="w-full h-full object-cover rounded-lg"
//                           />
//                         </SwiperSlide>
//                       ))
//                     ) : (
//                       <p className="text-center text-gray-400 flex justify-center items-center h-full">
//                         No images available
//                       </p>
//                     )}
//                   </Swiper>
//                 </div>

//                 {/* Navigation Arrows */}
//                 <button
//                   className={`swiper-button-prev-${index} absolute left-[-15px] top-1/2 transform -translate-y-1/2 text-white text-2xl`}
//                 >
//                   ❮
//                 </button>
//                 <button
//                   className={`swiper-button-next-${index} absolute right-[-15px] top-1/2 transform -translate-y-1/2 text-white text-2xl`}
//                 >
//                   ❯
//                 </button>
//               </div>
//             </div>

//             {/* Additional Details */}
//             <div className="mt-4">
//               <p className="text-gray-300">
//                 Price Range: ₹{property.priceMin?.toLocaleString()} - ₹{property.priceMax?.toLocaleString()}
//               </p>
//               <p className="text-gray-300">Amenities: {property.amenities || "Not listed"}</p>
//             </div>
//             {/* View Details */}
//             <div className="mt-4 w-full flex justify-center">
//               <a href={`/property/${property.projectId}`} className="text-blue-400 hover:underline text-lg">
//                 View Details
//               </a>
//             </div>
//           </section>
//         ))
//       )}
//     </div>
//   );
// };
 
// export default PropertySection;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PropertyCard from "../Components/PropertyCard";
import { FaPhoneAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_ENDPOINT = "http://localhost:8080/api/entities/recommended-properties";

const PropertySection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    axios
      .get(API_ENDPOINT)
      .then((response) => {
        console.log("Fetched properties:", response.data);
        setProperties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setError("Failed to fetch properties.");
        setLoading(false);
      });
  }, []);

  const handlePrevClick = () => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  };

  const handleNextClick = () => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  };

  if (loading) return <p className="text-white text-center">Loading properties...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full bg-black text-white py-10">
      <div className="flex justify-between items-center mb-5 sm:justify-center">
      <h2 className="text-2xl font-semibold text-gray-200 mb-0 md:mb-0 md:text-3xl text-center md:text-left w-full sm:justify-center">
       Our Recommended Properties
</h2>
      </div>

      {properties.length === 0 ? (
        <p className="text-center text-gray-400">No recommended properties available.</p>
      ) : (
        <div className={`relative px-6 ${properties.length <= 2 ? "flex justify-center" : ""}`}>
          <div className="relative">
            {/* Left Navigation Button */}
            <button
              onClick={handlePrevClick}
              className="absolute top-1/2 -left-4 sm:-left-10 transform -translate-y-1/2 w-10 h-10  flex items-center justify-center text-gray-400 text-3xl hover:text-yellow-400 bg-gray transition z-10"
            >
              <FaChevronLeft />
            </button>

            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                
                641: { slidesPerView: 2 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
                1440: { slidesPerView: 4 },
              }}
              spaceBetween={20}
              modules={[Navigation]}
              className="relative w-full"
            >
              {properties.map((property) => (
                <SwiperSlide key={property.projectId} className="flex justify-center">
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Navigation Button */}
            <button
              onClick={handleNextClick}
              className="absolute top-1/2 -right-4 sm:-right-10 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 text-3xl  hover:text-yellow-400 bg-gray transition z-10"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Book Consultation Button */}
          {/* <div className="flex justify-end mt-4">
            <button className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-base">
              <FaPhoneAlt size={20} />
              Book Consultation
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PropertySection;