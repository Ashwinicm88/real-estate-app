// import { useState, useEffect,useRef} from "react";


// import CustomSwiper from "../Components/CustomSwiper";
// import Header from "../Components/Header";
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
//   "Govt Documentation",
// ];
 
// const PropertyDetails = () => {
//   const { projectId } = useParams(); // Get Project_Id from URL
//   const [property, setProperty] = useState(null);
//   const [selectedBHK, setSelectedBHK] = useState("1 BHK");
//   const [showCostOfOwnership, setShowCostOfOwnership] = useState(false);
//   const [showProjectTimeline, setShowProjectTimeline] = useState(false);
//   const [showRera, setShowRera] = useState(false);
//   const [showExpertReview, setShowExpertReview] = useState(false);
//   const [error, setError] = useState("");
//   //  const navigate = useNavigate();
//    const tabRowRef = useRef(null);

//    const handleScrollRight = () => {
//      if (tabRowRef.current) {
//        tabRowRef.current.scrollBy({
//          left: 100, // adjust scroll distance as needed
//          behavior: "smooth",
//        });
//      }
//    };
 
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
//     setShowCostOfOwnership(bhk === "Cost of Ownership");
//     setShowProjectTimeline(bhk === "Project Timeline");
//     setShowRera(bhk === "Govt Documentation");
//     setShowExpertReview(bhk === "Expert Review");
//   };
 
//   const getImagesForSelectedBHK = () => {
//     if (!property) return []; // Early return if property is 
//     let images = [];
//     switch (selectedBHK) {
//       case "1 BHK":
//         images = property?.oneBHKConfig?.[0]?.type1Images || [];
//         break;
//       case "2 BHK":
//         images = property?.twoBHKConfig?.[0]?.type2Images || [];
//         break;
//       case "3 BHK":
//         images = property?.threeBHKConfig?.[0]?.type3Images || [];
//         break;
//       case "4 BHK":
//         images = property?.fourBHKConfig?.[0]?.type4Images || [];
//         break;
//       default:
//         images = property?.projectImages || [];
//         break;
//     }
//     if (!property) return <p className="text-red-500">Property not found.</p>;
//     console.log("Retrieved images:", images);
  
//     // If no images found, return project images
//     if (images.length === 0) {
//       images = property.projectImages || [];
//       console.log("Falling back to project images:", images);
//     }
//     return images.map((img) => `${Image_URL}${img}`);
//   };
 
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
//       case "Govt Documentation":
//         return property.ReraDetails || [];
//       default:
//         return [];
//     }
//   })();
//     // Log the images for debugging
       
 
 
//   if (!property && !error) {
//     return <p className="text-white">Loading...</p>;
//   }
//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }
//   // const handleBack = () => {
//   //   navigate(-1); // navigates to the previous page
//   // };

   
 
//   return (
//     <div className="bg-black text-white px-4 sm:px-6 lg:px-14 min-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[400px]">
//       <Header />
//       <div className="bg-black text-white p-6 lg:p-8">
//         <div className="flex justify-between items-center flex-wrap pt-8">
//         {/* <button
//             onClick={handleBack}
//             className="bg-transparent text-yellow-500"
//           >
//             Back
//           </button> */}
//           {property?.projectName && (
//             <h1 className="text-yellow-500 text-xl font-bold mt-1">
//               {property.projectName} @ <span className="text-yellow-500">₹ {formatPrice(property.priceMin)}</span> -
//               <span className="text-yellow-500"> ₹ {formatPrice(property.priceMax)}</span>
//             </h1>
//           )}
         
//         </div>
 
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
//           <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
//             <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
//             <CustomSwiper
//               key={`swiper-project-${selectedBHK}`}
//               images={getImagesForSelectedBHK()}
//             />
//           </div>
 
//           <div className="max-w-full md:max-w-[70%] mx-auto">
//             <h2 className="text-gray-300 text-lg font-bold mb-1">Floor Plans</h2>
//             <CustomSwiper
//               key={`swiper-floor-${selectedBHK}`}
//               images={
//                 selectedBHK === "1 BHK" && property.oneBHKConfig?.[0]?.type1FloorPlan?.length > 0
//                   ? property.oneBHKConfig[0].type1FloorPlan.map((img) => `${Image_URL}${img}`)
//                   : selectedBHK === "2 BHK" && property.twoBHKConfig?.[0]?.type2FloorPlan?.length > 0
//                   ? property.twoBHKConfig[0].type2FloorPlan.map((img) => `${Image_URL}${img}`)
//                   : selectedBHK === "3 BHK" && property.threeBHKConfig?.[0]?.type3FloorPlan?.length > 0
//                   ? property.threeBHKConfig[0].type3FloorPlan.map((img) => `${Image_URL}${img}`)
//                   : [
//                     ...(property.oneBHKConfig?.[0]?.type1FloorPlan || []),
//                     ...(property.twoBHKConfig?.[0]?.type2FloorPlan || []),
//                     ...(property.threeBHKConfig?.[0]?.type3FloorPlan || [])
//                   ].map((img) => `${Image_URL}${img}`)
                  
//               }
              
//             />
//           </div>
//         </div>
 
//         <div className="relative flex items-center">
//       <div
//         ref={tabRowRef}
//         className="overflow-x-auto border-b border-gray-600 whitespace-nowrap [&::-webkit-scrollbar]:hidden flex-grow"
//         id="bhkTabRow"
//       >
//         <div className="flex space-x-3">
//           {bhkOptions.map((bhk) => (
//             <button
//               key={bhk}
//               onClick={() => handleBHKChange(bhk)}
//               className={`px-4 py-2 ${
//                 selectedBHK === bhk
//                   ? "text-white border-b-2 border-white"
//                   : "text-[#36454F]"
//               } transition duration-200`}
//             >
//               {bhk}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right Scroll Button */}
//       <button
//         onClick={handleScrollRight}
//         className="ml-2 text-white bg-transparent hover:bg-gray-600 rounded-full p-1 block md:hidden"
//         title="Scroll right"
//       >
//         &gt;
//       </button>
//     </div>
 
//         {(Array.isArray(filteredDetails) && filteredDetails.length > 0) || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
//           <div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
//             {selectedBHK === "Amenities" ? (
//               <div>
//                 {property.Amenities && typeof property.Amenities === 'object' ? (
//                   <div className="overflow-x-auto mt-2">
//                     <table className="min-w-full text-left border-collapse hidden md:table">
//                       <thead>
//                         <tr className="border-b border-gray-600">
//                           {Object.keys(property.Amenities).map((amenity) => (
//                             <th key={amenity} className="p-2 text-center text-gray-300">{amenity}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr className="border-b border-gray-600">
//                           {Object.entries(property.Amenities).map(([amenity, value]) => (
//                             <td key={amenity} className="p-2 text-center text-gray-200">
//                               {value ? JSON.parse(value).join(", ") : "Not Available"}
//                             </td>
//                           ))}
//                         </tr>
//                       </tbody>
//                     </table>
//                     <div className="md:hidden grid grid-cols-1 border border-gray-600 gap-2">
//                       {Object.entries(property.Amenities).map(([amenity, value]) => (
//                         <div key={amenity} className="flex">
//                           <div className="border-b border-gray-600 p-2 text-gray-300 w-1/2">
//                             {amenity}:
//                           </div>
//                           <div className="border-b border-gray-600 p-2 text-gray-200 w-1/2">
//                             {value ? JSON.parse(value).join(", ") : "Not Available"}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-gray-400">No amenities available.</p>
//                 )}
//               </div>
//             ) : selectedBHK === "Nearby" ? (
//               <div>
//                 {property.Nearby && typeof property.Nearby === 'object' ? (
//                   <div className="overflow-x-auto mt-2">
//                     <table className="min-w-full text-left border-collapse hidden md:table">
//                       <thead>
//                         <tr className="border-b border-gray-600">
//                           {Object.keys(property.Nearby).map((nearby) => (
//                             <th key={nearby} className="p-2 text-center text-gray-300">{nearby}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr className="border-b border-gray-600">
//                           {Object.entries(property.Nearby).map(([nearby, value]) => (
//                             <td key={nearby} className="p-2 text-center text-gray-200">
//                               {value ? JSON.parse(value).join(", ") : "Not Available"}
//                             </td>
//                           ))}
//                         </tr>
//                       </tbody>
//                     </table>
//                     <div className="md:hidden grid grid-cols-1 border border-gray-600 gap-2">
//                       {Object.entries(property.Nearby).map(([nearby, value]) => (
//                         <div className="flex" key={nearby}>
//                           <div className="border-b border-gray-600 p-2 text-gray-300 w-1/2">
//                             {nearby}:
//                           </div>
//                           <div className="border-b border-gray-600 p-2 text-gray-200 w-1/2">
//                             {value ? JSON.parse(value).join(", ") : "Not Available"}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-gray-400">No nearby available.</p>
//                 )}
//               </div>
//             ) : (
//               filteredDetails.map((detail, index) => {
//                 if (!detail) return null; // Skip if no BHK data is found
 
//                 const layout = ["Hall", "Kitchen", "Bed 1"];
//                 const area = [detail.hallArea, detail.kitchenArea, detail.bedroom1Area];
 
//                 if (detail.bedroom2Area) {
//                   layout.push("Bed 2");
//                   area.push(detail.bedroom2Area);
//                 }
//                 if (detail.bedroom3Area) {
//                   layout.push("Bed 3");
//                   area.push(detail.bedroom3Area);
//                 }
 
//                 layout.push("Bath 1");
//                 area.push(detail.bathroom1Area);
 
//                 if (detail.bathroom2Area) {
//                   layout.push("Bath 2");
//                   area.push(detail.bathroom2Area);
//                 }
 
//                 layout.push("Balcony", "Parking");
//                 area.push(
//                   (detail.type1Balcony || 0) +
//                   (detail.type2Balcony || 0) +
//                   (detail.type3Balcony || 0)
//                 );
//                 area.push(
//                   (detail.type1Parking || 0) +
//                   (detail.type2Parking || 0) +
//                   (detail.type3Parking || 0)
//                 );
 
//                 return (
//                   <div key={index} className="p-4 rounded-lg shadow-md">
//                     {detail.projectName && (
//                       <h2 className="text-lg font-bold text-white">{detail.projectName}</h2>
//                     )}
//                     {detail.typeNumber && (
//                       <h3 className="text-md font-semibold text-gray-300">
//                         Type {detail.typeNumber} - {detail.type1Area} SqFt -{" "}
//                         <span className="text-yellow-500">Rs. {property.priceMax}</span>
//                       </h3>
//                     )}
//                     {layout.length > 0 && (
//                       <div className="overflow-x-auto mt-2">
//                         <div className="md:hidden grid grid-cols-2 border border-gray-600 mt-2">
//                           {layout.map((room, idx) => (
//                             <div key={idx} className="contents">
//                               <div className="border-r border-b border-gray-600 p-2 text-center text-gray-300">
//                                 {room}
//                               </div>
//                               <div className="border-b border-gray-600 p-2 text-center text-gray-200">
//                                 {area[idx]}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                         <table className="hidden md:table min-w-full text-left border-collapse">
//                           <thead>
//                             <tr className="border-b border-gray-600">
//                               {layout.map((room, idx) => (
//                                 <th key={idx} className="p-2 text-center text-gray-300">
//                                   {room}
//                                 </th>
//                               ))}
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr className="border-b border-gray-600">
//                               {area.map((areaValue, idx) => (
//                                 <td key={idx} className="p-2 text-center text-gray-200">
//                                   {areaValue}
//                                 </td>
//                               ))}
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         ) : (
//           (selectedBHK === "1 BHK" || selectedBHK === "2 BHK" || selectedBHK === "3 BHK" || selectedBHK === "4 BHK") && (
//             <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
//           )
//         )}
 
//         {showRera && (
//           <div className="p-4">
//             <table className="w-full text-white border-collapse">
//               <thead>
//                 <tr>
//                   <th className="border-b border-gray-500 px-6 py-3 text-left">Rera Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border-b border-gray-500 px-6 py-3">
//                     Rera Link:
//                     {property.reralink && (
//                       <a
//                         href={property.reralink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 underline"
//                       >
//                         Click here
//                       </a>
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
 
//         {showProjectTimeline && <ProjectTimeline />}
 
//         {showExpertReview && property.expertReview && (
//           <div className="mt-6 p-4 border border-gray-600 px-6">
//             <p className="text-gray-200">{property.expertReview.reviewText}</p>
//           </div>
//         )}
 
//         {/* {showCostOfOwnership && <CostOfOwnership />} */}
//         {showCostOfOwnership && property && (
//           console.log("City name:",property.city),
//   <CostOfOwnership defaultLocation={property.city} 
//   />
  
// )}
 
//         {/* <div className="hidden md:flex fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
//           <PhoneIcon className="w-5 h-5 text-yellow-500" />
//           <span>Book Consultation</span>
//         </div> */}
//       </div>
//     </div>
//   );
// };
 
// export default PropertyDetails;


import { useState, useEffect,useRef} from "react";
import CustomSwiper from "../Components/CustomSwiper";
import Header from "../Components/Header";
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
  "Govt Documentation",
];
 
const ImagePreviewModal = ({ images, initialImage, onClose }) => {
  const initialIndex = images.findIndex((img) => img.src === initialImage); // ✅ compare by `src`

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 z-50 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>

        <CustomSwiper
          items={images} // Already in correct format
          initialSlide={initialIndex}
          onImageClick={() => {}}
          height="h-[70vh]"
        />
      </div>
    </div>
  );
};




const PropertyDetails = () => {
  const { projectId } = useParams(); // Get Project_Id from URL
  const [property, setProperty] = useState(null);
  const [selectedBHK, setSelectedBHK] = useState("1 BHK");
  const [showCostOfOwnership, setShowCostOfOwnership] = useState(false);
  const [showProjectTimeline, setShowProjectTimeline] = useState(false);
  const [showRera, setShowRera] = useState(false);
  const [showExpertReview, setShowExpertReview] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // clicked image
const [previewImages, setPreviewImages] = useState([]); // all images for modal

  //  const navigate = useNavigate();
   const tabRowRef = useRef(null);

   const handleScrollRight = () => {
     if (tabRowRef.current) {
       tabRowRef.current.scrollBy({
         left: 100, // adjust scroll distance as needed
         behavior: "smooth",
       });
     }
   };
 
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
    setShowCostOfOwnership(bhk === "Cost of Ownership");
    setShowProjectTimeline(bhk === "Project Timeline");
    setShowRera(bhk === "Govt Documentation");
    setShowExpertReview(bhk === "Expert Review");
  };
 
  // const getImagesForSelectedBHK = () => {
  //   if (!property) return [];
  
  //   let items = [];
  
  //   switch (selectedBHK) {
  //     case "1 BHK":
  //       items = property?.oneBHKConfig?.[0]?.type1Images?.map((img) => ({
  //         type: "image",
  //         src: `${Image_URL}${img}`,
  //       })) || [];
  //       break;
  //     case "2 BHK":
  //       items = property?.twoBHKConfig?.[0]?.type2Images?.map((img) => ({
  //         type: "image",
  //         src: `${Image_URL}${img}`,
  //       })) || [];
  //       break;
  //     case "3 BHK":
  //       items = property?.threeBHKConfig?.[0]?.type3Images?.map((img) => ({
  //         type: "image",
  //         src: `${Image_URL}${img}`,
  //       })) || [];
  //       break;
  //     case "4 BHK":
  //       items = property?.fourBHKConfig?.[0]?.type4Images?.map((img) => ({
  //         type: "image",
  //         src: `${Image_URL}${img}`,
  //       })) || [];
  //       break;
  //     default: {
  //       // Only in default, include both images and video
  //       const images = property?.projectImages?.map((img) => ({
  //         type: "image",
  //         src: `${Image_URL}${img}`,
  //       })) || [];
        
  //       const videos = property?.projectVideoLink?.map((vid) => ({
  //         type: "video",
  //         src: `${Image_URL}${vid}`,
  //       })) || [];
        
  //       items = [...images, ...videos];
        
  //     }
  //   }
  
  //   return items;
  // };
  
  const getImagesForSelectedBHK = () => {
    if (!property) return [];
  
    let items = [];
  
    // Check for images based on selected BHK
    switch (selectedBHK) {
      case "1 BHK":
        items = property?.oneBHKConfig?.[0]?.type1Images?.map((img) => ({
          type: "image",
          src: `${Image_URL}${img}`,
        })) || [];
        break;
      case "2 BHK":
        items = property?.twoBHKConfig?.[0]?.type2Images?.map((img) => ({
          type: "image",
          src: `${Image_URL}${img}`,
        })) || [];
        break;
      case "3 BHK":
        items = property?.threeBHKConfig?.[0]?.type3Images?.map((img) => ({
          type: "image",
          src: `${Image_URL}${img}`,
        })) || [];
        break;
      case "4 BHK":
        items = property?.fourBHKConfig?.[0]?.type4Images?.map((img) => ({
          type: "image",
          src: `${Image_URL}${img}`,
        })) || [];
        break;
      default:
        break;
    }
  
    // If no images found for the selected BHK, show project images and videos
    if (items.length === 0) {
      const images = property?.projectImages?.map((img) => ({
        type: "image",
        src: `${Image_URL}${img}`,
      })) || [];
  
      const videos = property?.projectVideoLink?.map((vid) => ({
        type: "video",
        src: `${Image_URL}${vid}`,
      })) || [];
  
      items = [...images, ...videos];
    }
  
    return items;
  };
  
 
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
      case "Govt Documentation":
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
  const getFloorPlanImages = () => {
    if (selectedBHK === "1 BHK" && property.oneBHKConfig?.[0]?.type1FloorPlan?.length > 0) {
      return property.oneBHKConfig[0].type1FloorPlan.map((img) => `${Image_URL}${img}`);
    }
    if (selectedBHK === "2 BHK" && property.twoBHKConfig?.[0]?.type2FloorPlan?.length > 0) {
      return property.twoBHKConfig[0].type2FloorPlan.map((img) => `${Image_URL}${img}`);
    }
    if (selectedBHK === "3 BHK" && property.threeBHKConfig?.[0]?.type3FloorPlan?.length > 0) {
      return property.threeBHKConfig[0].type3FloorPlan.map((img) => `${Image_URL}${img}`);
    }
  
    return [
      ...(property.oneBHKConfig?.[0]?.type1FloorPlan || []),
      ...(property.twoBHKConfig?.[0]?.type2FloorPlan || []),
      ...(property.threeBHKConfig?.[0]?.type3FloorPlan || [])
    ].map((img) => `${Image_URL}${img}`);
  };
  
   
 
  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14 min-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[400px]">
      <Header />
      <div className="bg-black text-white p-6 lg:p-8">
        <div className="flex justify-between items-center flex-wrap pt-8">
     
          {property?.projectName && (
            <h1 className="text-yellow-500 text-xl font-bold mt-1">
              {property.projectName} @ <span className="text-yellow-500">₹ {formatPrice(property.priceMin)}</span> -
              <span className="text-yellow-500"> ₹ {formatPrice(property.priceMax)}</span>
            </h1>
          )}
         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
  {/* Project Pictures */}
  <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
  <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
  <CustomSwiper
      key={`swiper-project-${selectedBHK}`}
      items={getImagesForSelectedBHK()}
      onImageClick={(item) => {
        setPreviewImage(item.src);
        setPreviewImages(getImagesForSelectedBHK());
      }}
      renderItem={(item) =>
        item.type === "image" ? (
          <img
            src={item.src}
            alt="project"
            className="w-full h-auto object-cover rounded-md"
          />
        ) : (
          <video
            controls
            src={item.src}
            className="w-full h-auto object-cover rounded-md"
          />
        )
      }
    />
</div>

{/* Floor Plans */}
<div className="max-w-full md:max-w-[70%] mx-auto">
  <h2 className="text-gray-300 text-lg font-bold mb-1">Floor Plans</h2>
  <CustomSwiper
    key={`swiper-floor-${selectedBHK}`}
    items={getFloorPlanImages().map((img) => ({
      type: "image",
      src: img,
    }))}
    onImageClick={(item) => {
      if (item.type === "image") {
        setPreviewImage(item.src); // Set selected image for floor plan
        setPreviewImages(
          getFloorPlanImages().map((img) => ({
            type: "image",
            src: img,
          })) // Set all images for floor plan swiper in the modal
        );
      }
    }}
  />
</div>

{/* Modal */}
{previewImage && (
  <ImagePreviewModal
    images={previewImages}
    initialImage={previewImage}
    onClose={() => {
      setPreviewImage(null);
      setPreviewImages([]); // Clear preview data when modal closes
    }}
  />
)}

</div>


 
        <div className="relative flex items-center">
      <div
        ref={tabRowRef}
        className="overflow-x-auto border-b border-gray-600 whitespace-nowrap [&::-webkit-scrollbar]:hidden flex-grow"
        id="bhkTabRow"
      >
        <div className="flex space-x-3">
          {bhkOptions.map((bhk) => (
            <button
              key={bhk}
              onClick={() => handleBHKChange(bhk)}
              className={`px-4 py-2 ${
                selectedBHK === bhk
                  ? "text-white border-b-2 border-white"
                  : "text-[#36454F]"
              } transition duration-200`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="ml-2 text-white bg-transparent hover:bg-gray-600 rounded-full p-1 block md:hidden"
        title="Scroll right"
      >
        &gt;
      </button>
    </div>
 
        {(Array.isArray(filteredDetails) && filteredDetails.length > 0) || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
          <div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {selectedBHK === "Amenities" ? (
              <div>
                {property.Amenities && typeof property.Amenities === 'object' ? (
                  <div className="overflow-x-auto mt-2">
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
                            <td key={amenity} className="p-2 text-center text-gray-200">
                              {value ? JSON.parse(value).join(", ") : "Not Available"}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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
              <div>
                {property.Nearby && typeof property.Nearby === 'object' ? (
                  <div className="overflow-x-auto mt-2">
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
                            <td key={nearby} className="p-2 text-center text-gray-200">
                              {value ? JSON.parse(value).join(", ") : "Not Available"}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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
                        Type {detail.typeNumber} - {detail.type1Area} SqFt -{" "}
                        <span className="text-yellow-500">Rs. {property.priceMax}</span>
                      </h3>
                    )}
                    {layout.length > 0 && (
                      <div className="overflow-x-auto mt-2">
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
        ) : (
          (selectedBHK === "1 BHK" || selectedBHK === "2 BHK" || selectedBHK === "3 BHK" || selectedBHK === "4 BHK") && (
            <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
          )
        )}
 
        {showRera && (
          <div className="p-4">
            <table className="w-full text-white border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-500 px-6 py-3 text-left">Rera Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-gray-500 px-6 py-3">
                    Rera Link:
                    {property.reralink && (
                      <a
                        href={property.reralink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Click here
                      </a>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
 
        {showProjectTimeline && <ProjectTimeline />}
 
        {showExpertReview && property.expertReview && (
          <div className="mt-6 p-4 border border-gray-600 px-6">
            <p className="text-gray-200">{property.expertReview.reviewText}</p>
          </div>
        )}
 
        {/* {showCostOfOwnership && <CostOfOwnership />} */}
        {showCostOfOwnership && property && (
          console.log("City name:",property.city),
  <CostOfOwnership defaultLocation={property.city} 
  />
  
)}
 
        
      </div>
    </div>
  );
};
 
export default PropertyDetails;