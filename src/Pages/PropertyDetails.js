import { useState } from "react";
import CustomSwiper from "../Components/CustomSwiper";
import Header from "../Components/Header";
import PhoneIcon from "@mui/icons-material/Phone";
import Calculations from "../Components/Calculations"

const bhkOptions = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Value Adds",
  "Calculations",
];
const propertyTypes = {
  name: "Shiva Heights",
  address: "Kothrud-413053",
  pricemin: "50000000",
  pricemax: "100000000",
  images: [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/7937315/pexels-photo-7937315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  "1 BHK": {
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7937315/pexels-photo-7937315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    floorPlans: [
      "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7937315/pexels-photo-7937315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        type: "Type 1",
        size: 700,
        dimensions: "30*20",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bath 1",
          "Bath 2",
          "Balcony",
          "Parking",
        ],
        area: [
          "300", // Hall area
          "150", // Kitchen area
          "250", // Bed 1 area
          "50 ", // Bath 1 area with details
          "40 ", // Bath 2 area with details
          "Yes", // Balcony
          "Yes", // Parking
        ],
      },
      {
        type: "Type 2",
        size: 450,
        dimensions: "20*10",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 2",
          "Bath 1",
          "Bath 2",
          "Balcony",
          "Parking",
        ], // Same layout as Type 1
        area: [
          "190", // Hall area
          "90", // Kitchen area
          "140", // Bed 1 area


          "40 ", // Bath 1 area with details
          "30 ", // Bath 2 area with details
          "Yes", // Balcony
          "No", // Parking
        ],
      },
    ],
  },
  "2 BHK": {
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    floorPlans: [
      "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        type: "Type 1",
        size: 900,
        dimensions: "35*25",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bed 2",
          "Bath 1",
          "Bath 2",
          "Balcony",
          "Parking",
        ],
        area: [
          "350", // Hall area
          "150", // Kitchen area
          "250", // Bed 1 area with details
          "250 )", // Bed 2 area with details
          "50 ", // Bath 1 area with details
          "40 ", // Bath 2 area with details
          "Yes", // Balcony
          "Yes", // Parking
        ],
      },
      {
        type: "Type 2",
        size: 800,
        dimensions: "30*25",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bed 2",
          "Bath 1",
          "Bath 2",
          "Balcony",
          "Parking",
        ],
        area: [
          "300", // Hall area
          "120", // Kitchen area
          "200 ", // Bed 1 area with details
          "180 ", // Bed 2 area with details
          "40 ", // Bath 1 area with details
          "30 ",
          "Yes",
          "No", // Bath 2 area with details
        ],
      },
    ],
  },
  "3 BHK": {
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    floorPlans: [
      "https://images.pexels.com/photos/7937315/pexels-photo-7937315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7937315/pexels-photo-7937315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        type: "Type 1",
        size: 900,
        dimensions: "35*25",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bed 2",
          "Bed 3",
          "Bath 1",
          "Bath 2",
          "Balcony",
          "Parking",
        ],
        area: [
          "350", // Hall area
          "150", // Kitchen area
          "250 ", // Bed 1 area with details
          "250", // Bed 2 area with details
          "250 ", // Bed 3 area with details
          "50 ", // Bath 1 area with details
          "40 ", // Bath 2 area with details
          "Yes", // Balcony
          "Yes", // Parking
        ],
      },
      {
        type: "Type 2",
        size: 800,
        dimensions: "30*25",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bed 2",
          "Bed 3",
          "Bath 1",
          "Bath 2",
          "Bath 3",
          "Balcony",
          "Parking",
        ],
        area: [
          "300", // Hall area
          "120", // Kitchen area
          "200 ", // Bed 1 area with details
          "180 ", // Bed 2 area with details
          "180 ", // Bed 3 area with details
          "40 ", // Bath 1 area with details
          "30 ",
          "30 ",
          "Yes",
          "No", // Bath 2 area with details
        ],
      },
    ],
  },
  "4 BHK": {
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    floorPlans: [
      "https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    details: [
      {
        type: "Type 1",
        size: 900,
        dimensions: "35*25",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bed 2",
          "Bed 3",
          "Bed 4",
          "Bath 1",
          "Bath 2",
          "Bath 3",
          "Bath 4",
          "Balcony",
          "Parking",
        ],
        area: [
          "350", // Hall area
          "150", // Kitchen area
          "250 ", // Bed 1 area with details
          "250 ", // Bed 2 area with details
          "250 ", // Bed 3 area with details
          "250", // Bed 4 area with details
          "50 ", // Bath 1 area with details
          "40 ", // Bath 2 area with details
          "40 ", // Bath 3 area with details
          "40 ", // Bath 4 area with details
          "Yes", // Balcony
          "Yes", // Parking
        ],
      },
      {
        type: "Type 2",
        size: 800,
        dimensions: "30*25",
        layout: [
          "Hall",
          "Kitchen",
          "Bed 1",
          "Bed 2",
          "Bed 3",
          "Bed 4",
          "Bath 1",
          "Bath 2",
          "Bath 3",
          "Bath 4",
          "Balcony",
          "Parking",
        ],
        area: [
          "300", // Hall area
          "120", // Kitchen area
          "200 ", // Bed 1 area with details
          "180", // Bed 2 area with details
          "180 ", // Bed 3 area with details
          "180 ", // Bed 4 area with details
          "40 ", // Bath 1 area with details
          "30 ",
          "30",
          "30 ",
          "Yes",
          "No", // Bath 2 area with details
        ],
      },
    ],
  },
  "Value Adds": {
    details: [
      {
        name: "Amenities", // Added name property
        layout: [
          "Swimming Pool",
          "Temple",
          "Gym",
          "Creche",
          "Children Park",
          "Park",
          "Club House",
          "C. Hall",
          "Other",
        ],
        area: ["30*50", "NA", "30*50", "", "", "", "", "", ""],
      },
      {
        name: "Nearby Places", // Added name property
        layout: [
          "Schools",
          "Hospitals",
          "IT Parks",
          "Hangouts",
          "Cinemas",
          "Metro",
        ],
        area: ["JPMS 4 KMS, XYZ 3 KMs", "Sahyadri - 5 kms", "", "", "", ""],
      },
    ],
  },
};


export default function PropertyDetails() {
  const [selectedBHK, setSelectedBHK] = useState("1 BHK");
  const [showCalculations, setShowCalculations] = useState(false); // State for showing calculations section
  
  const currentProperty = propertyTypes[selectedBHK] || {
    images: [],
    floorPlans: [],
    details: [],
  };
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toLocaleString() + " Crore";
    } else {
      return (price / 100000).toLocaleString() + " Lakh";
    }
  };

  const handleBHKChange = (bhk) => {
    setSelectedBHK(bhk);
    setShowCalculations(bhk === "Calculations"); // Show calculations section if "Calculations" is selected
  };
 
  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-14">
      <Header />
      <div className="bg-black text-white p-6 lg:p-8">
      <div className="flex justify-between items-center flex-wrap pt-8">
  {propertyTypes.name && (
    <h1 className="text-yellow-400 text-xl font-bold mt-1">
      {propertyTypes.name}, {propertyTypes.address}
    </h1>
  )}
  <p className="text-gray-200 text-lg mt-1">
    Property range from ₹{formatPrice(propertyTypes.pricemin)} to ₹{formatPrice(propertyTypes.pricemax)}
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
                currentProperty.images?.length
                  ? currentProperty.images
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
                currentProperty.floorPlans?.length
                  ? currentProperty.floorPlans
                  : ["https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
              }
            />
          </div>
        </div>


     
        <div className="overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          <div className="flex space-x-4 border-b border-gray-600">
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
  

        {currentProperty.details.length > 0 && (
  <div 
    className="overflow-y-scroll h-40 p-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
  >
    {currentProperty.details.map((property, index) => (
      <div key={index} className="p-4 rounded-lg shadow-md ">
        {/* Display the name if it exists */}
        {property.name && (
          <h2 className="text-lg font-bold text-white">{property.name}</h2>
        )}

        {/* If the property has a type, display it along with size */}
        {property.type && (
          <h3 className="text-md font-semibold text-gray-300">
            {property.type} - {property.size} SqFt
          </h3>
        )}

        {/* Responsive Table */}
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                {property.layout.map((room, idx) => (
                  <th key={idx} className="p-2 text-center text-gray-300">
                    {room}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600">
                {property.area.map((area, idx) => (
                  <td key={idx} className="p-2 text-center text-gray-200">
                    {area}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ))}
  </div>
)}


        {/* Calculations Section */}
        {showCalculations && <Calculations/>}

<div className="fixed bottom-1 right-4 bg-transparent text-white font-semibold py-4 px-4 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-500 transition-all cursor-pointer">
          <PhoneIcon className="w-5 h-5 text-yellow-500" />
          <span>Book Consultation</span>
        </div>
      </div>
    </div>
  );
}