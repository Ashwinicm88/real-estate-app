import React  from "react";

const RealEstateDetails = () => {
  // Data for Recharts
  return (
    <div className="bg-black text-white p-6 min-h-screen">
      {/* Read-Only Text Block */}
      <div className="border border-white p-4 mb-2 h-[200px]">
        <p className="p-1 bg-black text-white rounded overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-black">
        This 3BHK luxury apartment offers a perfect blend of modern design, comfort, and convenience. Located in a highly sought-after neighborhood, it provides easy access to key areas, including business districts, schools, and shopping centers.
        </p>
      </div>
    </div>
    
  );
};

export default RealEstateDetails;
