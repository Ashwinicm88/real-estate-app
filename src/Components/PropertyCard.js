import React from "react";
import {Link} from 'react-router-dom';

const BASE_URL = "http://localhost:8080"; // Ensure this matches your backend URL

const PropertyCard = ({ property }) => {
  const imageUrl =
    property.projectPictures?.length > 0
      ? `${BASE_URL}${property.projectPictures[0]}`
      : "/default-image.jpg";

  return (
    <div className="border border-gray-500 rounded-lg shadow-lg bg-black w-full max-w-[300px] sm:max-w-[370px] md:max-w-[420px] lg:max-w-[450px] p-5 mx-auto"> 
      
      {/* ✅ Project Name (Above the Image) */}
      <h2 className="text-lg font-bold text-yellow-400 mb-2">{property.projectName || "N/A"}</h2>

      {/* ✅ Property Image Section */}
      <div className="w-full h-52 rounded-lg overflow-hidden border border-gray-600 relative">
        <img src={imageUrl} alt={property.projectName || "Property"} className="w-full h-full object-cover" />
        
        {/* 🔹 Project Status (Top Right Inside Image) */}
        <p className="absolute top-2 right-2 bg-yellow-400 text-black font-semibold text-sm px-3 py-1 rounded-md">
          {property.projectStatus || "Ongoing"}
        </p>
      </div>

      {/* ✅ Property Details */}
      <div className="text-white mt-4">
        {/* ✅ Price Range */}
        <p className="text-white">
                  Price Range:{" "}
                  <span className="text-green-500">
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

                {/* ✅ Address */}
                <p className="text-white">
                  Address - {property.projectAddress || "N/A"}
                </p>

        {/* View Details Button */}
        <Link
          to={`/property-details/${property.projectId}`} // ⬅️ Using React Router navigation
          className="block text-right text-blue-500 font-semibold mt-4 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
