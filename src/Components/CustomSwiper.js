import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Custom arrows
 
const CustomSwiper = ({ images }) => {
  if (!images || images.length === 0) {
    return <p className="text-gray-400 text-center">No images available.</p>;
  }
 
  return (
    <div className="relative">
      {/* ✅ Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="h-40 rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
          <img
            src={img}
            alt={"Property"} // Removed redundant words
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>
       
        ))}
        {/* ✅ Tailwind-styled pagination bullets */}
      <div className="swiper-pagination peer hidden"></div>
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: #6b7280 !important; /* Tailwind gray-500 */
            opacity: 0.75 !important;
          }
          .swiper-pagination-bullet-active {
            background-color: #374151 !important; /* Tailwind gray-800 */
          }
        `}
      </style>
      </Swiper>
 
      {/* ✅ Custom Arrows */}
      <button className="custom-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md">
        <FaChevronLeft size={20} />
      </button>
 
      <button className="custom-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-transparent text-gray-700 p-2 rounded-full shadow-md">
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};
 
export default CustomSwiper;