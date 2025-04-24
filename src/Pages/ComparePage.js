// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";
// import DemoNavbar from "../Components/Header";

// const BASE_URL = "http://localhost:8080";

// const ComparePage = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const idsParam = searchParams.get("ids");
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     if (idsParam) {
//       const ids = idsParam.split(",");

//       Promise.all(
//         ids.map((id) =>
//           fetch(`${BASE_URL}/api/entities/${id}`)
//             .then((res) => res.json())
//             .catch((err) => {
//               console.error(`Error fetching property ${id}:`, err);
//               return null;
//             })
//         )
//       ).then((results) => {
//         const validResults = results.filter((res) => res !== null);
//         setProperties(validResults);
//       });
//     }
//   }, [idsParam]);

//   if (!properties.length) {
//     return <p className="text-white text-center">Loading or no properties to compare.</p>;
//   }

//   return (
//     <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-14">
//       <DemoNavbar />
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-2xl font-bold text-white mb-4 text-center">Compare Properties</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {properties.map((property) => (
//           <div
//             key={property.projectId}
//             className="border border-gray-500 rounded-lg shadow-2xl bg-black text-white"
//           >
//             {/* Swiper for images */}
//             {property.projectImages?.length > 0 ? (
//               <CustomSwiper
//                 images={property.projectImages.map((img) => `${BASE_URL}${img}`)}
//                 height="h-48 md:h-60"
//               />
//             ) : (
//               <p className="text-gray-400 text-center p-2">No images available.</p>
//             )}

//             <div className="p-4 space-y-2">
//               <h3 className="text-xl font-semibold">{property.projectName || "N/A"}</h3>

//               <p>
//                 <span className="font-medium text-yellow-500">Price Range:</span>{" "}
//                 ₹{property.priceMin?.toLocaleString() || "N/A"} - ₹
//                 {property.priceMax?.toLocaleString() || "N/A"}
//               </p>

//               <p>
//                 <span className="font-medium text-yellow-500">BHKs:</span>{" "}
//                 {property.availableBHKs?.join(", ") || "N/A"}
//               </p>

//               <p>
//                 <span className="font-medium text-yellow-500">Units:</span>{" "}
//                 {property.units || "N/A"}
//               </p>

//               <p>
//                 <span className="font-medium text-yellow-500">Location:</span>{" "}
//                 {property.city || "Unknown"} - {property.address || "N/A"}
//               </p>

//               {/* Add any other fields you want to compare below */}
//               {/* Example: Developer, Status, Amenities, etc. */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div></div>
//   );
// };

// export default ComparePage;

// import { useEffect, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import CustomSwiper from "../Components/CustomSwiper";

// const ComparePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Memoize selectedIds so the array reference doesn't change on each render
//   const selectedIds = useMemo(() => {
//     const searchParams = new URLSearchParams(location.search);
//     return searchParams.get("ids")?.split(",") || [];
//   }, [location.search]);

//   // ✅ Fetch data only when selectedIds change
//   useEffect(() => {
//     if (!selectedIds.length) {
//       setProperties([]);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     Promise.all(
//       selectedIds.map((id) =>
//         fetch(`http://localhost:8080/api/entities/${id}`)
//           .then((response) => response.json())
//           .catch((error) => {
//             console.error("Error fetching data:", error);
//             return null;
//           })
//       )
//     ).then((data) => {
//       setProperties(data.filter(Boolean)); // filter out any failed fetches
//       setLoading(false);
//     });
//   }, [selectedIds]);

//   if (loading) {
//     return <p className="text-center text-white p-4">Loading...</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-center mb-4">Compare Properties</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property, index) => (
//           <div
//             key={index}
//             className="border border-gray-500 rounded-lg shadow-xl bg-black text-white p-4"
//           >
//             <h3 className="text-lg font-semibold text-yellow-500">{property.projectName}</h3>

//             {property.projectImages?.length > 0 ? (
//               <CustomSwiper
//                 images={property.projectImages.map(
//                   (img) => `http://localhost:8080${img}`
//                 )}
//                 height="h-40 md:h-45"
//               />
//             ) : (
//               <p className="text-gray-400 text-center p-2">No images available.</p>
//             )}

//             <p>Price Range: ₹{property.priceMin} - ₹{property.priceMax}</p>
//             <p>{property.city} - {property.address}</p>

//             {/* Display Amenities */}
//             <div>
//               <h4 className="text-yellow-400">Amenities:</h4>
//               {Object.entries(property.Amenities || {}).map(([key, value]) => (
//                 <p key={key}>{key}: {JSON.parse(value).join(", ")}</p>
//               ))}
//             </div>

//             {/* Display Nearby Places */}
//             <div>
//               <h4 className="text-yellow-400">Nearby:</h4>
//               {Object.entries(property.Nearby || {}).map(([key, value]) => (
//                 <p key={key}>{key}: {JSON.parse(value).join(", ")}</p>
//               ))}
//             </div>

//             {/* Expert Review */}
//             <div>
//               <h4 className="text-yellow-400">Expert Review:</h4>
//               <p>{property.expertReview?.reviewText || "No review available"}</p>
//             </div>

//             {/* BHK Configurations */}
//             <div>
//               <h4 className="text-yellow-400">Available BHKs:</h4>
//               {[property.oneBHKConfig, property.twoBHKConfig, property.threeBHKConfig, property.fourBHKConfig].map((bhkConfig, idx) => (
//                 <div key={idx}>
//                   {bhkConfig?.length > 0 && (
//                     <p>{bhkConfig[0]?.bedroomCount} BHK</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* RERA Link */}
//             {property.reralink && (
//               <a
//                 href={property.reralink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 View RERA Registration
//               </a>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 text-center">
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Back to Property List
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ComparePage;

import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CustomSwiper from "../Components/CustomSwiper";
import DemoNavbar from "../Components/Header";
import DropdownField from "../Components/DropdownField";
import { MdTempleHindu } from "react-icons/md";
import {
  FaSwimmingPool,
  FaDumbbell,
  FaTree,
  FaChild,
  FaPlay,
  FaHouseUser,
  FaTheaterMasks,
  FaHome,
  FaHospital,
  FaSchool,
  FaBuilding,
  FaCoffee,
  FaFilm,
  FaSubway,
} from "react-icons/fa";

const ComparePage = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBHKs, setSelectedBHKs] = useState({});
  const navigate = useNavigate();
  const amenityIcons = {
    swimmingPool: (
      <FaSwimmingPool className="inline-block mr-1 text-[#313131]" />
    ),
    gym: <FaDumbbell className="inline-block mr-1 text-[#313131]" />,
    temple:  <MdTempleHindu className="inline-block mr-1 text-[#313131]"/>, 
    park: <FaTree className="inline-block mr-1 text-[#313131]" />,
    creche: <FaChild className="inline-block mr-1 text-[#313131]" />,
    childrenParks: <FaPlay className="inline-block mr-1 text-[#313131]" />,
    clubHouse: <FaHouseUser className="inline-block mr-1 text-[#313131]" />,
    other: <FaTheaterMasks className="inline-block mr-1 text-[#313131]" />,
    chall: <FaHome className="inline-block mr-1 text-[#313131]" />,
  };
  const nearbyIcons = {
    schools: <FaSchool className="inline-block mr-1 text-[#313131]" />,
    hospitals: <FaHospital className="inline-block mr-1 text-[#313131]" />,
    it_parks: <FaBuilding className="inline-block mr-1 text-[#313131]" />,
    hangouts: <FaCoffee className="inline-block mr-1 text-[#313131]" />,
    cinemas: <FaFilm className="inline-block mr-1 text-[#313131]" />,
    metro: <FaSubway className="inline-block mr-1 text-[#313131]" />,
  };
  const amenityLabels = {
    swimmingPool: "Swimming Pool",
    gym: "Gym",
    temple: "Temple",
    park: "Parks",
    creche: "Creche",
    childrenParks: "Children Parks",
    clubHouse : "Club House",
    chall:"Chall",
    other: "Other"
    // Add more as needed
  };
  const nearbyLabels = {
    hospitals : "Hospitals",
    Schools: "Schools",
    it_parks:"IT Parks",
    Hangouts:"Hangouts",
    Cinemas:"Cinemas",
    Metro:"Metros"
    // Add more as needed
  };
  
  
  const selectedIds = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("ids")?.split(",") || [];
  }, [location.search]);

  useEffect(() => {
    if (!selectedIds.length) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(
      selectedIds.map((id) =>
        fetch(`http://localhost:8080/api/entities/${id}`)
          .then((res) => res.json())

          .catch((err) => {
            console.error("Error fetching data:", err);
            return null;
          })
      )
    ).then((data) => {
      setProperties(data.filter(Boolean));
      console.log(data);
      setLoading(false);
    });
  }, [selectedIds]);

  if (loading) {
    return <p className="text-center text-white p-4">Loading...</p>;
  }
  const handleBack = () => {
    navigate(-1); // navigates to the previous page
  };

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14 min-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[400px]">
      <DemoNavbar />
      <div className="pt-16 sm:pt-12">
        <div className="p-6 overflow-x-auto">
          <button
            onClick={handleBack}
            className="bg-transparent text-yellow-500"
          >
            Back
          </button>
          {/* <h2 className="text-xl font-bold text-center mb-6 text-white">Compare Properties</h2> */}

          <table className="min-w-full border-b border-gray-600 bg-black text-white table-fixed hidden sm:table">
            {/* Name */}
            <thead className="sticky top-0 bg-black z-20">
              <tr>
                <th className="p-3 border-b border-gray-600 w-48 text-white text-left"></th>
                {properties.map((property, index) => (
                  <th
                    key={index}
                    className="p-3 border-b border-gray-600  text-yellow-500 w-[350px] text-left"
                  >
                    <Link
                      to={`/property-details/${property.projectId}`}
                      className="text-yellow-500 text-lg font-semibold hover:underline text-left"
                    >
                      {property.projectName}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Images */}
              {/* <tr>
                <th className="p-2 border-b border-gray-600 text-left "></th>
                {properties.map((property, index) => (
                  <td
                    key={index}
                    className="p-4 border-b border-gray-600 text-left"
                  >
                    {property.projectImages?.length > 0 ? (
                      <CustomSwiper
                        images={property.projectImages.map(
                          (img) => `http://localhost:8080${img}`
                        )}
                        height="h-40"
                      />
                    ) : (
                      <span className="text-gray-400">No images</span>
                    )}
                  </td>
                ))}

              </tr> */}
              <tr>
  <th className="p-2 border-b border-gray-600 text-left"></th>
  {properties.map((property, index) => (
    <td
      key={index}
      className="p-4 border-b border-gray-600 text-left"
    >
      {property.projectImages?.length > 0 ? (
        <CustomSwiper
          items={property.projectImages.map((img, imgIndex) => ({
            type: "image",
            src: `http://localhost:8080${img}`,
          })).concat(
            property.projectVideoLink?.map((vid, vidIndex) => ({
              type: "video",
              src: `http://localhost:8080${vid}`,
            })) || []
          )}
          height="h-40"
          onImageClick={(item) => {
            // Handle image/video click logic if needed
            console.log("Clicked item:", item);
          }}
        />
      ) : (
        <span className="text-gray-400">No images</span>
      )}
    </td>
  ))}
</tr>


              {/* Price */}
              <tr>
                <th className="p-4 border-b border-gray-600 text-left">
                  Price Range
                </th>
                {properties.map((p, i) => (
                  <td
                    key={i}
                    className="p-4 border-b border-gray-600  text-white font-semibold text-left"
                  >
                    ₹{p.priceMin} - ₹{p.priceMax}
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <th className="p-4 border-b border-gray-600 text-left">
                  Location
                </th>
                {properties.map((p, i) => (
                  <td
                    key={i}
                    className="p-4 border-b border-gray-600 text-left"
                  >
                    <div className="flex items-start justify-start gap-1">
                      <span>
                        {p.city}, {p.address}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Available BHKs */}
              <tr>
                <th className="p-4 border-b border-gray-600 text-left">
                  Type of Apartments
                </th>
                {properties.map((p, i) => {
                  const bhks = [];

                  if (p.oneBHKConfig && p.oneBHKConfig.length > 0)
                    bhks.push("1 BHK");
                  if (p.twoBHKConfig && p.twoBHKConfig.length > 0)
                    bhks.push("2 BHK");
                  if (p.threeBHKConfig && p.threeBHKConfig.length > 0)
                    bhks.push("3 BHK");
                  if (p.fourBHKConfig && p.fourBHKConfig.length > 0)
                    bhks.push("4 BHK");

                  return (
                    <td
                      key={i}
                      className="p-4 border-b border-gray-600 text-left"
                    >
                      {bhks.length > 0 ? bhks.join(", ") : "N/A"}
                    </td>
                  );
                })}
              </tr>

              {/* BHK Selector */}

              <tr>
                <th className="p-4 border-b border-gray-600 text-left">
                  Select Type
                </th>
                {properties.map((p, i) => {
                  const bhks = [
                    ...(p.oneBHKConfig?.length ? ["1 BHK"] : []),
                    ...(p.twoBHKConfig?.length ? ["2 BHK"] : []),
                    ...(p.threeBHKConfig?.length ? ["3 BHK"] : []),
                    ...(p.fourBHKConfig?.length ? ["4 BHK"] : []),
                  ];
                  return (
                    <td
                      key={i}
                      className="p-4 border-b border-gray-600 text-left "
                    >
                      <div className="w-full">
                        <DropdownField
                          label="Select BHK"
                          section="bhkSelection"
                          field={i}
                          value={selectedBHKs[i] || ""}
                          onChange={(section, field, value) =>
                            setSelectedBHKs((prev) => ({
                              ...prev,
                              [field]: value,
                            }))
                          }
                          error={false}
                          options={bhks.map((bhk) => ({
                            label: bhk,
                            value: bhk,
                          }))}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* BHK Details Row */}
              {/* BHK Info Row */}
             {/* Table Header Row */}
<tr>
  <th className="p-4 text-left">Apartments Info -</th>
  {properties.map((p, i) => (
    <th key={i} className="p-4 border-b border-gray-900 text-left text-sm">
      {selectedBHKs[i] || "Select BHK"}
    </th>
  ))}
</tr>

{/* Area Row */}
<tr>
  <td className="p-3 font-semibold">Area :</td>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;
    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];
    return (
      <td key={i} className="p-3 border-b border-gray-900 text-sm">
        {config ? (
          config.type1Area || config.type2Area
        ) : (
          <span className="text-gray-400">Select a BHK</span>
        )}
        sqft
      </td>
    );
  })}
</tr>

{/* Balcony Row */}
<tr>
  <td className="p-3  font-semibold">Balcony :</td>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;
    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];
    return (
      <td key={i} className="p-3 border-b border-gray-900 text-sm">
        {config ? (
          config.type1Balcony || config.type2Balcony
        ) : (
          <span className="text-gray-400">Select a BHK</span>
        )}
      </td>
    );
  })}
</tr>

{/* Bathrooms Row */}
<tr>
  <td className="p-3  font-semibold">Bathrooms :</td>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;
    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];
    return (
      <td key={i} className="p-3 border-b border-gray-900 text-sm">
        {config ? (
          config.type1Bathrooms || config.type2Bathrooms
        ) : (
          <span className="text-gray-400">Select a BHK</span>
        )}
      </td>
    );
  })}
</tr>

{/* Parking Row */}
<tr>
  <td className="p-3  font-semibold">Parking :</td>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;
    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];
    return (
      <td key={i} className="p-3 border-b border-gray-900 text-sm">
        {config ? (
          config.type1Parking || config.type2Parking
        ) : (
          <span className="text-gray-400">Select a BHK</span>
        )}
      </td>
    );
  })}
</tr>

{/* Units Row */}
<tr>
  <td className="p-3 border-b border-gray-600 font-semibold">Units :</td>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;
    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];
    return (
      <td key={i} className="p-3 border-b border-gray-600 text-sm">
        {config ? (
          config.type1Units || config.type2Units
        ) : (
          <span className="text-gray-400">Select a BHK</span>
        )}
      </td>
    );
  })}
</tr>

              {/* Floor Plan Row */}
             {/* Floor Plan Row */}
<tr>
  <th className="p-4 border-b border-gray-600 text-left">
    Apartments Floor Plans
  </th>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;

    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];

    const floorPlans =
      (selected === "1 BHK" && config?.type1FloorPlan) ||
      (selected === "2 BHK" && config?.type2FloorPlan) ||
      (selected === "3 BHK" && config?.type3FloorPlan) ||
      (selected === "4 BHK" && config?.type4FloorPlan) ||
      [];

    return (
      <td
        key={i}
        className="p-4 border-b border-gray-600 text-sm text-left"
      >
        {floorPlans.length > 0 ? (
          <CustomSwiper
            items={floorPlans.map((img, index) => ({
              type: "image",
              src: `http://localhost:8080${img}`,
            }))}
            height="h-40"
            onImageClick={(item) => {
              // Handle floor plan image/video click if needed
              console.log("Clicked item:", item);
            }}
          />
        ) : (
          <span className="text-gray-400">No Floor Plans</span>
        )}
      </td>
    );
  })}
</tr>


              {/* BHK Images Row */}
<tr>
  <th className="p-4 border-b border-gray-600 text-left">
    Apartments Images
  </th>
  {properties.map((p, i) => {
    const selected = selectedBHKs[i];
    let config;

    if (selected === "1 BHK") config = p.oneBHKConfig?.[0];
    if (selected === "2 BHK") config = p.twoBHKConfig?.[0];
    if (selected === "3 BHK") config = p.threeBHKConfig?.[0];
    if (selected === "4 BHK") config = p.fourBHKConfig?.[0];

    const bhkImages =
      (selected === "1 BHK" && config?.type1Images) ||
      (selected === "2 BHK" && config?.type2Images) ||
      (selected === "3 BHK" && config?.type3Images) ||
      (selected === "4 BHK" && config?.type4Images) ||
      [];

    return (
      <td
        key={i}
        className="p-4 border-b border-gray-600 text-sm text-left"
      >
        {bhkImages.length > 0 ? (
          <CustomSwiper
            items={bhkImages.map((img, index) => ({
              type: "image",
              src: `http://localhost:8080${img}`,
            })).concat(
              p.projectVideoLink?.map((vid) => ({
                type: "video",
                src: `http://localhost:8080${vid}`,
              })) || []
            )}
            height="h-40"
            onImageClick={(item) => {
              // Handle BHK image/video click if needed
              console.log("Clicked item:", item);
            }}
          />
        ) : (
          <span className="text-gray-400">No Images</span>
        )}
      </td>
    );
  })}
</tr>


              {/* Amenities */}
           {/* Amenities Section Header */}
<tr>
  <th className="p-4 text-left">Amenities</th>
  {properties.map((_, i) => (
    <th
      key={i}
      className="p-4 text-left text-sm font-medium"
    >
      
    </th>
  ))}
</tr>

{Object.keys(properties[0].Amenities || {}).map((amenityKey, idx, arr) => (
  <tr
    key={amenityKey}
    className={idx === arr.length - 1 ? "border-b border-gray-600" : ""}
  >
    <th className="p-4 text-white text-left font-medium flex items-center gap-2">
      <span className="text-lg">{amenityIcons[amenityKey]}</span>
      <span>{amenityLabels[amenityKey] || amenityKey.replace(/([A-Z])/g, " $1")}</span>
    </th>
    {properties.map((p, i) => (
      <td
        key={i}
        className={idx === arr.length - 1
          ? "border-b border-gray-600 p-4 text-left text-white text-sm"
          : "p-4 text-left text-white text-sm border-b border-gray-900"}
      >
        {p.Amenities?.[amenityKey]
          ? JSON.parse(p.Amenities[amenityKey]).join(", ")
          : "-"}
      </td>
    ))}
  </tr>
))}

              {/* Nearby */}

              <tr>
  <th className="p-4 text-left">Nearby</th>
  {properties.map((_, i) => (
    <th
      key={i}
      className="p-4  text-left text-sm font-medium"
    >
      
    </th>
  ))}
</tr>

{Object.keys(properties[0].Nearby || {}).map((nearbyKey, idx, arr) => (
  <tr
    key={nearbyKey}
    className={idx === arr.length - 1 ? "border-b border-gray-600" : ""}
  >
    <th className="p-4 text-white text-left font-medium flex items-center gap-2">
      <span className="text-lg">{nearbyIcons[nearbyKey]}</span>
      <span>
        {nearbyLabels[nearbyKey] || nearbyKey.replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    </th>
    {properties.map((p, i) => (
      <td
        key={i}
        className={
          idx === arr.length - 1
            ? "border-b border-gray-600 p-4 text-left text-white text-sm"
            : "p-4 text-left text-white text-sm border-b border-gray-900"
        }
      >
        {p.Nearby?.[nearbyKey]
          ? JSON.parse(p.Nearby[nearbyKey]).join(", ")
          : "-"}
      </td>
    ))}
  </tr>
))}



              {/* Expert Review */}
              <tr>
                <th className="p-4 border-b border-gray-600 text-left">
                  Expert Review
                </th>
                {properties.map((p, i) => (
                  <td
                    key={i}
                    className="p-4 border-b border-gray-600 text-left"
                  >
                    {p.expertReview?.reviewText || "No review"}
                  </td>
                ))}
              </tr>

              {/* RERA Link */}
              <tr>
                <th className="p-4 border-b border-gray-600 text-left">
                  RERA Link
                </th>
                {properties.map((p, i) => (
                  <td
                    key={i}
                    className="p-4 border-b border-gray-600 text-left"
                  >
                    {p.reralink ? (
                      <a
                        href={p.reralink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        View RERA
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Mobile Card View (visible only on small screens) */}
          <div className="block sm:hidden space-y-6">
            {properties.map((property, index) => {
              const bhks = [
                ...(property.oneBHKConfig?.length ? ["1 BHK"] : []),
                ...(property.twoBHKConfig?.length ? ["2 BHK"] : []),
                ...(property.threeBHKConfig?.length ? ["3 BHK"] : []),
                ...(property.fourBHKConfig?.length ? ["4 BHK"] : []),
              ];

              const selected = selectedBHKs[index];
              let config;
              if (selected === "1 BHK") config = property.oneBHKConfig?.[0];
              if (selected === "2 BHK") config = property.twoBHKConfig?.[0];
              if (selected === "3 BHK") config = property.threeBHKConfig?.[0];
              if (selected === "4 BHK") config = property.fourBHKConfig?.[0];

              const floorPlans =
                (selected === "1 BHK" && config?.type1FloorPlan) ||
                (selected === "2 BHK" && config?.type2FloorPlan) ||
                (selected === "3 BHK" && config?.type3FloorPlan) ||
                (selected === "4 BHK" && config?.type4FloorPlan) ||
                [];

              const bhkImages =
                (selected === "1 BHK" && config?.type1Images) ||
                (selected === "2 BHK" && config?.type2Images) ||
                (selected === "3 BHK" && config?.type3Images) ||
                (selected === "4 BHK" && config?.type4Images) ||
                [];
                const videos =
                property.projectVideoLink?.map((video) => ({
                  type: "video",
                  src: `http://localhost:8080${video}`,
                })) || [];

              return (
                <div
                  key={index}
                  className="border border-gray-600 rounded-lg p-4 bg-[#111111] text-white shadow-md"
                >
                  <h2 className="text-yellow-400 text-lg font-semibold mb-2">
                    {property.projectName}
                  </h2>

                  {/* Project Images and Videos in a Single Swiper */}
<div className="mb-3">
  <CustomSwiper
    items={[
      ...property.projectImages?.map((img) => ({
        type: "image",
        src: `http://localhost:8080${img}`,
      })),

      ...property.projectVideoLink?.map((video) => ({
        type: "video",
        src: `http://localhost:8080${video}`,
      })),
    ]}
    height="h-40"
  />
</div>


                  <p className="text-yellow-500 mb-1">
                    Price: ₹{property.priceMin} - ₹{property.priceMax}
                  </p>
                  <p className="text-white mb-1">
                    Location: {property.city}, {property.address}
                  </p>

                  <p className="text-white mt-2">
                    <strong>Available BHKs:</strong> {bhks.join(", ") || "N/A"}
                  </p>

                  {/* BHK Selector */}
                  <p className="text-white mt-2">
                    <strong>Type of Apartments:</strong>
                  </p>
                  <div className="my-3">
                    <DropdownField
                      label="Select BHK"
                      section="bhkSelection"
                      field={index}
                      value={selectedBHKs[index] || ""}
                      onChange={(section, field, value) =>
                        setSelectedBHKs((prev) => ({
                          ...prev,
                          [field]: value,
                        }))
                      }
                      error={false}
                      options={bhks.map((bhk) => ({
                        label: bhk,
                        value: bhk,
                      }))}
                    />
                  </div>

                  {/* Type Info */}
                  <p className="text-white mt-2">
                    <strong>Apartments Info:</strong>
                  </p>
                  <div className="text-sm text-gray-200 space-y-1">
                    {config ? (
                      <>
                        <div>
                          <strong>Area:</strong>{" "}
                          {config?.type1Area || config?.type2Area} sqft
                        </div>
                        <div>
                          <strong>Balcony:</strong>{" "}
                          {config?.type1Balcony || config?.type2Balcony}
                        </div>
                        <div>
                          <strong>Bathrooms:</strong>{" "}
                          {config?.type1Bathrooms || config?.type2Bathrooms}
                        </div>
                        <div>
                          <strong>Parking:</strong>{" "}
                          {config?.type1Parking || config?.type2Parking}
                        </div>
                        <div>
                          <strong>Units:</strong>{" "}
                          {config?.type1Units || config?.type2Units}
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-400">Select a BHK</span>
                    )}
                  </div>

                  {/* Floor Plans */}
                  <div className="mt-3">
                    <strong className="block mb-1">
                      Apartments Floor Plans:
                    </strong>

                   {/* Floor Plan Images */}
        {floorPlans.length > 0 && (
          <div className="mb-3">
            <h3 className="text-yellow-400 text-md font-semibold mb-2">
              Floor Plans
            </h3>
            <CustomSwiper
              items={floorPlans.map((img) => ({
                type: "image",
                src: `http://localhost:8080${img}`,
              }))}
              height="h-40"
            />
          </div>
        )}
                  </div>

                  {/* BHK Images */}
                  <div className="mt-3">
                    <strong className="block mb-1">Apartments Images:</strong>
                   {/* BHK Images */}
        {bhkImages.length > 0 && (
          <div className="mb-3">
            <h3 className="text-yellow-400 text-md font-semibold mb-2">
              BHK Images
            </h3>
            <CustomSwiper
              items={bhkImages.map((img) => ({
                type: "image",
                src: `http://localhost:8080${img}`,
              }))}
              height="h-40"
            />
          </div>
        )}
                  </div>

                  {/* Amenities */}
                  <div className="mt-3">
                    <strong className="text-white">Amenities:</strong>
                    <ul className="list-disc ml-4 text-sm">
                      {Object.entries(property.Amenities || {}).map(
                        ([key, value]) => (
                          <li key={key}>
                            {amenityIcons[key]} {key.replace(/([A-Z])/g, " $1")}{" "}
                            : {JSON.parse(value).join(", ")}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Nearby */}
                  <div className="mt-3">
                    <strong className="text-white">Nearby:</strong>
                    <ul className="list-disc ml-4 text-sm">
                      {Object.entries(property.Nearby || {}).map(
                        ([key, value]) => (
                          <li key={key}>
                            {nearbyIcons[key]} {key.replace(/([A-Z])/g, " $1")}{" "}
                            : {JSON.parse(value).join(", ")}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Expert Review */}
                  <p className="text-gray-300 mt-2">
                    <strong>Expert Review:</strong>{" "}
                    {property.expertReview?.reviewText || "No review"}
                  </p>

                  {/* RERA Link */}
                  <div className="mt-2">
                    {property.reralink ? (
                      <a
                        href={property.reralink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        View RERA
                      </a>
                    ) : (
                      "RERA: N/A"
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
