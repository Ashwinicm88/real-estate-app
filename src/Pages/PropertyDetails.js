// // import { useState, useEffect } from "react";
// // import CustomSwiper from "../Components/CustomSwiper";
// // import Header from "../Components/Header";
// // import PhoneIcon from "@mui/icons-material/Phone";
// // import Calculations from "../Components/Calculations";
// // import CostOfOwnership from "../Components/CostOfOwnership";
// // import ProjectTimeline from "../Components/ProjectTimeline";
// // import { useParams } from "react-router-dom";

// // const bhkOptions = [
// //   "1 BHK",
// //   "2 BHK",
// //   "3 BHK",
// //   "4 BHK",
// //   "Amenities",
// //   "Project Timeline",
// //   "Expert Review",
// //   "Cost of Ownership",
// //   "Rera Details",
// // ];

// //  const PropertyDetails = ({ }) =>  {
// //   const { projectId } = useParams(); // 🔹 Get Project_Id from URL
// //   const [property, setProperty] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [selectedBHK, setSelectedBHK] = useState("oneBHKConfig");
// //   const [showCalculations, setShowCalculations] = useState(false); // State for showing calculations section
// //   const [showcow, setShowcows] = useState(false);
// //   const [showProjectTimeline, setProjectTimeline] = useState(false);
// //   const [showrera, setShowRera] = useState(false);

// //   console.log("Property",property);
// //   const Image_URL = "http://localhost:8080"; // Update API URL

// //   const [error, setError] = useState(""); // ✅ Define error state
// //   useEffect(() => {
// //     console.log("🔄 selectedBHK changed:", selectedBHK);
// //   }, [selectedBHK]);

// //   // const selectedBHKConfig = property.[selectedBHK] || {
// //   //   images: [],
// //   //   floorPlans: [],
// //   //   details: [],
// //   // };

// //   const formatPrice = (price) => {
// //     if (price >= 10000000) {
// //       return (price / 10000000).toLocaleString() + " Crore";
// //     } else {
// //       return (price / 100000).toLocaleString() + " Lakh";
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchPropertyDetails = async () => {
// //       try {
// //         const response = await fetch(`http://localhost:8080/api/entities/${projectId}`);

// //         if (!response.ok) {
// //           throw new Error("Failed to fetch property details");
// //         }
// //         const data = await response.json();
// //         console.log("Fetched Data:", data); // 🔍 Debugging Log

// //         if (!data || Object.keys(data).length === 0) {
// //           setError("Property not found.");
// //           setProperty(null);
// //         } else {
// //           setProperty(data);
// //           setError("");  // Clear error if data exists
// //         }

// //         console.log("Updated Property State:", property);
// //         console.log("Updated Error State:", error);
// //       } catch (error) {
// //         console.error("Error fetching property:", error);
// //         setError("Error loading property details.");
// //       }

// //     };

// //     if (projectId) fetchPropertyDetails();
// //   }, [projectId, selectedBHK]);

// //   useEffect(() => {
// //     console.log("Updated Property State:", property);
// //   }, [property]);

// //   // if (loading) return <p className="text-gray-500">Loading...</p>;
// //   if (!property && !error) {
// //     return <p className="text-white">Loading...</p>;
// //   }
// //   if (error) {
// //     return <p className="text-red-500">{error}</p>;
// //   }
// //   if (!property) return <p className="text-red-500">Property not found.</p>;
// //   // ✅ Correctly filter details based on selected BHK
// //   const filteredDetails =
// //     selectedBHK === "1 BHK"
// //       ? property?.oneBHKConfig || []
// //       : selectedBHK === "2 BHK"
// //         ? property?.twoBHKConfig || []
// //         : selectedBHK === "3 BHK"
// //           ? property?.threeBHKConfig || []
// //           : selectedBHK === "4 BHK"
// //             ? property?.fourBHKConfig || []
// //             : selectedBHK === "Amenities"
// //               ? Array.isArray(property?.Amenities) ? property.Amenities : []
// //               : selectedBHK === "Nearby"
// //                 ? Array.isArray(property?.Nearby) ? property.Nearby : []
// //                 : selectedBHK === "Calculations"
// //                   ? property?.Calculations || [] 
// //                   :selectedBHK === "Cost of Ownership"
// //                     ? property?.CostofOwnership
// //                     : selectedBHK === "Project Timeline"
// //                       ? property?.ProjectTimeline
// //                       : selectedBHK === "Rera Details"
// //                         ? property?.ReraDetails
// //                         : [];

  
// //   console.log("Filtered Details:", filteredDetails);
// //   console.log("Selected BHK:", selectedBHK);
// // const selectedBHKConfig=property?.[selectedBHK] || {
// //   images: [],
// //   floorPlans : [],
// //   details : []
// // };

// //   const handleBHKChange = (bhk) => {
// //     setSelectedBHK(bhk);
// //     setShowCalculations(bhk === "Expert Review");
// //     setShowcows(bhk === "Cost of Ownership"); // Show calculations section if "Calculations" is selected
// //     setProjectTimeline(bhk === "Project Timeline");
// //     setShowRera(bhk === "Rera Details");
// //   };
// //   console.log("Filtered Details:", filteredDetails);
// //   console.log("Selected BHK:", selectedBHK);

// //   return (
// //     <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
// //       <Header />
// //       <div className="bg-black text-white p-6 lg:p-8">
// //         <div className="flex justify-between items-center flex-wrap pt-8">
// //           {property?.projectName && (
// //             <h1 className="text-yellow-500 text-xl font-bold mt-1">
// //               {property.projectName}, {property.address}
// //             </h1>
// //           )}
// //           <p className="text-gray-200 text-xl font-bold sm:text-lg mt-1">
// //             Starting from <span className="text-yellow-500">₹ {formatPrice(property.priceMin)}</span> -
// //             <span className="text-yellow-500"> ₹ {formatPrice(property.priceMax)}</span>
// //           </p>
// //         </div>


// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
// //           <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
// //             <h2 className="text-gray-300 text-lg font-bold mb-1">
// //               Project Pictures
// //             </h2>
// //             <CustomSwiper
// //               key={`swiper-project-${selectedBHK}`}
// //               images={
// //                 Array.isArray(property?.projectImages) && property.projectImages.length > 0
// //                   ? property.projectImages.map((img) => `${Image_URL}${img}`)
// //                   : [
// //                     "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// //                     "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// //                   ]
// //               }
// //             />
// //           </div>
// //           <div className="max-w-full md:max-w-[70%] mx-auto">
// //             <h2 className="text-gray-300 text-lg font-bold mb-1">
// //               Floor Plans
// //             </h2>
// //             <CustomSwiper
// //               key={`swiper-floor-${selectedBHK}`}
// //               images={
// //                 Array.isArray(property?.type1FloorPlan
// //                 ) && property.type1FloorPlan
// //                   .length > 0
// //                   ? property.type1FloorPlan
// //                     .map(img => `${Image_URL}${img}`)
// //                   : [
// //                     "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// //                     "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// //                   ]
// //               }
// //             />
// //           </div>
// //         </div>


// //         <div className="relative flex items-center">
// //           {/* Tab Row */}
// //           <div className="overflow-x-auto border-b border-gray-600 whitespace-nowrap [&::-webkit-scrollbar]:hidden flex-grow" id="bhkTabRow">
// //             <div className="flex space-x-4 ">
// //               {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Amenities", "Nearby", "Project Timeline", "Expert Review",
// //                 "Cost of Ownership", "Rera Details"].map((bhk) => {
// //                   console.log("bhk:", bhk); // ✅ Logs each BHK type correctly
// //                   return (
// //                     <button
// //                       key={bhk}
// //                       onClick={() => handleBHKChange(bhk)}
// //                       className={`px-4 py-2 ${selectedBHK === bhk
// //                         ? "text-white border-b-2 border-white"
// //                         : "text-[#36454F]"
// //                         } transition duration-200`}
// //                     >
// //                       {bhk}
// //                     </button>
// //                   );
// //                 })}
// //             </div>
// //           </div>


// //           {/* Scroll Button (Only in Mobile View) */}
// //           <button
// //             className="mt-2 py-1 bg-transparent text-white rounded-full shadow-md md:hidden"
// //             onClick={() => {
// //               const tabRow = document.getElementById("bhkTabRow");
// //               if (tabRow) {
// //                 tabRow.scrollBy({ left: 100, behavior: "smooth" }); // Scroll right
// //               }
// //             }}
// //           >
// //             &gt;
// //           </button>
// //         </div>


// //         {(Array.isArray(filteredDetails) && filteredDetails.length > 0) || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
// //           <>
// //             {console.log("filteredDetails:", filteredDetails)}
// //             {console.log("First Element of Filtered Details:", filteredDetails[0])}
// //             <div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
// //               {selectedBHK === "Amenities" ? (
// //                 // Render amenities directly
// //                 <div>
// //                   {/* <h3 className="text-lg font-bold text-white">Amenities</h3> */}
// //                   {property.Amenities && typeof property.Amenities === 'object' ? (
// //                     <div className="overflow-x-auto mt-2">
// //                       <table className="min-w-full text-left border-collapse">
// //                         <thead>
// //                           <tr className="border-b border-gray-600">
// //                             {Object.keys(property.Amenities).map((amenity) => (
// //                               <th key={amenity} className="p-2 text-center text-gray-300">{amenity}</th>
// //                             ))}
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           <tr className="border-b border-gray-600">
// //                             {Object.entries(property.Amenities).map(([amenity, value]) => (
// //                               <td key={amenity} className="p-2 text-gray-200">
// //                                 {value ? JSON.parse(value).join(", ") : "Not Available"}
// //                               </td>
// //                             ))}
// //                           </tr>
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   ) : (
// //                     <p className="text-gray-400">No amenities available.</p>
// //                   )}
// //                 </div>
// //               ) : selectedBHK === "Nearby" ? (
// //                 // Render nearby places directly
// //                 <div>
// //                   {/* <h3 className="text-lg font-bold text-white">Nearby</h3> */}
// //                   {property.Nearby && typeof property.Nearby === 'object' ? (
// //                     <div className="overflow-x-auto mt-2">
// //                       <table className="min-w-full text-left border-collapse">
// //                         <thead>
// //                           <tr className="border-b border-gray-600">
// //                             {Object.keys(property.Nearby).map((nearby) => (
// //                               <th key={nearby} className="p-2 text-center text-gray-300">{nearby}</th>
// //                             ))}
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           <tr className="border-b border-gray-600">
// //                             {Object.entries(property.Nearby).map(([nearby, value]) => (
// //                               <td key={nearby} className="p-2 text-gray-200">
// //                                 {value ? JSON.parse(value).join(", ") : "Not Available"}
// //                               </td>
// //                             ))}
// //                           </tr>
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   ) : (
// //                     <p className="text-gray-400">No nearby amenities available.</p>
// //                   )}
// //                 </div>
// //               ) : (
// //                 // Render BHK details
// //                 filteredDetails.map((detail, index) => {
// //                   const bhkConfig = detail; // Use detail directly for BHK configurations
// //                   console.log("bhkConfig:", bhkConfig);
// //                   if (!bhkConfig) return null; // Skip if no BHK data is found

// //                   let layout = [];
// //                   let area = [];

// //                   // Populate layout and area based on selected BHK
// //                   layout = ["Hall", "Kitchen", "Bed 1"];
// //                   area = [bhkConfig.hallArea, bhkConfig.kitchenArea, bhkConfig.bedroom1Area];

// //                   if (bhkConfig.bedroom2Area) {
// //                     layout.push("Bed 2");
// //                     area.push(bhkConfig.bedroom2Area);
// //                   }
// //                   if (bhkConfig.bedroom3Area) {
// //                     layout.push("Bed 3");
// //                     area.push(bhkConfig.bedroom3Area);
// //                   }

// //                   layout.push("Bath 1");
// //                   area.push(bhkConfig.bathroom1Area);

// //                   if (bhkConfig.bathroom2Area) {
// //                     layout.push("Bath 2");
// //                     area.push(bhkConfig.bathroom2Area);
// //                   }

// //                   layout.push("Balcony", "Parking");
// //                   area.push(
// //                     (bhkConfig.type1Balcony || 0) +
// //                     (bhkConfig.type2Balcony || 0) +
// //                     (bhkConfig.type3Balcony || 0)
// //                   );
// //                   area.push(
// //                     (bhkConfig.type1Parking || 0) +
// //                     (bhkConfig.type2Parking || 0) +
// //                     (bhkConfig.type3Parking || 0)
// //                   );

// //                   return (
// //                     <div key={index} className="p-4 rounded-lg shadow-md">
// //                       {/* {property.details.map((property, index) => ( */}
// //                       {/* Display the name if it exists */}
// //                       {detail.projectName && (
// //                         <h2 className="text-lg font-bold text-white">{detail.projectName}</h2>
// //                       )}


// //                       {/* If the property has a type, display it along with size */}
// //                       {bhkConfig.typeNumber && (
// //                         <h3 className="text-md font-semibold text-gray-300">
// //                           {bhkConfig.typeNumber} - {bhkConfig.type1Area} SqFt -{" "}
// //                           <span className="text-yellow-500">Rs. {property.priceMax}</span>
// //                         </h3>
// //                       )}


// //                       {/* Responsive Table */}
// //                       {layout.length > 0 && (
// //                         <div className="overflow-x-auto mt-2">
// //                           {/* Desktop View - Normal Table */}
// //                           <table className="hidden md:table min-w-full text-left border-collapse">
// //                             <thead>
// //                               <tr className="border-b border-gray-600">
// //                                 {property.layout.map((room, idx) => (
// //                                   <th key={idx} className="p-2 text-center text-gray-300">
// //                                     {room}
// //                                   </th>
// //                                 ))}
// //                               </tr>
// //                             </thead>
// //                             <tbody>
// //                               <tr className="border-b border-gray-600">
// //                                 {property.area.map((area, idx) => (
// //                                   <td key={idx} className="p-2 text-center text-gray-200">
// //                                     {area}
// //                                   </td>
// //                                 ))}
// //                               </tr>
// //                             </tbody>
// //                           </table>


// //                           {/* Mobile View - Two Column Format */}
// //                           <div className="md:hidden grid grid-cols-2 border border-gray-600 mt-2">
// //                             {property.layout.map((room, idx) => (
// //                               <div key={idx} className="contents">
// //                                 <div className="border-r border-b border-gray-600 p-2 text-center text-gray-300">
// //                                   {room}
// //                                 </div>
// //                                 <div className="border-b border-gray-600 p-2 text-center text-gray-200">
// //                                   {property.area[idx]}
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
                          

// //                         </div>
// //                   )}</div>
                          
// //                 );
// //               })
// //             )}
// //             </div>
// //           </>
// //           ): (
// //             <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
// //           )}




// //             {showrera && (
// //               <div className="p-4"> {/* Added padding around the table */}
// //                 <table className="w-full text-white border-collapse">
// //                   <thead>
// //                     <tr>
// //                       <th className="border-b border-gray-500 px-6 py-3 text-left">Rera Link</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     <tr>
// //                       <td className="border-b border-gray-500 px-6 py-3">
// //                         <a
// //                           href="https://www.google.com"
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="text-blue-500 underline"
// //                         >
// //                           Click here to check Rera details
// //                         </a>
// //                       </td>
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}




// //             {showProjectTimeline && <ProjectTimeline />}


// //             {/* Calculations Section */}
// //             {showCalculations && <Calculations />}


// //             {showcow && <CostOfOwnership />}


// //             <div className="fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
// //               <PhoneIcon className="w-5 h-5 text-yellow-500" />
// //               <span>Book Consultation</span>
// //             </div>
// //           </div>
// //       </div>
// //       );
// // }

// //       export default PropertyDetails;
// import { useState, useEffect } from "react";
// import CustomSwiper from "../Components/CustomSwiper";
// import Header from "../Components/Header";
// import PhoneIcon from "@mui/icons-material/Phone";
// import Calculations from "../Components/Calculations";
// import CostOfOwnership from "../Components/CostOfOwnership";
// import ProjectTimeline from "../Components/ProjectTimeline";
// import { useParams } from "react-router-dom";

// const bhkOptions = [
//   "1 BHK",
//   "2 BHK",
//   "3 BHK",
//   "4 BHK",
//   "Amenities",
//   "Nearby",
//   "Project Timeline",
//   "Expert Review",
//   "Cost of Ownership",
//   "Rera Details",
// ];

// const PropertyDetails = () => {
//   const { projectId } = useParams(); // Get Project_Id from URL
//   const [property, setProperty] = useState({});
//   const [selectedBHK, setSelectedBHK] = useState("1 BHK");
//   const [showCalculations, setShowCalculations] = useState(false);
//   const [showcow, setShowcows] = useState(false);
//   const [showProjectTimeline, setProjectTimeline] = useState(false);
//   const [showrera, setShowRera] = useState(false);
//   const [error, setError] = useState("");

//   const Image_URL = "http://localhost:8080"; // Update API URL

//   const formatPrice = (price) => {
//     if (price >= 10000000) {
//       return (price / 10000000).toLocaleString() + " Crore";
//     } else {
//       return (price / 100000).toLocaleString() + " Lakh";
//     }
//   };

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/entities/${projectId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch property details");
//         }
//         const data = await response.json();
//         if (!data || Object.keys(data).length === 0) {
//           setError("Property not found.");
//           setProperty(null);
//         } else {
//           setProperty(data);
//           setError(""); // Clear error if data exists
//         }
//       } catch (error) {
//         console.error("Error fetching property:", error);
//         setError("Error loading property details.");
//       }
//     };

//     if (projectId) fetchPropertyDetails();
//   }, [projectId]);

//   const handleBHKChange = (bhk) => {
//     setSelectedBHK(bhk);
//     setShowCalculations(bhk === "Expert Review");
//     setShowcows(bhk === "Cost of Ownership");
//     setProjectTimeline(bhk === "Project Timeline");
//     setShowRera(bhk === "Rera Details");
//   };

//   // Filter details based on selected BHK
//   const filteredDetails = (() => {
//     switch (selectedBHK) {
//       case "1 BHK":
//         return property?.oneBHKConfig || [];
//       case "2 BHK":
//         return property?.twoBHKConfig || [];
//       case "3 BHK":
//         return property?.threeBHKConfig || [];
//       case "4 BHK":
//         return property?.fourBHKConfig || [];
//       case "Amenities":
//         return property?.Amenities || [];
//       case "Nearby":
//         return property?.Nearby || [];
//       case "Calculations":
//         return property?.Calculations || [];
//       case "Cost of Ownership":
//         return property?.CostofOwnership || [];
//       case "Project Timeline":
//         return property?.ProjectTimeline || [];
//       case "Rera Details":
//         return property?.ReraDetails || [];
//       default:
//         return [];
//     }
//   })();

//   if (!property && !error) {
//     return <p className="text-white">Loading...</p>;
//   }
//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }
//   if (!property) return <p className="text-red-500">Property not found.</p>;

//   return (
//     <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
//       <Header />
//       <div className="bg-black text-white p-6 lg:p-8">
//         <div className="flex justify-between items-center flex-wrap pt-8">
//           {property?.projectName && (
//             <h1 className="text-yellow-500 text-xl font-bold mt-1">
//               {property.projectName}, {property.address}
//             </h1>
//           )}
//           <p className="text-gray-200 text-xl font-bold sm:text-lg mt-1">
//             Starting from <span className="text-yellow-500">₹ {formatPrice(property.priceMin)}</span> -
//             <span className="text-yellow-500"> ₹ {formatPrice(property.priceMax)}</span>
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
//           <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
//             <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
//             <CustomSwiper
//               key={`swiper-project-${selectedBHK}`}
//               images={
//                 Array.isArray(property?.projectImages) && property.projectImages.length > 0
//                   ? property.projectImages.map((img) => `${Image_URL}${img}`)
//                   : [
//                       "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                       "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                     ]
//               }
//             />
//           </div>
//           <div className="max-w-full md:max-w-[70%] mx-auto">
//             <h2 className="text-gray-300 text-lg font-bold mb-1">Floor Plans</h2>
//             <CustomSwiper
//               key={`swiper-floor-${selectedBHK}`}
//               images={
//                 Array.isArray(property?.type1FloorPlan) && property.type1FloorPlan.length > 0
//                   ? property.type1FloorPlan.map((img) => `${Image_URL}${img}`)
//                   : [
//                       "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                       "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                     ]
//               }
//             />
//           </div>
//         </div>

//         <div className="relative flex items-center">
//           {/* Tab Row */}
//           <div className="overflow-x-auto border-b border-gray-600 whitespace-nowrap [&::-webkit-scrollbar]:hidden flex-grow" id="bhkTabRow">
//             <div className="flex space-x-4 ">
//               {bhkOptions.map((bhk) => (
//                 <button
//                   key={bhk}
//                   onClick={() => handleBHKChange(bhk)}
//                   className={`px-4 py-2 ${selectedBHK === bhk ? "text-white border-b-2 border-white" : "text-[#36454F]"} transition duration-200`}
//                 >
//                   {bhk}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Scroll Button (Only in Mobile View) */}
//           <button
//             className="mt-2 py-1 bg-transparent text-white rounded-full shadow-md md:hidden"
//             onClick={() => {
//               const tabRow = document.getElementById("bhkTabRow");
//               if (tabRow) {
//                 tabRow.scrollBy({ left: 100, behavior: "smooth" }); // Scroll right
//               }
//             }}
//           >
//             &gt;
//           </button>
//         </div>

//         {(Array.isArray(filteredDetails) && filteredDetails.length > 0) || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
//           <>
//             <div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
//               {selectedBHK === "Amenities" ? (
//                 // Render amenities directly
//                 <div>
//                   {property.Amenities && typeof property.Amenities === 'object' ? (
//                     <div className="overflow-x-auto mt-2">
//                       <table className="min-w-full text-left border-collapse">
//                         <thead>
//                           <tr className="border-b border-gray-600">
//                             {Object.keys(property.Amenities).map((amenity) => (
//                               <th key={amenity} className="p-2 text-center text-gray-300">{amenity}</th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr className="border-b border-gray-600">
//                             {Object.entries(property.Amenities).map(([amenity, value]) => (
//                               <td key={amenity} className="p-2 text-gray-200">
//                                 {value ? JSON.parse(value).join(", ") : "Not Available"}
//                               </td>
//                             ))}
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <p className="text-gray-400">No amenities available.</p>
//                   )}
//                 </div>
//               ) : selectedBHK === "Nearby" ? (
//                 // Render nearby places directly
//                 <div>
//                   {property.Nearby && typeof property.Nearby === 'object' ? (
//                     <div className="overflow-x-auto mt-2">
//                       <table className="min-w-full text-left border-collapse">
//                         <thead>
//                           <tr className="border-b border-gray-600">
//                             {Object.keys(property.Nearby).map((nearby) => (
//                               <th key={nearby} className="p-2 text-center text-gray-300">{nearby}</th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr className="border-b border-gray-600">
//                             {Object.entries(property.Nearby).map(([nearby, value]) => (
//                               <td key={nearby} className="p-2 text-gray-200">
//                                 {value ? JSON.parse(value).join(", ") : "Not Available"}
//                               </td>
//                             ))}
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <p className="text-gray-400">No nearby amenities available.</p>
//                   )}
//                 </div>
//               ) : (
//                 // Render BHK details
//                 filteredDetails.map((detail, index) => {
//                   if (!detail) return null; // Skip if no BHK data is found

//                   const layout = ["Hall", "Kitchen", "Bed 1"];
//                   const area = [detail.hallArea, detail.kitchenArea, detail.bedroom1Area];

//                   if (detail.bedroom2Area) {
//                     layout.push("Bed 2");
//                     area.push(detail.bedroom2Area);
//                   }
//                   if (detail.bedroom3Area) {
//                     layout.push("Bed 3");
//                     area.push(detail.bedroom3Area);
//                   }

//                   layout.push("Bath 1");
//                   area.push(detail.bathroom1Area);

//                   if (detail.bathroom2Area) {
//                     layout.push("Bath 2");
//                     area.push(detail.bathroom2Area);
//                   }

//                   layout.push("Balcony", "Parking");
//                   area.push(
//                     (detail.type1Balcony || 0) +
//                     (detail.type2Balcony || 0) +
//                     (detail.type3Balcony || 0)
//                   );
//                   area.push(
//                     (detail.type1Parking || 0) +
//                     (detail.type2Parking || 0) +
//                     (detail.type3Parking || 0)
//                   );

//                   return (
//                     <div key={index} className="p-4 rounded-lg shadow-md">
//                       {detail.projectName && (
//                         <h2 className="text-lg font-bold text-white">{detail.projectName}</h2>
//                       )}
//                       {detail.typeNumber && (
//                         <h3 className="text-md font-semibold text-gray-300">
//                           {detail.typeNumber} - {detail.type1Area} SqFt -{" "}
//                           <span className="text-yellow-500">Rs. {property.priceMax}</span>
//                         </h3>
//                       )}
//                       {/* Responsive Table */}
//                       {layout.length > 0 && (
//                         <div className="overflow-x-auto mt-2">
//                           <table className="min-w-full text-left border-collapse">
//                             <thead>
//                               <tr className="border-b border-gray-600">
//                                 {layout.map((room, idx) => (
//                                   <th key={idx} className="p-2 text-center text-gray-300">
//                                     {room}
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody>
//                               <tr className="border-b border-gray-600">
//                                 {area.map((areaValue, idx) => (
//                                   <td key={idx} className="p-2 text-center text-gray-200">
//                                     {areaValue}
//                                   </td>
//                                 ))}
//                               </tr>
//                             </tbody>
//                           </table>
//                           {/* Mobile View - Two Column Format */}
//                            {/* <div className="md:hidden grid grid-cols-2 border border-gray-600 mt-2">
//                              {property.layout.map((room, idx) => (
//                                <div key={idx} className="contents">
//                                  <div className="border-r border-b border-gray-600 p-2 text-center text-gray-300">
//                                    {room}
//                                  </div>
//                                  <div className="border-b border-gray-600 p-2 text-center text-gray-200">
//                                    {property.area[idx]}
//                                  </div>
//                                </div>
//                              ))}
//                           </div> */}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
//         )}

//         {showrera && (
//           <div className="p-4">
//             <table className="w-full text-white border-collapse">
//               <thead>
//                 <tr>
//                   <th className="border-b border-gray-500 px-6 py-3 text-left">Rera Link</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border-b border-gray-500 px-6 py-3">
//                     <a
//                       href="https://www.google.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline"
//                     >
//                       Click here to check Rera details
//                     </a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {showProjectTimeline && <ProjectTimeline />}
//         {showCalculations && <Calculations />}
//         {showcow && <CostOfOwnership />}

//         <div className="fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
//           <PhoneIcon className="w-5 h-5 text-yellow-500" />
//           <span>Book Consultation</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;
import { useState, useEffect } from "react";
import CustomSwiper from "../Components/CustomSwiper";
import Header from "../Components/Header";
import PhoneIcon from "@mui/icons-material/Phone";
import Calculations from "../Components/Calculations";
import CostOfOwnership from "../Components/CostOfOwnership";
import ProjectTimeline from "../Components/ProjectTimeline";
import { useParams } from "react-router-dom";

const bhkOptions = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Amenities",
  "Nearby",
  "Project Timeline",
  "Expert Review",
  "Cost of Ownership",
  "Rera Details",
  "Govt Documentation"
];

const PropertyDetails = () => {
  const { projectId } = useParams(); // Get Project_Id from URL
  const [property, setProperty] = useState({});
  const [selectedBHK, setSelectedBHK] = useState("1 BHK");
  const [showCalculations, setShowCalculations] = useState(false);
  const [showcow, setShowcows] = useState(false);
  const [showProjectTimeline, setProjectTimeline] = useState(false);
  const [showrera, setShowRera] = useState(false);
  const [error, setError] = useState("");

  const Image_URL = "http://localhost:8080"; // Update API URL

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toLocaleString() + " Crore";
    } else {
      return (price / 100000).toLocaleString() + " Lakh";
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/entities/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          setError("Property not found.");
          setProperty(null);
        } else {
          setProperty(data);
          setError(""); // Clear error if data exists
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Error loading property details.");
      }
    };

    if (projectId) fetchPropertyDetails();
  }, [projectId]);

  const handleBHKChange = (bhk) => {
    setSelectedBHK(bhk);
    setShowCalculations(bhk === "Expert Review");
    setShowcows(bhk === "Cost of Ownership");
    setProjectTimeline(bhk === "Project Timeline");
    setShowRera(bhk === "Rera Details");
  };

  // Filter details based on selected BHK
  const filteredDetails = (() => {
    switch (selectedBHK) {
      case "1 BHK":
        return property?.oneBHKConfig || [];
      case "2 BHK":
        return property?.twoBHKConfig || [];
      case "3 BHK":
        return property?.threeBHKConfig || [];
      case "4 BHK":
        return property?.fourBHKConfig || [];
      case "Amenities":
        return property?.Amenities || [];
      case "Nearby":
        return property?.Nearby || [];
      case "Calculations":
        return Calculations;
      case "Cost of Ownership":
        return CostOfOwnership;
      case "Project Timeline":
        return ProjectTimeline ;
      case "Rera Details":
        return property.ReraDetails || [];
      default:
        return [];
    }
  })();

  if (!property && !error) {
    return <p className="text-white">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!property) return <p className="text-red-500">Property not found.</p>;

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
      <Header />
      <div className="bg-black text-white p-6 lg:p-8">
        <div className="flex justify-between items-center flex-wrap pt-8">
          {property?.projectName && (
            <h1 className="text-yellow-500 text-xl font-bold mt-1">
              {property.projectName}, {property.address}
            </h1>
          )}
          <p className="text-gray-200 text-xl font-bold sm:text-lg mt-1">
            Starting from <span className="text-yellow-500">₹ {formatPrice(property.priceMin)}</span> -
            <span className="text-yellow-500"> ₹ {formatPrice(property.priceMax)}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
            <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
            <CustomSwiper
              key={`swiper-project-${selectedBHK}`}
              images={
                Array.isArray(property?.projectImages) && property.projectImages.length > 0
                  ? property.projectImages.map((img) => `${Image_URL}${img}`)
                  : [
                      "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    ]
              }
            />
          </div>
          <div className="max-w-full md:max-w-[70%] mx-auto">
            <h2 className="text-gray-300 text-lg font-bold mb-1">Floor Plans</h2>
            <CustomSwiper
              key={`swiper-floor-${selectedBHK}`}
              images={
                // Array.isArray(property?.type1FloorPlan) && property.type1FloorPlan.length > 0
                //   ? property.type1FloorPlan.map((img) => `${Image_URL}${img}`)
                //   : [
                //       "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                //       "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                //     ]
                // Check for floor plan images based on selected BHK
                (selectedBHK === "1 BHK" && property.oneBHKConfig?.length > 0 && property.oneBHKConfig[0]?.type1FloorPlan?.length > 0)
                ? property.oneBHKConfig[0].type1FloorPlan.map((img) => `${Image_URL}${img}`)
                : (selectedBHK === "2 BHK" && property.twoBHKConfig?.length > 0 && property.twoBHKConfig[0]?.type2FloorPlan?.length > 0)
                ? property.twoBHKConfig[0].type2FloorPlan.map((img) => `${Image_URL}${img}`)
                : (selectedBHK === "3 BHK" && property.threeBHKConfig?.length > 0 && property.threeBHKConfig[0]?.type3FloorPlan?.length > 0)
                ? property.threeBHKConfig[0].type3FloorPlan.map((img) => `${Image_URL}${img}`)
                : property.projectImages?.length > 0 // Fallback to project images if no floor plans are available
                ? property.projectImages.map((img) => `${Image_URL}${img}`)
                : [
                    "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  ]
              }
            />
          </div>
        </div>

        <div className="relative flex items-center">
          {/* Tab Row */}
          <div className="overflow-x-auto border-b border-gray-600 whitespace-nowrap [&::-webkit-scrollbar]:hidden flex-grow" id="bhkTabRow">
            <div className="flex space-x-3 ">
              {bhkOptions.map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => handleBHKChange(bhk)}
                  className={`px-4 py-2 ${selectedBHK === bhk ? "text-white border-b-2 border-white" : "text-[#36454F]"} transition duration-200`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll Button (Only in Mobile View) */}
          <button
            className="mt-2 py-1 bg-transparent text-white rounded-full shadow-md md:hidden"
            onClick={() => {
              const tabRow = document.getElementById("bhkTabRow");
              if (tabRow) {
                tabRow.scrollBy({ left: 100, behavior: "smooth" }); // Scroll right
              }
            }}
          >
            &gt;
          </button>
        </div>

        {(Array.isArray(filteredDetails) && filteredDetails.length > 0) || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
          <>
            <div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              {selectedBHK === "Amenities" ? (
                // Render amenities directly
                <div>
                  {property.Amenities && typeof property.Amenities === 'object' ? (
                    <div className="overflow-x-auto mt-2">
      {/* Desktop View - Table */}
      <table className="min-w-full text-left border-collapse hidden md:table">
        <thead>
          <tr className="border-b border-gray-600">
            {Object.keys(property.Amenities).map((amenity) => (
              <th key={amenity} className="p-2 text-center text-gray-300">{amenity}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-600">
            {Object.entries(property.Amenities).map(([amenity, value]) => (
              <td key={amenity} className="p-2 text-gray-200">
                {value ? JSON.parse(value).join(", ") : "Not Available"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Mobile View - Two Column Format */}
      <div className="md:hidden grid grid-cols-1 border border-gray-600 gap-2">
        {Object.entries(property.Amenities).map(([amenity, value]) => (
          <div key={amenity} className="flex">
            <div className="border-b border-gray-600 p-2 text-gray-300 w-1/2">
              {amenity}:
            </div>
            <div className="border-b border-gray-600 p-2 text-gray-200 w-1/2">
              {value ? JSON.parse(value).join(", ") : "Not Available"}
            </div>
          </div>
        ))}
      </div>
      </div>
                  ) : (
                    <p className="text-gray-400">No amenities available.</p>
                  )}
                </div>
              ) : selectedBHK === "Nearby" ? (
                // Render nearby places directly
                <div>
                  {property.Nearby && typeof property.Nearby === 'object' ? (
                   
                    <div className="overflow-x-auto mt-2">
      {/* Desktop View - Table */}
      <table className="min-w-full text-left border-collapse hidden md:table">
        <thead>
          <tr className="border-b border-gray-600">
            {Object.keys(property.Nearby).map((nearby) => (
              <th key={nearby} className="p-2 text-center text-gray-300">{nearby}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-600">
            {Object.entries(property.Nearby).map(([nearby, value]) => (
              <td key={nearby} className="p-2 text-gray-200">
                {value ? JSON.parse(value).join(", ") : "Not Available"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Mobile View - Two Column Format */}
      <div className="md:hidden grid grid-cols-1 border border-gray-600 gap-2">
        {Object.entries(property.Nearby).map(([nearby, value]) => (
          <div className="flex" key={nearby}>
            <div className="border-b border-gray-600 p-2 text-gray-300 w-1/2">
              {nearby}:
            </div>
            <div className="border-b border-gray-600 p-2 text-gray-200 w-1/2">
              {value ? JSON.parse(value).join(", ") : "Not Available"}
            </div>
          </div>
        ))}
      </div>
    </div>
                  ) : (
                    <p className="text-gray-400">No nearby available.</p>
                  )}
                </div>
              ) : (
                // Render BHK details
                filteredDetails.map((detail, index) => {
                  if (!detail) return null; // Skip if no BHK data is found

                  const layout = ["Hall", "Kitchen", "Bed 1"];
                  const area = [detail.hallArea, detail.kitchenArea, detail.bedroom1Area];

                  if (detail.bedroom2Area) {
                    layout.push("Bed 2");
                    area.push(detail.bedroom2Area);
                  }
                  if (detail.bedroom3Area) {
                    layout.push("Bed 3");
                    area.push(detail.bedroom3Area);
                  }

                  layout.push("Bath 1");
                  area.push(detail.bathroom1Area);

                  if (detail.bathroom2Area) {
                    layout.push("Bath 2");
                    area.push(detail.bathroom2Area);
                  }

                  layout.push("Balcony", "Parking");
                  area.push(
                    (detail.type1Balcony || 0) +
                    (detail.type2Balcony || 0) +
                    (detail.type3Balcony || 0)
                  );
                  area.push(
                    (detail.type1Parking || 0) +
                    (detail.type2Parking || 0) +
                    (detail.type3Parking || 0)
                  );

                  return (
                    <div key={index} className="p-4 rounded-lg shadow-md">
                      {detail.projectName && (
                        <h2 className="text-lg font-bold text-white">{detail.projectName}</h2>
                      )}
                      {detail.typeNumber && (
                        <h3 className="text-md font-semibold text-gray-300">
                          {detail.typeNumber} - {detail.type1Area} SqFt -{" "}
                          <span className="text-yellow-500">Rs. {property.priceMax}</span>
                        </h3>
                      )}
                      {/* Responsive Table */}
                      {layout.length > 0 && (
                        <div className="overflow-x-auto mt-2">
                          {/* Mobile View - Two Column Format */}
                          <div className="md:hidden grid grid-cols-2 border border-gray-600 mt-2">
                            {layout.map((room, idx) => (
                              <div key={idx} className="contents">
                                <div className="border-r border-b border-gray-600 p-2 text-center text-gray-300">
                                  {room}
                                </div>
                                <div className="border-b border-gray-600 p-2 text-center text-gray-200">
                                  {area[idx]}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Desktop View - Normal Table */}
                          <table className="hidden md:table min-w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-600">
                                {layout.map((room, idx) => (
                                  <th key={idx} className="p-2 text-center text-gray-300">
                                    {room}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-600">
                                {area.map((areaValue, idx) => (
                                  <td key={idx} className="p-2 text-center text-gray-200">
                                    {areaValue}
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          // Display message only for BHK options
        (selectedBHK === "1 BHK" || selectedBHK === "2 BHK" || selectedBHK === "3 BHK" || selectedBHK === "4 BHK") && (
          <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.
          </p>
          
        )
          // <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
          // Display message only for BHK options
        // (selectedBHK === "1 BHK" || selectedBHK === "2 BHK" || selectedBHK === "3 BHK" || selectedBHK === "4 BHK") && (
        //   <div className="text-gray-400 text-center mt-4">
        //     <p>No data available for {selectedBHK}.</p>
        //   ) : (
        //     <p>&nbsp;</p> // Placeholder to reserve space
        //   )}
        //   </div>
         // Always reserve space for the message
      //    <div className="text-gray-400 text-center mt-4">
      //    {(selectedBHK === "1 BHK" || selectedBHK === "2 BHK" || selectedBHK === "3 BHK" || selectedBHK === "4 BHK") ? (
      //      <p>No data available for {selectedBHK}.</p>
      //    ) : (
      //      <p>&nbsp;</p> // Placeholder to reserve space
      //    )}
      //  </div>
        )}

        {showrera && (
          <div className="p-4">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-500 px-6 py-3 text-left">Rera Link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-gray-500 px-6 py-3">
                    <a
                      href="https://www.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Click here to check Rera details
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {showProjectTimeline && 
        <div><ProjectTimeline />
        <p>&nbsp;</p> </div>}
        {showCalculations && <Calculations />}
        {showcow && <CostOfOwnership />}

        <div className="fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
          <PhoneIcon className="w-5 h-5 text-yellow-500" />
          <span>Book Consultation</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;