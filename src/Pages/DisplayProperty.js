
// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";
// // import { Navigation, Pagination } from "swiper/modules";
// // import { FaPhoneAlt } from "react-icons/fa";
// // import Header from "../Components/Header";

// // const PropertyDetails = () => {
// //   const propertyImages = [
// //            "/Images/1.jpg",
// //            "/Images/2.jpg",
// //            "/Images/4.jpg" 
// //   ];
// //   const floorPlanImages = [
// //           "/Images/Floor_Plan.jpg",
// //         "/Images/Floor_Plan.jpg",
// //         "/Images/Floor_Plan.jpg"
// //   ];
// //   const timelineData = [
// //     { date: "Jun 2024", status: "Launch", completed: true },
// //     { date: "Aug 2024", status: "Excavation", completed: true },
// //     { date: "Jun 2026", status: "Slabs", completed: true },
// //     { date: "Dec 2026", status: "Other tasks", completed: false },
// //     { date: "Mar 2027", status: "Handover", completed: false },
// //   ];

// //   return (
// //     <div className="md:mx-16 min-h-screen overflow-x-hidden overflow-y-auto ">
// //     <Header className="bg-black text-white p-4 mx-4 "></Header>
// //     <div className="bg-black text-yellow-400 min-h-screen p-6">
      
// //       <h1 className="text-2xl font-bold text-left mb-4">
// //         Shiva Heights, Kothrud - 413053
// //       </h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {/* Property Pictures Section */}
// //         <div className="flex flex-col items-center w-full max-w-md rounded-md">
// //           <h2 className="text-white text-lg font-bold mb-2">Property Pictures</h2>
// //           <Swiper
// //             modules={[Navigation, Pagination]}
// //             navigation
// //             pagination={{ clickable: true }}
// //             className="w-full max-w-[400px] h-[300px]"
// //           >
// //             {propertyImages.map((src, index) => (
// //               <SwiperSlide key={index}>
// //                 <img src={src} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>
// //           {/* Property Configuration Details */}
// //           <div className="bg-black text-white p-4 rounded-md w-[400px] max-h-[200px] overflow-y-auto mt-4">
// //               <h2 className="text-yellow-400 font-bold text-lg mb-2">Configuration 1:</h2>
// //               <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
// //                 <div>
// //                   <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
// //                   <p>Hall : <span className="text-yellow-400">21*21</span> Sqft</p>
// //                   <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
// //                   <p>Bed 3: <span className="text-yellow-400">NA</span></p>
// //                   <p>Bath 1: <span className="text-yellow-400">5*10</span></p>
// //                   <p>Bath 3: <span className="text-yellow-400">NA</span></p>
// //                 </div>
// //                 <div>
// //                   <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
// //                   <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
// //                   <p>Bed 4: <span className="text-yellow-400">NA</span></p>
// //                   <p>Bath 2: <span className="text-yellow-400">10*3</span></p>
// //                   <p>Bath : <span className="text-yellow-400">4 NA</span></p>
// //                 </div>
// //               </div>
// //             </div>

// //              {/* Additional Details Section */}
// //   <div className="bg-black text-white p-4 rounded-md w-[400px] mt-4">
// //               <h2 className="text-yellow-400 font-bold text-lg mb-2">Amenities</h2>
// //               <div className="grid grid-cols-2 gap-x-6 text-white">
// //     <div>
// //       <p>Swimming Pool - Y</p>
// //       <p>Gym - Y</p>
// //       <p>Children Park - Y</p>
// //     </div>
// //     <div>
// //       <p>Temple - Y</p>
// //       <p><i>Creche</i> - Y</p>
// //       <p>Senior Citizen Park - Y</p>
// //     </div>
// //   </div>

// //               {/* <p>Swimming Pool - Y | Gym - Y | Children Park - Y</p>
// //               <p>Temple - Y | <em>Creche</em> - Y | Senior Citizen Park - Y</p> */}

// //               <h2 className="text-yellow-400 font-bold text-lg mt-4 mb-2">Nearby Places</h2>
// //                {/* Industry Area */}
// //   <div className="text-white mb-2">
// //     <h3 className="font-bold">Industry area:</h3>
// //     <p className="ml-4">Hinjewadi - 5 KMs, Kharadi - 10 KMs</p>
// //     <p className="ml-4">Magarpatta - 7 KMs, Katraj - 12 KMs</p>
// //   </div>

// //   {/* Schools */}
// //   <div className="text-white mb-2">
// //     <h3 className="font-bold">Schools:</h3>
// //     <div className="grid grid-cols-2 gap-x-6">
// //       <p className="ml-4">JM TC - 2 KMs</p>
// //       <p className="ml-4">NG HC - 5 KMs</p>
// //     </div>
// //   </div>

// //   {/* Hospitals */}
// //   <div className="text-white mb-2">
// //     <h3 className="font-bold">Hospitals:</h3>
// //     <div className="grid grid-cols-2 gap-x-6">
// //       <p className="ml-4">JJMNC - 3 KMs</p>
// //       <p className="ml-4">Sahyadri - 1 KMs</p>
// //     </div>
// //   </div>

// //   {/* Malls */}
// //   <div className="text-white">
// //     <h3 className="font-bold">Malls:</h3>
// //     <div className="grid grid-cols-2 gap-x-6">
// //       <p className="ml-2">Amanora - 5 KMs</p>
// //       <p className="ml-2">Phoneix - 10 KMs</p>
// //     </div>
// //   </div>
// //             </div>
// //           </div>
        

// //         {/* Floor Plans Section */}
// //         <div className="flex flex-col items-center w-[400px]">
// //           <h2 className="text-white text-lg font-bold mb-2">Floor Plans</h2>
// //           <Swiper
// //             modules={[Navigation, Pagination]}
// //             navigation
// //             pagination={{ clickable: true }}
// //             className="w-[400px] h-[300px]"
// //           >
// //             {floorPlanImages.map((src, index) => (
// //               <SwiperSlide key={index}>
// //                 <img src={src} alt={`Floor Plan ${index + 1}`} className="w-full h-full object-cover" />
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>
// //            {/* Floor Plan Configuration Details */}
// //            <div className="bg-black text-white p-4 rounded-md w-[400px] max-h-[200px] overflow-y-auto mt-4">
// //               <h2 className="text-yellow-400 font-bold text-lg mb-2">Configuration 2:</h2>
// //               <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
// //                 <div>
// //                   <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
// //                   <p>Hall : <span className="text-yellow-400">21*21</span> Sqft</p>
// //                   <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
// //                   <p>Bed 3: <span className="text-yellow-400">NA</span></p>
// //                   <p>Bath 1: <span className="text-yellow-400">5*10</span></p>
// //                   <p>Bath 3: <span className="text-yellow-400">NA</span></p>
// //                 </div>
// //                 <div>
// //                   <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
// //                   <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
// //                   <p>Bed 4: <span className="text-yellow-400">NA</span></p>
// //                   <p>Bath 2: <span className="text-yellow-400">10*3</span></p>
// //                   <p>Bath : <span className="text-yellow-400">4 NA</span></p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="bg-black text-yellow-400 p-6 rounded-md w-full max-w-md mx-auto">
// //       <h2 className="text-lg font-bold mb-4">Project Timelines:</h2>
// //       <div className="relative pl-8">
// //         {/* Vertical Line */}
// //         <div className="absolute left-1/3 transform -translate-x-1/2 top-[5%] bottom-[7%] w-1 bg-yellow-400"></div>

// //         {timelineData.map((item, index) => (
// //           <div key={index} className="flex items-center mb-6 relative">
// //             {/* Left - Date */}
// //             <div className="w-20 text-white text-right pr-4 whitespace-nowrap">{item.date}</div>

// //             {/* Middle - Timeline Dot */}
// //             <div
// //               className={`w-4 h-4 flex items-left justify-left -ml-1 rounded-full border-2 z-10 relative${
// //                 item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"
// //               }`}
// //             ></div>

// //             {/* Right - Status */}
// //             <div className="ml-4 text-white">{item.status}</div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //           </div>
// //         </div>

// //       {/* <div className="bg-black text-white p-4 rounded-md w-[400px]">
// //   <h2 className="text-yellow-400 font-bold text-lg mb-2">Configuration 1:</h2>
// //   <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
// //     <div>
// //       <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
// //       <p>Hall : <span className="text-yellow-400">21*21</span> Sqft</p>
// //       <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
// //       <p>Bed 3: <span className="text-yellow-400">NA</span></p>
// //       <p>Bath 1: <span className="text-yellow-400">5*10</span></p>
// //       <p>Bath 3: <span className="text-yellow-400">NA</span></p>
// //     </div>
// //     <div>
// //       <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
// //       <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
// //       <p>Bed 4: <span className="text-yellow-400">NA</span></p>
// //       <p>Bath 2: <span className="text-yellow-400">10*3</span></p>
// //       <p>Bath : <span className="text-yellow-400">4 NA</span></p>
// //     </div>
// //   </div> */}
// // {/* </div> */}

// //       {/* Book Consultation Button */}
// //       <div className="fixed bottom-4 right-6  text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg">
// //         <FaPhoneAlt className="text-red-500" /> Book Consultation
// //       </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default PropertyDetails;
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import { FaPhoneAlt } from "react-icons/fa";
// import Header from "../Components/Header";

// const PropertyDetails = () => {
//   const propertyImages = ["/Images/1.jpg", "/Images/2.jpg", "/Images/4.jpg"];
//   const floorPlanImages = ["/Images/Floor_Plan.jpg", "/Images/Floor_Plan.jpg"];
//   const timelineData = [
//     { date: "Jun 2024", status: "Launch", completed: true },
//     { date: "Aug 2024", status: "Excavation", completed: true },
//     { date: "Jun 2026", status: "Slabs", completed: true },
//     { date: "Dec 2026", status: "Other tasks", completed: false },
//     { date: "Mar 2027", status: "Handover", completed: false },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-yellow-400 p-6">
//       <Header className="bg-black text-white p-4 mx-4" />
//       <h1 className="text-2xl font-bold text-left mb-4">
//         Shiva Heights, Kothrud - 413053       </h1>
//       {/* First Row - Images */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Left Column - Property Pictures */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold mb-2 text-white">Property Pictures</h2>
//           <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="w-full h-[300px]">
//             {propertyImages.map((src, index) => (
//               <SwiperSlide key={index}>
//                 <img src={src} alt={`Property ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Right Column - Floor Plans */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold mb-2 text-white">Floor Plans</h2>
//           <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="w-full h-[300px]">
//             {floorPlanImages.map((src, index) => (
//               <SwiperSlide key={index}>
//                 <img src={src} alt={`Floor Plan ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Second Row - Configuration */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Left Column - Configuration 1 */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold text-white">Configuration 1</h2>
//           <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
//           <p>Hall : <span className="text-yellow-400">21*21</span> Sqft</p>
//           <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
//           <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
//           <p>Bath 1: <span className="text-yellow-400">5*10</span></p>
//           <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
//         </div>

//         {/* Right Column - Configuration 2 */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold text-white">Configuration 2</h2>
//           <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
//           <p>Hall : <span className="text-yellow-400">21*21</span> Sqft</p>
//           <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
//           <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
//           <p>Bath 1: <span className="text-yellow-400">5*10</span></p>
//           <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
//         </div>
//       </div>

//       {/* Third Row - Amenities, Nearby Places, Timeline */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Column - Amenities */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold text-white">Amenities</h2>
//           <p>Swimming Pool - Y</p>
//           <p>Gym - Y</p>
//           <p>Children Park - Y</p>
//           <p>Temple - Y</p>
//           <p>Creche - Y</p>
//           <p>Senior Citizen Park - Y</p>
//         </div>

//         {/* Center Column - Nearby Places */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold text-white">Nearby Places</h2>
//           <h3 className="font-bold">Industry Area:</h3>
//           <p>Hinjewadi - 5 KMs, Kharadi - 10 KMs</p>
//           <p>Magarpatta - 7 KMs, Katraj - 12 KMs</p>

  //           <h3 className="font-bold mt-2">Schools:</h3>
  //           <p>JM TC - 2 KMs</p>
  //           <p>NG HC - 5 KMs</p>

  //           <h3 className="font-bold mt-2">Hospitals:</h3>
  //           <p>JJMNC - 3 KMs</p>
  //           <p>Sahyadri - 1 KMs</p>

  //           <h3 className="font-bold mt-2">Malls:</h3>
  //           <p>Amanora - 5 KMs</p>
  //           <p>Phoneix - 10 KMs</p>
//         </div>

//         {/* Right Column - Project Timeline */}
//         <div className="bg-gray-900 p-4 rounded-lg">
//           <h2 className="text-lg font-bold text-white">Project Timelines</h2>
//           <div className="relative pl-4">
//             {timelineData.map((item, index) => (
//               <div key={index} className="flex items-center mb-4">
//                 <div className="w-24 text-right pr-4 text-white">{item.date}</div>
//                 <div
//                   className={`w-4 h-4 rounded-full border-2 ${
//                     item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"
//                   }`}
//                 ></div>
//                 <div className="ml-4 text-white">{item.status}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Book Consultation Button */}
//       <div className="fixed bottom-4 right-6 bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg">
//         <FaPhoneAlt className="text-red-500" /> Book Consultation
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { FaPhoneAlt } from "react-icons/fa";
import Header from "../Components/Header";

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
    <div className="min-h-screen overflow-x-hidden bg-black text-yellow-400 p-4 mx-8">
      <Header className="bg-black text-white" />

      <h1 className="text-2xl font-bold text-left m-2">Shiva Heights, Kothrud - 413053</h1>

      {/* First Row: Property Images & Floor Plans */}
      <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Property Pictures Section */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-white text-lg font-bold mb-2">Property Pictures</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full max-w-[500px] h-[300px]"
          >
            {propertyImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Floor Plans Section */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-white text-lg font-bold mb-2">Floor Plans</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full max-w-[500px] h-[300px]"
          >
            {floorPlanImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Floor Plan ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Second Row: Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Configuration 1 */}
        <div className="text-white p-4 rounded-lg w-full">
          <h2 className="text-yellow-400 font-bold text-lg">Configuration 1</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-md">
            <div>
              <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
              <p>Hall: <span className="text-yellow-400">21*21</span> Sqft</p>
              <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
              <p>Bed 3: NA</p>
              <p>Bath 1: <span className="text-yellow-400">5*10</span></p>
              <p>Bath 3:NA</p>
            </div>
            <div>
              <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
              <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
              <p>Bed 4:NA</p>
              <p>Bath 2: 10*3</p>
              <p>Bath 4:NA</p>
            </div>
          </div>
        </div>

        {/* Configuration 2 */}
        <div className=" text-white p-6 rounded-lg w-full">
          <h2 className="text-yellow-400 font-bold text-lg">Configuration 2</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-md">
            <div>
              <p>Type 1: <span className="text-yellow-400">1050</span> Sqft</p>
              <p>Hall: <span className="text-yellow-400">21*21</span> Sqft</p>
              <p>Bed 1: <span className="text-yellow-400">11*12</span> Sqft</p>
              <p>Bed 3: NA</p>
              <p>Bath 1: 5*10</p>
              <p>Bath 3: NA</p>
            </div>
            <div>
              <p>Kitchen: <span className="text-yellow-400">10*12</span> Sqft</p>
              <p>Bed 2: <span className="text-yellow-400">12*15</span> Sqft</p>
              <p>Bed 4: NA</p>
              <p>Bath 2: 10*3</p>
              <p>Bath 4: NA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row: Amenities, Nearby, Project Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Amenities Section */}
        <div className=" text-white p-6 rounded-lg">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text md">
            <div>
                <p>Swimming Pool - Y</p>
                <p>Gym - Y</p>
                <p>Children Park - Y</p>
            </div>
            <div>
                <p>Temple - Y</p>
                <p>Creche - Y</p>
                <p>Senior Citizen Park - Y</p>
            </div>
          </div>
        </div>

        {/* Nearby Places Section */}
        <div className=" text-white p-6 rounded-lg">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">Nearby Places</h2>
          <h3 className="font-bold">Industry Area:</h3>
            <p >Hinjewadi - 5 KMs, Kharadi - 10 KMs</p>
            <p >Magarpatta - 7 KMs, Katraj - 12 KMs</p>
            <h3 className="font-bold mt-2">Schools:</h3>
              <p >JM TC - 2 KMs</p>
              <p >NG HC - 5 KMs</p>

           <h3 className="font-bold mt-2">Hospitals:</h3>
              <p className="ml-4">JJMNC - 3 KMs</p>
              <p className="ml-4">Sahyadri - 1 KMs</p>

           <h3 className="font-bold mt-2">Malls:</h3>
              <p className="ml-4">Amanora - 5 KMs</p>
              <p className="ml-4">Phoneix - 10 KMs</p>
        </div>

        {/* Project Timeline Section */}
        <div className=" text-white p-6 rounded-lg flex flex-col">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">Project Timeline</h2>
          
          {/* {timelineData.map((item, index) => (
            <p key={index} className={item.completed ? "text-green-400" : "text-yellow-400"}>
              {item.date} - {item.status}
            </p>
          ))} */}
          <div className="relative w-full max-w-md">
                     {/* Vertical Line */}
          <div className="absolute left-1/2 -ml-7 transform -translate-x-1/2 top-[5%] bottom-[14%] w-1 bg-yellow-400"></div>
             {timelineData.map((item, index) => (
               <div key={index} className="flex items-center mb-6">
                 <div className="w-24 text-right pr-4 text-white">{item.date}</div>

                 {/* Circle on the timeline */}
                 <div className="relative flex items-center justify-center w-6 h-6">
                 <div
                   className={`w-4 h-4 rounded-full border-2 relative ${
                     item.completed ? "border-green-400 bg-green-500" : "border-yellow-400 bg-white"
                   }`}
                 ></div>
                 </div>
                 <div className="ml-4 text-white">{item.status}</div>
             </div>             ))}
         </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyDetails;
