import { useState, useEffect } from "react";
import CustomSwiper from "../Components/CustomSwiper";
import Header from "../Components/Header";
import PhoneIcon from "@mui/icons-material/Phone";
// import Calculations from "../Components/Calculations";
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
 
const PropertyDetails = () => {
  const { projectId } = useParams(); // Get Project_Id from URL
  const [property, setProperty] = useState({});
  const [selectedBHK, setSelectedBHK] = useState("1 BHK");
 // const [showCalculations, setShowCalculations] = useState(false);
  const [showcow, setShowcows] = useState(false);
  const [showProjectTimeline, setProjectTimeline] = useState(false);
  const [showrera, setShowRera] = useState(false);
  const [error, setError] = useState("");
  const [showExpertReview, setShowExpertReview] = useState(false);
 
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
  console.log(property);
 
  const handleBHKChange = (bhk) => {
    setSelectedBHK(bhk);
    // setShowCalculations(bhk === "Expert Review");
    setShowcows(bhk === "Cost of Ownership");
    setProjectTimeline(bhk === "Project Timeline");
    setShowRera(bhk === "Govt Documentation");
     // Show expert review when selected
  if (bhk === "Expert Review") {
    setShowExpertReview(true);
  } else {
    setShowExpertReview(false);
  }
 
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
      // case "Calculations":
      //   return Calculations;
      case "Cost of Ownership":
        return CostOfOwnership;
      case "Project Timeline":
        return ProjectTimeline ;
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
        {/* <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
  <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
  <CustomSwiper
    key={`swiper-project-${selectedBHK}`}
    images={
      (() => {
        let images = [];
 
        // Get images based on selected BHK
        switch (selectedBHK) {
          case "1 BHK":
            images = property.oneBHKConfig?.[0]?.type1Images || [];
            break;
          case "2 BHK":
            images = property.twoBHKConfig?.[0]?.type2Images || [];
            break;
          case "3 BHK":
            images = property.threeBHKConfig?.[0]?.type3Images || [];
            break;
          case "4 BHK":
            images = property.fourBHKConfig?.[0]?.type4Images || []; // Assuming you have a fourBHKConfig
            break;
          default:
            images = property.projectImages || [];
            break;
        }
 
        // Log the images for debugging
        console.log("Retrieved images:", images);
 
        // If no images found, return project images
        if (images.length === 0) {
          images = property.projectImages || [];
          console.log("Falling back to project images:", images);
        }
 
        // Prepend the base URL to the images
        return images.map((img) => `${Image_URL}/${img}`);
      })()
    }
  />
</div> */}
<div className="max-w-full md:max-w-[70%] mx-auto mb-3">
  <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
  <CustomSwiper
    key={`swiper-project-${selectedBHK}`}
    images={
      (() => {
        let images = [];
 
        // Check if a BHK is selected
        if (["1 BHK", "2 BHK", "3 BHK", "4 BHK"].includes(selectedBHK)) {
          // Get images based on selected BHK
          switch (selectedBHK) {
            case "1 BHK":
              images = property.oneBHKConfig?.[0]?.type1Images || [];
              break;
            case "2 BHK":
              images = property.twoBHKConfig?.[0]?.type2Images || [];
              break;
            case "3 BHK":
              images = property.threeBHKConfig?.[0]?.type3Images || [];
              break;
            case "4 BHK":
              images = property.fourBHKConfig?.[0]?.type4Images || []; // Assuming you have a fourBHKConfig
              break;
            default:
              break;
          }
 
          // Log the images for debugging
          console.log("Retrieved images for selected BHK:", images);
        }
 
        // If no images found for selected BHK, return project images
        if (images.length === 0) {
          images = property.projectImages || [];
          console.log("Falling back to project images:", images);
        }
 
        // Prepend the base URL to the images
        const fullImageUrls = images.map((img) => `${Image_URL}${img}`);
        console.log("Full Image URLs:", fullImageUrls); // Log the final URLs
        return fullImageUrls;
      })()
    }
  />
</div>
{/* <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
  <h2 className="text-gray-300 text-lg font-bold mb-1">Project Pictures</h2>
  <CustomSwiper
    key={`swiper-project-${selectedBHK}`}
    images={
      (() => {
        let images = [];
 
        // Check if a BHK is selected
        if (["1 BHK", "2 BHK", "3 BHK", "4 BHK"].includes(selectedBHK)) {
          // Get images based on selected BHK
          switch (selectedBHK) {
            case "1 BHK":
              images = property.oneBHKConfig?.[0]?.type1Images || [];
              break;
            case "2 BHK":
              images = property.twoBHKConfig?.[0]?.type2Images || [];
              break;
            case "3 BHK":
              images = property.threeBHKConfig?.[0]?.type3Images || [];
              break;
            case "4 BHK":
              images = property.fourBHKConfig?.[0]?.type4Images || []; // Assuming you have a fourBHKConfig
              break;
            default:
              break;
          }
 
          // Log the images for debugging
          console.log("Retrieved images for selected BHK:", images);
        }
 
        // If no images found for selected BHK, return project images
        if (images.length === 0) {
          images = property.projectImages || [];
          console.log("Falling back to project images:", images);
        }
 
        // Prepend the base URL to the images
        return images.map((img) => `${Image_URL}${img}`); // Ensure there's no slash before img
      })()
    }
  />
</div> */}
          {/* <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
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
          </div> */}
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
            style={{fontSize:"30px"}}
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
                          Type {detail.typeNumber} - {detail.type1Area} SqFt -{" "}
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
        )}
 
        {/* {showrera && (
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
                    {property.reralink?.reralink && (
                    <a
                      href={property.reralink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Click here to check Rera details
                    </a>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )} */}
        {showrera && (
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
            Rera Link :
            {property.reralink && (
              <a
                href={property.reralink} // Ensure this is the correct URL
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
 
        {showProjectTimeline &&
        <div><ProjectTimeline />
      </div>}
 
        {showExpertReview && property.expertReview && (
  <div className="mt-6 p-4 border border-gray-600 px-6">
    {/* <h2 className="text-lg font-bold text-white">Expert Review</h2> */}
    <p className="text-gray-200">{property.expertReview.reviewText}</p>
  </div>
)}
 
        {/* {showCalculations && <Calculations />} */}
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
 