import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
 
const properties = [
  {
    id: 1,
    name: "Golden Heights Kharadi",
    description: "An exclusive 3 & 4 BHK Properties starting from 1 Cr+.",
    videoSrc:
      "https://videos.pexels.com/video-files/3555398/3555398-hd_1920_1080_30fps.mp4",
    images: [
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
  {
    id: 2,
    name: "Casablanca Phase II - Hinjewadi",
    description: "An exclusive 3 & 4 BHK Properties starting from 1 Cr+.",
    videoSrc:
      "https://videos.pexels.com/video-files/3444433/3444433-hd_1920_1080_30fps.mp4",
    images: [
      "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
  },
];
 
const PropertySection = () => {
  return (
    <div className="w-full bg-black text-white">
      <h1 className="text-3xl font-bold text-gray-200 text-center py-10">
        Our Recommended Properties
      </h1>
      {properties.map((property) => (
        <section
          key={property.id}
          className="w-full flex flex-col justify-center items-start px-4 md:px-10 relative z-0"
        >
          {/* Property Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-400">
              {property.name}
            </h2>
            <p className="text-lg text-[#36454F]">{property.description}</p>
          </div>
 
          {/* Video & Image Row with Alignment Fix */}
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-16">
            {/* Video (Aligned to Left) */}
            <div className="w-full md:w-1/2 h-[300px] rounded-lg overflow-hidden relative border border-gray-600">
              <video
                className="w-full h-full object-cover"
                src={property.videoSrc}
                controls
              />
            </div>
 
            {/* Swiper Image (Aligned to Right) */}
            <div className="w-full md:w-1/2 h-[300px] flex justify-end relative">
              <div className="w-full h-full rounded-lg border border-gray-600 overflow-hidden">
                <Swiper
                  navigation={{
                    nextEl: `.swiper-button-next-${property.id}`,
                    prevEl: `.swiper-button-prev-${property.id}`,
                  }}
                  pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                      return `<span class="${className} bg-gray-800"></span>`;
                    },
                  }} // Show dots
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }} // Auto-slide every 3 sec
                  modules={[Navigation, Pagination, Autoplay]}
                  className="w-full h-full"
                >
                  {property.images.map((image, index) => (
                    <SwiperSlide key={index} className="h-full">
                      <img
                        src={image}
                        alt={`Property ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
 
              {/* Navigation Arrows */}
              <button
                className={`swiper-button-prev-${property.id} absolute left-[-15px] top-1/2 transform -translate-y-1/2 text-white text-2xl`}
              >
                ❮
              </button>
              <button
                className={`swiper-button-next-${property.id} absolute right-[-15px] top-1/2 transform -translate-y-1/2 text-white text-2xl`}
              >
                ❯
              </button>
            </div>
          </div>
 
          {/* View Details */}
          <div className="mt-4 w-full flex justify-center">
            <a
              href="/"
              className="text-blue-400 hover:underline text-lg"
            >
              View Details
            </a>
          </div>
        </section>
      ))}
    </div>
  );
};
 
export default PropertySection;