

// import { useEffect, useState } from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useNavigate } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";
// import CheckBox from "../Components/CheckBox";
// import { Link } from "react-router-dom";

// const PropertyList = ({ properties }) => {
//   const navigate = useNavigate();
//   const [apiResponse, setApiResponse] = useState([null]);
//   const [checkedState, setCheckedState] = useState({}); // 🔥 Track selected checkboxes

//   const handleCheckboxChange = (projectId) => {
//     setCheckedState((prevState) => ({
//       ...prevState,
//       [projectId]: !prevState[projectId],
//     }));
//   };

//   useEffect(() => {
//     if (properties && properties.length > 0) {
//       properties.forEach((property) => {
//         fetch(`http://localhost:8080/api/entities/${property.projectId}`)
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(
//               `API Response for Project ID ${property.projectId}:`,
//               data
//             );
            
//             setApiResponse(data);
//           })
//           .catch((error) => console.error("Error fetching data:", error));

//       });
//     }
//   }, [properties]);

//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }

//   const BASE_URL = "http://localhost:8080";

//   // 🔥 Extract selected projectIds
//   const selectedIds = Object.keys(checkedState).filter(
//     (id) => checkedState[id]
//   );
//   const isCompareEnabled = selectedIds.length >= 2 && selectedIds.length <= 3;

//   return (
//     <>
//       {/* 🔥 Compare Button */}
//       {selectedIds.length > 0 && (
//         <div className="absolute top-12 right-12 z-50 m-4">
//           <button
//             disabled={!isCompareEnabled}
//             onClick={() => navigate(`/compare?ids=${selectedIds.join(",")}`)}
//             className={`px-6 py-2 rounded-md text-yellow-500 text-lg font-bold transition duration-200 ${
//               isCompareEnabled
//                 ? "text-green-600 hover:text-green-700"
//                 : "text-gray-600 cursor-not-allowed"
//             }`}
//           >
//             Compare 
//             {/* ({selectedIds.length}) */}
//           </button>
//         </div>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//         {properties
//           .filter((property) => property && property.projectId)
//           .map((property) => (
//             <div
//               key={property.projectId}
//               className="border border-gray-500 rounded-lg shadow-2xl bg-black cursor-pointer p-2"
//             >
//               <h3 className="text-lg font-semibold text-yellow-500 pb-2">
//                 {property.projectName || "Project Name"}
//               </h3>
//               {property.projectImages?.length > 0 ? (
//                 <CustomSwiper
//                   images={property.projectImages.map(
//                     (img) => `${BASE_URL}${img}`
//                   )}
//                   height="h-40 md:h-45"
//                   onClick={() =>
//                     navigate(`/property-details/${property.projectId}`)
//                   }
//                 />
//               ) : (
//                 <p className="text-gray-400 text-center p-2">
//                   No images available.
//                 </p>
//               )}

//               <div className="p-1">
//                 <p className="text-white">
//                   Price Range:{" "}
//                   <span className="text-yellow-500">
//                     ₹{property.priceMin?.toLocaleString() || "N/A"} - ₹
//                     {property.priceMax?.toLocaleString() || "N/A"}
//                   </span>
//                 </p>

//                 <p className="text-white">
//                   BHK:{" "}
                  
//                   {property.availableBHKs?.length > 0
//                     ? property.availableBHKs
//                         .map((bhk) => bhk.replace("BHK", ""))
//                         .join(", ")
//                     : "N/A"}{" "}
//                   | Units: {property.units || "N/A"}
//                 </p>

               

//                 <p className="text-white">
//                   {property.city || "Unknown"} - {property.address || "N/A"}
//                 </p>

//                 <div className="flex justify-between p-1">
//                   <div className="checkbox-wrapper">
//                     <CheckBox
//                       label="Compare"
//                       checked={!!checkedState[property.projectId]}
//                       onChange={() => handleCheckboxChange(property.projectId)}
//                     />
//                   </div>
//                   <Link
//                     to={`/property-details/${property.projectId}`}
//                     className="block text-right text-blue-500 font-semibold hover:underline"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default PropertyList;

//cards code with zoom effect
// import { useEffect, useState } from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useNavigate } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";
// import CheckBox from "../Components/CheckBox";
// import { Link } from "react-router-dom";

// const PropertyList = ({ properties }) => {
//   const navigate = useNavigate();
//   const [apiResponse, setApiResponse] = useState([null]);
//   const [checkedState, setCheckedState] = useState({}); // 🔥 Track selected checkboxes
//   const [showLimitError, setShowLimitError] = useState(false);


//   const handleCheckboxChange = (projectId) => {
//     const isChecked = !checkedState[projectId];
//     const selectedCount = Object.values(checkedState).filter(Boolean).length;
  
//     if (isChecked && selectedCount >= 3) {
//       setShowLimitError(true);
//       setTimeout(() => setShowLimitError(false), 3000); // Auto-hide after 3 sec
//       return;
//     }
  
//     setCheckedState((prevState) => ({
//       ...prevState,
//       [projectId]: isChecked,
//     }));
//   };
  

//   useEffect(() => {
//     if (properties && properties.length > 0) {
//       properties.forEach((property) => {
//         fetch(`http://localhost:8080/api/entities/${property.projectId}`)
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(
//               `API Response for Project ID ${property.projectId}:`,
//               data
//             );
//             console.log("project video links", data.projectVideoLink);
//             setApiResponse(data);
//           })
//           .catch((error) => console.error("Error fetching data:", error));

//       });
//     }
//   }, [properties]);

//   if (!properties || properties.length === 0) {
//     return <p className="text-gray-600">No properties found.</p>;
//   }

//   const BASE_URL = "http://localhost:8080";

//   // 🔥 Extract selected projectIds
//   const selectedIds = Object.keys(checkedState).filter(
//     (id) => checkedState[id]
//   );
//   const isCompareEnabled = selectedIds.length >= 2 && selectedIds.length <= 3;

//   return (
//     <>
//       {/* 🔥 Compare Button */}
//       {/* 🔥 Compare Button - Desktop View */}
// {selectedIds.length > 0 && (
//   <div className="absolute top-12 right-12 z-50 m-4 hidden sm:block">
//     <button
//       disabled={!isCompareEnabled}
//       onClick={() => navigate(`/compare?ids=${selectedIds.join(",")}`)}
//       className={`px-6 py-2 rounded-md text-yellow-500 text-lg font-bold transition duration-200 ${
//         isCompareEnabled
//           ? "text-green-600 hover:text-green-700"
//           : "text-gray-600 cursor-not-allowed"
//       }`}
//     >
//       Compare
//     </button>
//     {showLimitError && (
//       <div className="absolute top-24 right-12 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 whitespace-nowrap">
//         ⚠️ You can only compare up to 3 properties!
//       </div>
//     )}
//   </div>
// )}

// {/* 🔥 Compare Button - Mobile Sticky Bottom */}
// {selectedIds.length > 0 && (
//   <div className="fixed bottom-4 left-4 right-0 z-50 sm:hidden ">
//     <button
//       disabled={!isCompareEnabled}
//       onClick={() => navigate(`/compare?ids=${selectedIds.join(",")}`)}
//       className={` max-w-xs px-4 py-1 rounded-md text-yellow-500 text-lg font-bold transition duration-200 border border-white ${
//         isCompareEnabled
//           ? "text-green-700 hover:text-green-800"
//           : "text-gray-700 cursor-not-allowed"
//       }`}
//     >
//       Compare
//     </button>
//   </div>
// )}
     
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//         {properties
//           .filter((property) => property && property.projectId)
//           .map((property) => (
//             <div
//               key={property.projectId}
//               className="border border-gray-500 rounded-lg shadow-2xl bg-black cursor-pointer p-2"
//             >
//               <h3 className="text-lg font-semibold text-yellow-500 pb-2">
//                 {property.projectName || "Project Name"}
//               </h3>
//               {property.projectImages?.length > 0 ? (
//                 <CustomSwiper
//                   images={property.projectImages.map(
//                     (img) => `${BASE_URL}${img}`
//                   )}
//                   height="h-40 md:h-45"
//                   onClick={() =>
//                     navigate(`/property-details/${property.projectId}`)
//                   }
//                 />
//               ) : (
//                 <p className="text-gray-400 text-center p-2">
//                   No images available.
//                 </p>
//               )}

//               <div className="p-1">
//                 <p className="text-white">
//                   Price Range:{" "}
//                   <span className="text-yellow-500">
//                     ₹{property.priceMin?.toLocaleString() || "N/A"} - ₹
//                     {property.priceMax?.toLocaleString() || "N/A"}
//                   </span>
//                 </p>

//                 <p className="text-white">
//                   BHK:{" "}
                  
//                   {property.availableBHKs?.length > 0
//                     ? property.availableBHKs
//                         .map((bhk) => bhk.replace("BHK", ""))
//                         .join(", ")
//                     : "N/A"}{" "}
//                   | Units: {property.units || "N/A"}
//                 </p>

               

//                 <p className="text-white">
//                   {property.city || "Unknown"} - {property.address || "N/A"}
//                 </p>

//                 <div className="flex justify-between p-1">
//                   <div className="checkbox-wrapper">
//                     <CheckBox
//                       label="Compare"
//                       checked={!!checkedState[property.projectId]}
//                       onChange={() => handleCheckboxChange(property.projectId)}
//                     />
//                   </div>
//                   <Link
//                     to={`/property-details/${property.projectId}`}
//                     className="block text-right text-blue-500 font-semibold hover:underline"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default PropertyList;

import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate, Link } from "react-router-dom";
import CustomSwiper from "../Components/CustomSwiper";
import CheckBox from "../Components/CheckBox";

const PropertyList = ({ properties }) => {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState(null);
  const [checkedState, setCheckedState] = useState({});
  const [showLimitError, setShowLimitError] = useState(false);

  const handleCheckboxChange = (projectId) => {
    const isChecked = !checkedState[projectId];
    const selectedCount = Object.values(checkedState).filter(Boolean).length;

    if (isChecked && selectedCount >= 3) {
      setShowLimitError(true);
      setTimeout(() => setShowLimitError(false), 3000);
      return;
    }

    setCheckedState((prevState) => ({
      ...prevState,
      [projectId]: isChecked,
    }));
  };
  const [enrichedProperties, setEnrichedProperties] = useState([]);

  useEffect(() => {
    const fetchAndEnrichProperties = async () => {
      const enriched = await Promise.all(
        properties.map(async (property) => {
          try {
            const response = await fetch(`http://localhost:8080/api/entities/${property.projectId}`);
            const data = await response.json();
            console.log(`API Response for Project ID ${property.projectId}:`, data);
            return { ...property, projectVideoLink: data.projectVideoLink };
          } catch (error) {
            console.error("Error fetching data for property:", property.projectId, error);
            return property;
          }
        })
      );
      setEnrichedProperties(enriched);
    };
  
    if (properties && properties.length > 0) {
      fetchAndEnrichProperties();
    }
  }, [properties]);
  

  if (!properties || properties.length === 0) {
    return <p className="text-gray-600">No properties found.</p>;
  }

  const BASE_URL = "http://localhost:8080";
  const selectedIds = Object.keys(checkedState).filter((id) => checkedState[id]);
  const isCompareEnabled = selectedIds.length >= 2 && selectedIds.length <= 3;

  return (
    <>
      {selectedIds.length > 0 && (
        <>
          {/* Desktop Compare Button */}
          <div className="absolute top-12 right-12 z-50 m-4 hidden sm:block">
            <button
              disabled={!isCompareEnabled}
              onClick={() => navigate(`/compare?ids=${selectedIds.join(",")}`)}
              className={`px-6 py-2 rounded-md text-yellow-500 text-lg font-bold transition duration-200 ${
                isCompareEnabled
                  ? "text-green-600 hover:text-green-700"
                  : "text-gray-600 cursor-not-allowed"
              }`}
            >
              Compare
            </button>
            {showLimitError && (
              <div className="absolute top-24 right-12 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 whitespace-nowrap">
                ⚠️ You can only compare up to 3 properties!
              </div>
            )}
          </div>

          {/* Mobile Compare Button */}
          <div className="fixed bottom-4 left-4 right-0 z-50 sm:hidden">
            <button
              disabled={!isCompareEnabled}
              onClick={() => navigate(`/compare?ids=${selectedIds.join(",")}`)}
              className={`max-w-xs px-4 py-1 rounded-md text-yellow-500 text-lg font-bold transition duration-200 border border-white ${
                isCompareEnabled
                  ? "text-green-700 hover:text-green-800"
                  : "text-gray-700 cursor-not-allowed"
              }`}
            >
              Compare
            </button>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {enrichedProperties
  .filter((property) => property && property.projectId)
  .map((property) => {

            const images = (property.projectImages || []).map((img) => ({
              type: "image",
              src: `${BASE_URL}${img}`,
            }));

            const videos = (property.projectVideoLink || []).map((vid) => ({
              type: "video",
              src: `${BASE_URL}${vid}`,
            }));

            console.log(property.projectVideoLink," images",property.projectImages);
            const swiperItems = [...images, ...videos];

            return (
              <div
                key={property.projectId}
                className="border border-gray-500 rounded-lg shadow-2xl bg-black cursor-pointer p-2"
              >
                <h3 className="text-lg font-semibold text-yellow-500 pb-2">
                  {property.projectName || "Project Name"}
                </h3>

                {swiperItems.length > 0 ? (
                  <CustomSwiper
                    items={swiperItems}
                    height="h-40 md:h-45"
                   
                  />
                ) : (
                  <p className="text-gray-400 text-center p-2">
                    No media available.
                  </p>
                )}

                <div className="p-1">
                  <p className="text-white">
                    Price Range:{" "}
                    <span className="text-yellow-500">
                      ₹{property.priceMin?.toLocaleString() || "N/A"} - ₹
                      {property.priceMax?.toLocaleString() || "N/A"}
                    </span>
                  </p>

                  <p className="text-white">
                    BHK:{" "}
                    {property.availableBHKs?.length > 0
                      ? property.availableBHKs
                          .map((bhk) => bhk.replace("BHK", ""))
                          .join(", ")
                      : "N/A"}{" "}
                    | Units: {property.units || "N/A"}
                  </p>

                  <p className="text-white">
                    {property.city || "Unknown"} - {property.address || "N/A"}
                  </p>

                  <div className="flex justify-between p-1">
                    <div className="checkbox-wrapper">
                      <CheckBox
                        label="Compare"
                        checked={!!checkedState[property.projectId]}
                        onChange={() => handleCheckboxChange(property.projectId)}
                      />
                    </div>
                    <Link
                      to={`/property-details/${property.projectId}`}
                      className="block text-right text-blue-500 font-semibold hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PropertyList;
