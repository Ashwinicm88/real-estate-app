import React  from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const RealEstateDetails = () => {
  // Data for Recharts
  const data = [
    { year: "2005", price: 0.25 },
    { year: "2010", price: 0.5 },
    { year: "2015", price: 0.75 },
    { year: "2020", price: 1.0 },
    { year: "2025", price: 1.5 },
  ];

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      {/* Read-Only Text Block */}
      <div className="border border-white p-4 mb-6">
        <h2 className="text-xl font-bold">Shiva Heights, Kothrud - 413053</h2>
        <p className="mt-2 text-white">Price Range: From 80 Lakhs to 1.25 Cr</p>
        <p className="mt-4 border p-2 bg-black text-white rounded h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-black">
          ajshdjashdsajhkhsajhsakjdhaskjdhaskjkdashjkdashjhasdjagsdhajkdhaslkdhaskjdhsakjsahkdhsakdsasdhdsadjk
        </p>
      </div>

      {/* Main Section - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Price Trend Graph */}
        <div className="border border-white p-4">
          <h3 className="text-lg font-bold">Price Trend in Kothrud</h3>
          <div className="bg-black p-2 rounded">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid stroke="#ffffff40" strokeDasharray="5 5" />
                <XAxis dataKey="year" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="white" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-white mt-2">Current Ready Reckoner Rate: 3500 Rs/SqFt</p>
        </div>

        {/* Right Section: Cost & Rent Details */}
        <div className="border border-white p-4">
          <h3 className="text-lg font-bold">True Cost of Ownership:</h3>

          {/* Editable Inputs */}
          <div className="mt-2">
            <label className="block">Purchase Price:</label>
            <input type="number" className="w-full bg-black border border-white p-2 text-white rounded" placeholder="Enter Price" />
          </div>

          <div className="mt-2 flex gap-4">
            <div className="w-1/2">
              <label className="block">Stamp Duty:</label>
              <input type="number" className="w-full bg-black border border-white p-2 text-white rounded" placeholder="Enter Amount" />
            </div>
            <div className="w-1/2">
              <label className="block">Other Charges (2%):</label>
              <input type="number" className="w-full bg-black border border-white p-2 text-white rounded" placeholder="Auto-calculated" disabled />
            </div>
          </div>

          <div className="mt-2">
            <label className="block">Parking Fees:</label>
            <input type="number" className="w-full bg-black border border-white p-2 text-white rounded" placeholder="Enter Amount" />
          </div>

          <div className="mt-2">
            <label className="block">Registration:</label>
            <input type="number" className="w-full bg-black border border-white p-2 text-white rounded" placeholder="Enter Amount" />
          </div>

          <p className="mt-4 text-white">
            The true ownership cost after 20 years is Rs. <span className="font-bold">XXXXX</span>
          </p>

          <h3 className="text-lg font-bold mt-4">Probable Rent Income:</h3>
          <p>510000 Rs/month</p>
          <p>YOY rent increase - 6%</p>
        </div>
      </div>
    
    </div>
    
  );
};

export default RealEstateDetails;
