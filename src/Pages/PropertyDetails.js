import { useState, useEffect } from "react";
import CustomSwiper from "../Components/CustomSwiper";
import Header from "../Components/Header";
import PhoneIcon from "@mui/icons-material/Phone";
import Calculations from "../Components/Calculations";
import { useParams } from "react-router-dom";

const bhkOptions = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Amenities",
  "Nearby",
  "Calculations",
];

const PropertyDetails = ({ }) => {
  const { projectId } = useParams(); // 🔹 Get Project_Id from URL
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedBHK, setSelectedBHK] = useState("oneBHKConfig"); // ✅ Move outside conditional blocks
  const [showCalculations, setShowCalculations] = useState(false); // ✅ Move outside conditional blocks
  const Image_URL = "http://localhost:8080"; // Update API URL
  const BASE_URL = `http://localhost:8080/api/entities/${projectId}`; //✅ Correct
  // const [property, setProperty] = useState(null);
  const [error, setError] = useState(""); // ✅ Define error state
  useEffect(() => {
    console.log("🔄 selectedBHK changed:", selectedBHK);
  }, [selectedBHK]);

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
        console.log("Fetched Data:", data); // 🔍 Debugging Log

        if (!data || Object.keys(data).length === 0) {
          setError("Property not found.");
          setProperty(null);
        } else {
          setProperty(data);
          setError("");  // Clear error if data exists
        }

        console.log("Updated Property State:", property);
        console.log("Updated Error State:", error);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Error loading property details.");
      }

    };

    if (projectId) fetchPropertyDetails();
  }, [projectId, selectedBHK]);

  useEffect(() => {
    console.log("Updated Property State:", property);
  }, [property]);

  // if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!property && !error) {
    return <p className="text-white">Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!property) return <p className="text-red-500">Property not found.</p>;

  // ✅ Correctly filter details based on selected BHK
  const filteredDetails =
    selectedBHK === "1 BHK"
      ? property?.oneBHKConfig || []
      : selectedBHK === "2 BHK"
        ? property?.twoBHKConfig || []
        : selectedBHK === "3 BHK"
          ? property?.threeBHKConfig || []
          : selectedBHK === "4 BHK"
            ? property?.fourBHKConfig || []
            : selectedBHK === "Amenities"
              ? Array.isArray(property?.Amenities) ? property.Amenities : []
              : selectedBHK === "Nearby"
                ? Array.isArray(property?.Nearby) ? property.Nearby : []
                : selectedBHK === "Calculations"
                  ? property?.Calculations
                  : [];

  console.log("Filtered Details:", filteredDetails);
  console.log("Selected BHK:", selectedBHK);
  // console.log("Value added of amenities and nearby:", valueAdds);

  const selectedBHKConfig = property?.[selectedBHK] || {
    images: [],
    floorPlans: [],
    details: [],
  };
  const handleBHKChange = (bhk) => {
    setSelectedBHK(bhk);
    setShowCalculations(bhk === "Calculations"); // Show calculations section if "Calculations" is selected
  };
  const layout = [];
  const area = [];
  console.log("Filtered Details:", filteredDetails);
  console.log("Selected BHK:", selectedBHK);

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
      <Header />
      <div className="bg-black text-white p-6 lg:p-8">
        <div className="flex justify-between items-center flex-wrap pt-8">
          {property?.projectName && (
            <h1 className="text-yellow-400 text-xl font-bold mt-1">
              {property.projectName}, {property.address}
            </h1>
          )}
          <p className="text-gray-200 text-lg mt-1">
            Property range from ₹{formatPrice(property.priceMin)} to ₹{formatPrice(property.priceMax)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div className="max-w-full md:max-w-[70%] mx-auto mb-3">
            <h2 className="text-gray-300 text-lg font-bold mb-1">
              Project Pictures
            </h2>
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
                Array.isArray(property?.type1FloorPlan
                ) && property.type1FloorPlan
                  .length > 0
                  ? property.type1FloorPlan
                    .map(img => `${Image_URL}${img}`)
                  // :["defaultFloorPlan1", "defaultFloorPlan2"]
                  : ["https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
              }
            />
          </div>
        </div>



        <div className="overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">

          <div className="flex space-x-4 border-b border-gray-600">
            {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Amenities", "Nearby", "Calculations"].map((bhk) => {
              console.log("bhk:", bhk); // ✅ Logs each BHK type correctly

              return (
                <button
                  key={bhk}
                  onClick={() => handleBHKChange(bhk)}
                  className={`px-4 py-2 ${selectedBHK === bhk
                    ? "text-white border-b-2 border-white"
                    : "text-[#36454F]"
                    } transition duration-200`}
                >
                  {bhk}
                </button>
              );
            })}
          </div>


        </div>
{(Array.isArray(filteredDetails) && filteredDetails.length > 0) || selectedBHK === "Amenities" || selectedBHK === "Nearby" ? (
  <>
    {console.log("filteredDetails:", filteredDetails)}
    {console.log("First Element of Filtered Details:", filteredDetails[0])}

    <div className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      {selectedBHK === "Amenities" ? (
        // Render amenities directly
        <div>
          {/* <h3 className="text-lg font-bold text-white">Amenities</h3> */}
          {property.Amenities && typeof property.Amenities === 'object' ? (
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full text-left border-collapse">
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
            </div>
          ) : (
            <p className="text-gray-400">No amenities available.</p>
          )}
        </div>
      ) : selectedBHK === "Nearby" ? (
        // Render nearby places directly
        <div>
          {/* <h3 className="text-lg font-bold text-white">Nearby</h3> */}
          {property.Nearby && typeof property.Nearby === 'object' ? (
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full text-left border-collapse">
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
            </div>
          ) : (
            <p className="text-gray-400">No nearby amenities available.</p>
          )}
        </div>
      ) : (
        // Render BHK details
        filteredDetails.map((detail, index) => {
          const bhkConfig = detail; // Use detail directly for BHK configurations
          console.log("bhkConfig:", bhkConfig);
          if (!bhkConfig) return null; // Skip if no BHK data is found

          let layout = [];
          let area = [];

          // Populate layout and area based on selected BHK
          layout = ["Hall", "Kitchen", "Bed 1"];
          area = [bhkConfig.hallArea, bhkConfig.kitchenArea, bhkConfig.bedroom1Area];

          if (bhkConfig.bedroom2Area) {
            layout.push("Bed 2");
            area.push(bhkConfig.bedroom2Area);
          }
          if (bhkConfig.bedroom3Area) {
            layout.push("Bed 3");
            area.push(bhkConfig.bedroom3Area);
          }

          layout.push("Bath 1");
          area.push(bhkConfig.bathroom1Area);

          if (bhkConfig.bathroom2Area) {
            layout.push("Bath 2");
            area.push(bhkConfig.bathroom2Area);
          }

          layout.push("Balcony", "Parking");
          area.push(
            (bhkConfig.type1Balcony || 0) +
            (bhkConfig.type2Balcony || 0) +
            (bhkConfig.type3Balcony || 0)
          );
          area.push(
            (bhkConfig.type1Parking || 0) +
            (bhkConfig.type2Parking || 0) +
            (bhkConfig.type3Parking || 0)
          );

          return (
            <div key={index} className="p-4 rounded-lg shadow-md">
              {/* Project Name */}
              {detail.projectName && (
                <h2 className="text-lg font-bold text-white">{detail.projectName}</h2>
              )}

              {/* BHK Details */}
              {bhkConfig.type1Area && property.priceMax && bhkConfig.typeNumber && (
                <h3 className="text-md font-semibold text-gray-300">
                  {bhkConfig.typeNumber} - {bhkConfig.type1Area} Sqft - ₹{property.priceMax}
                </h3>
              )}

              {/* Responsive Table */}
              {layout.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-600">
                        {layout.map((room, idx) => (
                          <th key={idx} className="p-2 text-center text-gray-300">{room}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-600">
                        {area.map((areaVal, idx) => (
                          <td key={idx} className="p-2 text-center text-gray-200">{areaVal}</td>
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
  <p className="text-gray-400 text-center mt-4">No data available for {selectedBHK}.</p>
)}


        {/* Calculations Section */}
        {showCalculations && <Calculations />}

        <div className="fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
          <PhoneIcon className="w-5 h-5 text-yellow-500" />
          <span>Book Consultation</span>
        </div>
      </div>
    </div>

  );
}

export default PropertyDetails;
