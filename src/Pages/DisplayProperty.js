import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Header from "../Components/Header";
import PhoneIcon from "@mui/icons-material/Phone";

const PropertyDetails = () => {
  const propertyImages = ["/Images/1.jpg", "/Images/2.jpg", "/Images/4.jpg"];
  const floorPlanImages = ["/Images/Floor_Plan.jpg", "/Images/Floor_Plan.jpg", "/Images/Floor_Plan.jpg"];

  const timelineData = [
    { date: "Jun 2024", status: "Launch", completed: true },
    { date: "Aug 2024", status: "Excavation", completed: true },
    { date: "Jun 2026", status: "Slabs", completed: true },
    { date: "Dec 2026", status: "Other tasks", completed: false },
    { date: "Mar 2027", status: "Handover", completed: false },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-yellow-400 px-4 pt-[70px]">
      <Header className=" text-white" />
      <div className=" fixed  max-w-7xl mx-auto w-[90%] sm:w-[85%] lg:w-[90%] top-12 z-40 p-4 bg-black">
        <h1 className="text-xl md:text-2xl font-bold text-left md:text-left md:ml-24">Shiva Heights, Kothrud - 413053</h1>
      </div>
      
      <div className="max-w-screen-lg mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-start  w-full">
          <h2 className="text-white text-lg font-bold ml-7 mb-2 ">Property Pictures</h2>
          <Swiper modules={[Navigation, Pagination]} 
          navigation pagination={{ clickable: true }} className="w-full max-w-md h-64">
            {propertyImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col items-start  w-full">
          <h2 className="text-white text-lg font-bold ml-7  mb-2">Floor Plans</h2>
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="w-full max-w-md h-64">
            {floorPlanImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Floor Plan ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg mx-auto ">
        {[1, 2].map((config) => (
          <div key={config} className="text-white p-4 rounded-lg w-full ">
            <h2 className="text-yellow-400 font-bold text-lg ml-2">Configuration {config}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-md ml-4">
              <div>
                <p>Units: 4</p>
                <p>Type 1: 1050 Sqft</p>
                <p>Bathrooms: 2</p>
                <p>Balconies: 1</p>
                <p>Parking: 1</p>
              </div>
              <div>
                <p>Hall : 21*21 Sqft</p>
                <p>Kitchen : 12*12 Sqft</p>
                <p>Bedroom 1: 11*12 Sqft</p>
                <p>Bathroom 1: 12*10 Sqft</p>
                <p>Bathroom 2: 10*20 Sqft</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  max-w-screen-lg mx-auto my-auto">
        <div className="text-white p-6 rounded-lg">
          <h2 className="text-yellow-400 font-bold text-lg mb-2">Amenities</h2>
          <p>Swimming Pool, Gym, Children Park, Temple, Creche, Garden</p>
        </div>

        <div className="text-white p-6 rounded-lg ">
          <h2 className="text-yellow-400 font-bold text-lg mb-2">Nearby Places</h2>
          {/* <p>Industry Areas: Hinjewadi (5 KMs), Kharadi (10 KMs)</p>
          <p>Schools: JM TC (2 KMs), NG HC (5 KMs)</p>
          <p>Hospitals: JJMNC (3 KMs), Sahyadri (1 KM)</p>
          <p>Malls: Amanora (5 KMs), Phoneix (10 KMs)</p>
          <p>Movie Theaters: PVR (5 KMs), I-MAX (10 KMs)</p> */}
          <h3 className="font-bold">Industry Area:</h3>
             <p >Hinjewadi - 5 KMs, Kharadi - 10 KMs</p>
            <p >Magarpatta - 7 KMs, Katraj - 12 KMs</p>
             <h3 className="font-bold mt-2">Schools:</h3>
               <p >JM TC - 2 KMs</p>
               <p >NG HC - 5 KMs</p>

            <h3 className="font-bold mt-2">Hospitals:</h3>
               <p >JJMNC - 3 KMs</p>
               <p >Sahyadri - 1 KMs</p>

            <h3 className="font-bold mt-2">Malls:</h3>
               <p>Amanora - 5 KMs</p>
               <p>Phoneix - 10 KMs</p>

               <h3 className="font-bold mt-2">Movie Theaters:</h3>
               <p>PVR - 5 KMs</p>
             <p>I-MAX - 10 KMs</p>
        </div>

        <div className="text-white p-6 rounded-lg relative">
  <h2 className="text-yellow-400 font-bold text-lg mb-4">Project Timeline</h2>
  <div className="relative w-full max-w-md mx-auto">
    
    {/* Vertical Line - Positioned Correctly */}
    <div className="absolute left-[43px] top-0 bottom-0 w-1 bg-yellow-400"></div>

    {timelineData.map((item, index) => (
      <div key={index} className="flex items-center mb-6 relative">
        
        {/* Date on the Left */}
        <div className="w-24 text-right pr-4 text-white">{item.date}</div>

        {/* Status Point - Centered on Line */}
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className={`w-4 h-4 rounded-full border-2 absolute 
            ${item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"}`}>
          </div>
        </div>

        {/* Status Text */}
        <div className="ml-4 text-white">{item.status}</div>
      </div>
    ))}
  </div>
</div>

        {/* <div className="text-white p-6 rounded-lg relative">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">Project Timeline</h2>
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute left-[calc(24%-1px)] h-full -translate-x-1/2 border-l-[1px]  top-4 w-1 bg-yellow-400 "></div>
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-center mb-6">
                <div className="w-24 text-right pr-4 text-white">{item.date}</div>
                <div className="relative flex items-center justify-center w-6 h-6">
                  <div className={`w-4 h-4 rounded-full border-2 ${item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"}`}></div>
                </div>
                <div className="ml-4 text-white">{item.status}</div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white font-semibold px-4 py-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-yellow-500 transition-all cursor-pointer">
  <PhoneIcon className="w-5 h-5 text-yellow-500" />
  <span>Book Consultation</span>
</div>
      </div>
    </div>
  );
};

export default PropertyDetails;
