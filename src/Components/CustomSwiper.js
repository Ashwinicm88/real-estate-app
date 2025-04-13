// //important proper working swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useRef, useEffect } from "react";

// const CustomSwiper = ({ images = [], height = "h-72 md:h-90" }) => {
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
//     <div className={`relative w-full ${height}`}>
//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination]}
//         pagination={{ clickable: true }}
//         navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
//         className="w-full h-full rounded-lg"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index} className="w-full h-full">
//             <div className="w-full h-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={img}
//                 alt={`Property ${index}`}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Navigation Buttons */}
//       <button
//         ref={prevRef}
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-900 p-2 rounded-full shadow-md"
//       >
//         <FaChevronLeft size={20} />
//       </button>

//       <button
//         ref={nextRef}
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-900  p-2 rounded-full shadow-md"
//       >
//         <FaChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

// export default CustomSwiper;

//width issue solved code
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useRef, useEffect } from "react";

// const CustomSwiper = ({ images = [], height = "h-72 md:h-90" }) => {
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

//   // Fallback images if none are provided
//   if (!images.length) {
//     images = ["/default_project1.jpg", "/default_project2.jpg"];
//   } else if (images.length === 1) {
//     images.push("/default_project2.jpg"); // Add a fallback image if only one is present
//   }

//   return (
//     <div className={`relative w-full ${height}`}>
//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination]}
//         pagination={{ clickable: true }}
//         navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
//         loop={images.length > 1} // Only loop if more than one image
//         className="w-full h-full rounded-lg"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index} className="w-full h-full">
//             <div className="w-full h-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={img}
//                 alt={`Property ${index}`}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Navigation Buttons */}
//       <button
//         ref={prevRef}
//         className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-900 p-2 rounded-full shadow-md"
//       >
//         <FaChevronLeft size={20} />
//       </button>

//       <button
//         ref={nextRef}
//         className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-900 p-2 rounded-full shadow-md"
//       >
//         <FaChevronRight size={20} />
//       </button>
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

const CustomSwiper = ({ images = [], height = "min-h-[16rem] h-72 md:h-80" }) => {
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

  // Fallback images if none are provided
  if (!images.length) {
    images = ["/default_project1.jpg", "/default_project2.jpg"];
  }

  const hasMultipleImages = images.length > 1;

  return (
    <div className={`relative w-full ${height}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop={hasMultipleImages}
        pagination={hasMultipleImages ? { clickable: true } : undefined}
        navigation={
          hasMultipleImages
            ? { prevEl: prevRef.current, nextEl: nextRef.current }
            : undefined
        }
        observer={true}
        observeParents={true}
        className="w-full h-full rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="!w-full !h-full flex items-center justify-center">
            <div className="w-full h-full overflow-hidden">
              <img
                src={img}
                alt={`Property ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {hasMultipleImages && (
        <>
          <button
            ref={prevRef}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white text-gray-900 p-2 rounded-full shadow-md"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white text-gray-900 p-2 rounded-full shadow-md"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default CustomSwiper;

