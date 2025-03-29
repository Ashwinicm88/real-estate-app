import React, { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import InputField from "./InputField"; // Import your custom InputField component

const RealEstateDetails = () => {
  const data = [
    { year: "2005", price: 0.25 },
    { year: "2010", price: 0.5 },
    { year: "2015", price: 0.75 },
    { year: "2020", price: 1.0 },
    { year: "2025", price: 1.5 },
  ];

  const [formData, setFormData] = useState({
    purchasePrice: "",
    stampDuty: "",
    parkingFees: "",
    otherCharges: "",
    registration: 30000, // Editable Registration Fee
  });

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    const newValue = value === "" ? "" : parseFloat(value) || ""; 

    setFormData((prevData) => {
      let newData = { ...prevData, [field]: newValue };

      if (field === "purchasePrice" && newValue !== "") {
        newData.stampDuty = (newValue * 0.06).toFixed(2);
        newData.otherCharges = (newValue * 0.02).toFixed(2);
        newData.parkingFees = (newValue * 0.05).toFixed(2);
      } else if (field === "purchasePrice" && newValue === "") {
        newData.stampDuty = "";
        newData.otherCharges = "";
        newData.parkingFees = "";
      }

      return newData;
    });
  };

  // ✅ Calculate Total Cost of Ownership (Only if purchasePrice is entered)
  const totalCost = useMemo(() => {
    const purchasePrice = parseFloat(formData.purchasePrice) || 0;
    const stampDuty = parseFloat(formData.stampDuty) || 0;
    const parkingFees = parseFloat(formData.parkingFees) || 0;
    const otherCharges = parseFloat(formData.otherCharges) || 0;
    const registrationFee = parseFloat(formData.registration) || 0;

    return purchasePrice > 0
      ? purchasePrice + stampDuty + parkingFees + otherCharges + registrationFee
      : null;
  }, [formData]);

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left Section: Price Trend Graph */}
        <div className="border border-white p-4">
          <h3 className="text-lg font-bold">Price Trend in Kothrud</h3>
          <div className="bg-black p-2 rounded">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid stroke="#ffffff40" strokeDasharray="5 5" />
                <XAxis dataKey="year" stroke="white" />
                <YAxis 
              stroke="white"
              tickFormatter={(value) => `${value * 10} L`} 
            />
            <Tooltip formatter={(value) => `${value * 10} L`} />
            <Line type="monotone" dataKey="price" stroke="white" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-white mt-2">Current Ready Reckoner Rate: 3500 Rs/SqFt</p>
        </div>

        {/* Right Section: Cost & Rent Details */}
        <div className="border border-white p-4">
          <h3 className="text-lg font-bold">True Cost of Ownership:</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Enter Purchase Price"
              field="purchasePrice"
              value={formData.purchasePrice}
              onChange={(section, field, value) => handleInputChange(null, field, value)}
            />

            <InputField
              label="Parking Fees (5% )"
              field="parkingFees"
              value={formData.parkingFees}
              onChange={(section, field, value) => handleInputChange(null, field, value)}
              disabled
            />
          </div>

          <div className="mt-2 flex gap-4">
            <div className="w-1/2">
              <InputField
                label="Stamp Duty (6%)"
                field="stampDuty"
                value={formData.stampDuty}
                onChange={(section, field, value) => handleInputChange(null, field, value)}
                disabled
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="Other Charges (2% )"
                field="otherCharges"
                value={formData.otherCharges}
                onChange={(section, field, value) => handleInputChange(null, field, value)}
                disabled
              />
            </div>
          </div>
          <div className="w-1/2">
          <InputField
            label="Registration Fees"            
            field="registration"
            value={formData.registration}
            onChange={(section, field, value) => handleInputChange(null, field, value)}
          /></div>

          {/* ✅ Show total cost only if purchasePrice is entered */}
          {totalCost !== null && (
            <p className="mt-4 text-white text-lg font-semibold">
              The true ownership cost is Rs. <span className="font-bold text-yellow-500">{totalCost.toLocaleString()}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealEstateDetails;
