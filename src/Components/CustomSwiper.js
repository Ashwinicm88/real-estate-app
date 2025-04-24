
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useRef, useEffect } from "react";

// const CustomSwiper = ({ images = [], height = "min-h-[16rem] h-72 md:h-80" }) => {
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
//   }

//   const hasMultipleImages = images.length > 1;

//   return (
//     <div className={`relative w-full ${height}`}>
//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination]}
//         slidesPerView={1}
//         loop={hasMultipleImages}
//         pagination={hasMultipleImages ? { clickable: true } : undefined}
//         navigation={
//           hasMultipleImages
//             ? { prevEl: prevRef.current, nextEl: nextRef.current }
//             : undefined
//         }
//         observer={true}
//         observeParents={true}
//         className="w-full h-full rounded-lg"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index} className="!w-full !h-full flex items-center justify-center">
//             <div className="w-full h-full overflow-hidden">
//               <img
//                 src={img}
//                 alt={`Property ${index}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Navigation Buttons */}
//       {hasMultipleImages && (
//         <>
//           <button
//             ref={prevRef}
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white text-gray-900 p-2 rounded-full shadow-md"
//           >
//             <FaChevronLeft size={20} />
//           </button>

//           <button
//             ref={nextRef}
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white text-gray-900 p-2 rounded-full shadow-md"
//           >
//             <FaChevronRight size={20} />
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CustomSwiper;

//important latest with zoom effect code
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useRef, useEffect } from "react";

// const CustomSwiper = ({
//   images = [],
//   height = "min-h-[16rem] h-72 md:h-80",
//   onImageClick,
//   initialSlide = 0 // ✅ New prop to set the starting image
// }) => {
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

//   const hasMultipleImages = images.length > 1;

//   return (
//     <div className={`relative w-full ${height}`}>
//       <Swiper
//         ref={swiperRef}
//         modules={[Navigation, Pagination]}
//         slidesPerView={1}
//         loop={hasMultipleImages}
//         initialSlide={initialSlide} // ✅ Use the new prop here
//         pagination={hasMultipleImages ? { clickable: true } : undefined}
//         navigation={
//           hasMultipleImages
//             ? { prevEl: prevRef.current, nextEl: nextRef.current }
//             : undefined
//         }
//         observer={true}
//         observeParents={true}
//         className="w-full h-full rounded-lg"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index} className="!w-full !h-full flex items-center justify-center">
//             <div
//               className="w-full h-full overflow-hidden cursor-pointer"
//               onClick={() => onImageClick?.(img)}
//             >
//               <img
//                 src={img}
//                 alt={`Property ${index}`}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Navigation Buttons */}
//       {hasMultipleImages && (
//         <>
//           <button
//             ref={prevRef}
//             className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white text-gray-900 p-2 rounded-full shadow-md"
//           >
//             <FaChevronLeft size={20} />
//           </button>

//           <button
//             ref={nextRef}
//             className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white text-gray-900 p-2 rounded-full shadow-md"
//           >
//             <FaChevronRight size={20} />
//           </button>
//         </>
//       )}
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
import { useRef, useEffect, useState, useLayoutEffect } from "react";

const CustomSwiper = ({
  items = [],
  height = "min-h-[16rem] h-72 md:h-80",
  onImageClick,
  initialSlide = 0,
}) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  // Handle swiper initialization and navigation button binding
  useLayoutEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [items, initialSlide]);  // Ensure re-binding on items change

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        const newIndex = swiperInstance.realIndex;
        setActiveIndex(newIndex);
        videoRefs.current.forEach((video, index) => {
          if (video) {
            if (index === newIndex) {
              video.play();  // Play the active video
            } else {
              video.pause();  // Pause non-active videos
            }
          }
        });
      });
    }
  }, [activeIndex]);

  if (!items.length) {
    items = [
      { type: "image", src: "/default_project1.jpg" },
      { type: "image", src: "/default_project2.jpg" },
    ];
  }

  const hasMultipleItems = items.length > 1;

  return (
    <div className={`relative w-full ${height}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop={hasMultipleItems}
        initialSlide={initialSlide}
        pagination={hasMultipleItems ? { clickable: true } : undefined}
        navigation={hasMultipleItems ? { prevEl: prevRef.current, nextEl: nextRef.current } : undefined}
        observer={true}
        observeParents={true}
        className="w-full h-full rounded-lg"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="!w-full !h-full flex items-center justify-center">
            {item.type === "image" ? (
              <div
                className="w-full h-full overflow-hidden cursor-pointer"
                onClick={() => onImageClick?.(item)}
              >
                <img
                  src={item.src}
                  alt={`Property ${index}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : item.type === "video" ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.src}
                controls
                autoPlay={index === activeIndex}
                muted
                className="w-full h-full object-cover rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultipleItems && (
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





