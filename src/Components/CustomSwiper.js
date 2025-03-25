// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";
// // import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Custom arrows

// // const CustomSwiper = ({ images }) => {
// //   if (!images || images.length === 0) {
// //     return <p className="text-gray-400 text-center">No images available.</p>;
// //   }

// //   return (
// //     <div className="relative">
// //       {/* ✅ Swiper Component */}
// //       <Swiper
// //         modules={[Navigation, Pagination]}
// //         pagination={{ clickable: true }}
// //         navigation={{
// //           nextEl: ".custom-next",
// //           prevEl: ".custom-prev",
// //         }}
// //         className="h-40 rounded-lg"
// //       >
// //         {images.map((img, index) => (
// //           <SwiperSlide key={index}>
// //           <img
// //             src={img}
// //             alt={"Property"} // Removed redundant words
// //             className="w-full h-full object-cover rounded-lg"
// //           />
// //         </SwiperSlide>
        
// //         ))}
// //         {/* ✅ Tailwind-styled pagination bullets */}
// //       <div className="swiper-pagination peer hidden"></div>
// //       <style>
// //         {`
// //           .swiper-pagination-bullet {
// //             background-color: #6b7280 !important; /* Tailwind gray-500 */
// //             opacity: 0.75 !important;
// //           }
// //           .swiper-pagination-bullet-active {
// //             background-color: #374151 !important; /* Tailwind gray-800 */
// //           }
// //         `}
// //       </style>
// //       </Swiper>

// //       {/* ✅ Custom Arrows */}
// //       <button className="custom-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md">
// //         <FaChevronLeft size={20} />
// //       </button>

// //       <button className="custom-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md">
// //         <FaChevronRight size={20} />
// //       </button>
// //     </div>
// //   );
// // };

// // export default CustomSwiper;
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Custom arrows

// const CustomSwiper = ({ images }) => {
//   if (!images || images.length === 0) {
//     return <p className="text-gray-400 text-center">No images available.</p>;

// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useRef, useEffect } from "react";

// const CustomSwiper = ({ images = [], height = "h-30 md:h-50" }) => {
//   const swiperRef = useRef(null);
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   useEffect(() => {
//     const swiperInstance = swiperRef.current?.swiper;
//     if (swiperInstance) {
//       swiperInstance.params.navigation.prevEl = prevRef.current;
//       swiperInstance.params.navigation.nextEl = nextRef.current;
//       swiperInstance.navigation.init();
//       swiperInstance.navigation.update();
//     }
//   }, []);

//   if (!images.length) {
//     images = ["/default_project1.jpg", "/default_project2.jpg"];
//   }
 
//   return (
//     <div className="relative">
//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination]}
//         pagination={{ clickable: true }}
//         navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
//         className={`rounded-lg ${height}`} // Use the height prop here
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//           <img
//             src={img}
//             alt={"Property"} // Removed redundant words
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </SwiperSlide>
       

//           <SwiperSlide key={index} className="h-full">
//             <div className="w-full h-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={img}
//                 alt="Property"
//                 className="w-full h-full object-cover rounded-lg" // Use object-contain to fit the image
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       {/* ✅ Custom Arrows */}
//       <button className="custom-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md">

//       {/* Custom Navigation Buttons */}
//       <button
//         ref={prevRef}
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md"
//       >

//         <FaChevronLeft size={20} />
//       </button>

//       <button className="custom-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md">

//       <button
//         ref={nextRef}
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md"
//       >

//         <FaChevronRight size={20} />
//       </button>
//     </div>
//     </div>
//   );
// };

 
// export default CustomSwiper;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useEffect } from "react";
 
const CustomSwiper = ({ images = [], height = "h-30 md:h-50" }) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
 
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);
 
  if (!images.length) {
    images = ["/default_project1.jpg", "/default_project2.jpg"];
  }

  return (
<div className="relative">
<Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        className={`rounded-lg ${height}`}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="h-full">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={img}
                alt="Property"
                className="w-full h-full object-cover rounded-lg"
             
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
<button
        ref={prevRef}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default CustomSwiper;
