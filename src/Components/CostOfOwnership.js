
// import React, { useState, useMemo, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import InputField from "./InputField";
// import DropdownField from "./DropdownField"; // ✅ Your reusable dropdown



// // Mapping API response to chart data format
// const transformData = (data) => {
//   return {
//     ...data,
//     chartData: [
//       { year: "2005", price: data.rate2005 },
//       { year: "2010", price: data.rate2010 },
//       { year: "2015", price: data.rate2015 },
//       { year: "2020", price: data.rate2020 },
//       { year: "2025", price: data.rate2025 },
//       { year: "2030", price: data.rate2030 },
//       { year: "2035", price: data.rate2035 },
//     ],
//   };
// };

// const RealEstateDetails = () => {
//   const [trendData, setTrendData] = useState({});
//   const [selectedLocation, setSelectedLocation] = useState("Kothrud,Pune");
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     purchasePrice: "",
//     stampDuty: "",
//     parkingFees: "",
//     otherCharges: "",
//     registration: 30000,
//   });

//     // Fetch trends data
//     useEffect(() => {
//       const fetchTrends = async () => {
//         try {
//           const response = await axios.get("http://localhost:8080/api/trends");
//           const mappedData = {};
  
//           response.data.forEach((item) => {
//             mappedData[item.location] = transformData(item);
//           });
  
//           setTrendData(mappedData);
//         } catch (error) {
//           console.error("Error fetching trend data:", error);
//         }
//       };
  
//       fetchTrends();
//     }, []);


//   const handleLocationChange = (section, field, value) => {
//     setSelectedLocation(value);
//   };

//   const handleInputChange = (section, field, value) => {
//     const newValue = value === "" ? "" : parseFloat(value) || "";

//     setFormData((prevData) => {
//       let newData = { ...prevData, [field]: newValue };

//       if (field === "purchasePrice" && newValue !== "") {
//         newData.stampDuty = (newValue * 0.06).toFixed(2);
//         newData.otherCharges = (newValue * 0.02).toFixed(2);
//         newData.parkingFees = (newValue * 0.05).toFixed(2);
//       } else if (field === "purchasePrice" && newValue === "") {
//         newData.stampDuty = "";
//         newData.otherCharges = "";
//         newData.parkingFees = "";
//       }

//       return newData;
//     }); 
//   };
//   const currentReconerRate =
//   trendData[selectedLocation]?.readyreckoner || "N/A";


//   const totalCost = useMemo(() => {
//     const purchasePrice = parseFloat(formData.purchasePrice) || 0;
//     const stampDuty = parseFloat(formData.stampDuty) || 0;
//     const parkingFees = parseFloat(formData.parkingFees) || 0;
//     const otherCharges = parseFloat(formData.otherCharges) || 0;
//     const registrationFee = parseFloat(formData.registration) || 0;

//     return purchasePrice > 0
//       ? purchasePrice + stampDuty + parkingFees + otherCharges + registrationFee
//       : null;
//   }, [formData]);
//   const roundToNearest = (number, target) => {
//     return Math.round(number / target) * target;
//   };
//   return (
//     <div className="bg-black text-white p-6 min-h-screen">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         {/* Left Section: Price Trend */}
//         <div className="border border-white p-4">
//           <h3 className="text-lg font-bold mb-2">Price Trend</h3>
//           <DropdownField
//             label="Select Location"
//             section="graph"
//             field="location"
//             value={selectedLocation}
//             onChange={handleLocationChange}
//             options={Object.keys(trendData).map((loc) => ({
//               label: loc, // ✅ typo fixed from "lablel" to "label"
//               value: loc,
//             }))}
//           />

//           <div className="bg-black p-2 rounded mt-4">
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={trendData[selectedLocation]?.chartData || []}>
//                 <CartesianGrid stroke="#ffffff40" strokeDasharray="5 5" />
//                 <XAxis dataKey="year" stroke="white" />
//                 <YAxis
//                   stroke="white"
//                   tickFormatter={(value) => `${value * 10} L`}
//                 />
//                 <Tooltip formatter={(value) => `${value * 10} L`} />
//                 <Line
//                   type="monotone"
//                   dataKey="price"
//                   stroke="white"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <p className="text-white mt-2">
//   Current Ready Reckoner Rate:{" "}
//   <span className="font-semibold text-yellow-500">
//     {currentReconerRate} 
//   </span>
// </p>

//         </div>

//         {/* Right Section: Inputs & Calculation */}
//         <div className="border border-white p-4">
//           <h3 className="text-lg font-bold">True Cost of Ownership:</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <InputField
//               label="Enter Purchase Price"
//               field="purchasePrice"
//               value={formData.purchasePrice}
//               onChange={(section, field, value) =>
//                 handleInputChange(null, field, value)
//               }
//             />

//             <InputField
//               label="Parking Fees (5%)"
//               field="parkingFees"
//               value={formData.parkingFees}
//               onChange={(section, field, value) =>
//                 handleInputChange(null, field, value)
//               }
//               disabled
//             />
//           </div>

//           <div className="mt-2 flex gap-4">
//             <div className="w-1/2">
//               <InputField
//                 label="Stamp Duty (6%)"
//                 field="stampDuty"
//                 value={formData.stampDuty}
//                 onChange={(section, field, value) =>
//                   handleInputChange(null, field, value)
//                 }
//                 disabled
//               />
//             </div>
//             <div className="w-1/2">
//               <InputField
//                 label="Other Charges (2%)"
//                 field="otherCharges"
//                 value={formData.otherCharges}
//                 onChange={(section, field, value) =>
//                   handleInputChange(null, field, value)
//                 }
//                 disabled
//               />
//             </div>
//           </div>

//           <div className="w-1/2">
//             <InputField
//               label="Registration Fees"
//               field="registration"
//               value={formData.registration}
//               onChange={(section, field, value) =>
//                 handleInputChange(null, field, value)
//               }
//             />
//           </div>

//           {totalCost !== null && (
//             <p className="mt-4 text-white text-lg font-semibold px-4">
//               The true ownership cost is Rs.{" "}
//               <span className="font-bold text-yellow-500">
//                 {totalCost.toLocaleString()}
//               </span>
//             </p>
//           )}

//         <button
//           onClick={() => {
//             const budget = roundToNearest(totalCost,250000); // Assuming totalCost is the budget you want to pass
//             const city = selectedLocation; // The selected city
//             // Construct the query parameters
//             const params = new URLSearchParams();
//             params.set("city", city);
//             params.set("budgetMax", budget);
//             console.log("Navigating to Properties...",city,budget);
//             navigate(`/search-result?${params.toString()}`);
//           }}
//           className="inline-block mt-4 text-white font-bold px-4 py-2 rounded "
//         >
//            {totalCost !== null && (
//        <p>View Properties at <span>{selectedLocation}</span> matching the above cost of ownership <span className="text-yellow-500">➜</span></p>
//       )}
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealEstateDetails;

import React, { useState, useMemo, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import InputField from "./InputField";
import DropdownField from "./DropdownField"; // ✅ Your reusable dropdown



// Mapping API response to chart data format
const transformData = (data) => {
  return {
    ...data,
    chartData: [
      { year: "2005", price: data.rate2005 },
      { year: "2010", price: data.rate2010 },
      { year: "2015", price: data.rate2015 },
      { year: "2020", price: data.rate2020 },
      { year: "2025", price: data.rate2025 },
      { year: "2030", price: data.rate2030 },
      { year: "2035", price: data.rate2035 },
    ],
  };
};

const RealEstateDetails = ({ defaultLocation }) => {
  const [trendData, setTrendData] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation || "Kothrud,Pune");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    purchasePrice: "",
    stampDuty: "",
    parkingFees: "",
    otherCharges: "",
    registration: 30000,
  });
  useEffect(() => {
    setSelectedLocation(defaultLocation);
  }, [defaultLocation]);
  
    // Fetch trends data
    useEffect(() => {
      const fetchTrends = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/trends");
          const mappedData = {};
  
          response.data.forEach((item) => {
            mappedData[item.location] = transformData(item);
          });
  
          setTrendData(mappedData);
        } catch (error) {
          console.error("Error fetching trend data:", error);
        }
      };
  
      fetchTrends();
    }, []);


  const handleLocationChange = (section, field, value) => {
    setSelectedLocation(value);
  };

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
  const currentReconerRate =
  trendData[selectedLocation]?.readyreckoner || "N/A";


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
  const roundToNearest = (number, target) => {
    return Math.round(number / target) * target;
  };
  return (
    <div className="bg-black text-white p-6 min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Left Section: Price Trend */}
        <div className="border border-white p-4">
          <h3 className="text-lg font-bold mb-2">Price Trend</h3>
          <DropdownField
            label="Select Location"
            section="graph"
            field="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            options={Object.keys(trendData).map((loc) => ({
              label: loc, // ✅ typo fixed from "lablel" to "label"
              value: loc,
            }))}
          />

          <div className="bg-black p-2 rounded mt-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData[selectedLocation]?.chartData || []}>
                <CartesianGrid stroke="#ffffff40" strokeDasharray="5 5" />
                <XAxis dataKey="year" stroke="white" />
                <YAxis
                  stroke="white"
                  tickFormatter={(value) => `${value * 10} L`}
                />
                <Tooltip formatter={(value) => `${value * 10} L`} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="white"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-white mt-2">
  Current Ready Reckoner Rate:{" "}
  <span className="font-semibold text-yellow-500">
    {currentReconerRate} 
  </span>
</p>

        </div>

        {/* Right Section: Inputs & Calculation */}
        <div className="border border-white p-4">
          <h3 className="text-lg font-bold mb-2">True Cost of Ownership:</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            <InputField
              label="Enter Purchase Price"
              field="purchasePrice"
              value={formData.purchasePrice}
              onChange={(section, field, value) =>
                handleInputChange(null, field, value)
              }
            />

            <InputField
              label="Parking Fees (5%)"
              field="parkingFees"
              value={formData.parkingFees}
              onChange={(section, field, value) =>
                handleInputChange(null, field, value)
              }
              disabled
            />
          </div>

          <div className="mt-2 flex gap-2 p-2">
            <div className="w-1/2">
              <InputField
                label="Stamp Duty (6%)"
                field="stampDuty"
                value={formData.stampDuty}
                onChange={(section, field, value) =>
                  handleInputChange(null, field, value)
                }
                disabled
              />
            </div>
            <div className="w-1/2">
              <InputField
                label="Other Charges (2%)"
                field="otherCharges"
                value={formData.otherCharges}
                onChange={(section, field, value) =>
                  handleInputChange(null, field, value)
                }
                disabled
              />
            </div>
          </div>

          <div className="w-1/2 p-2 mt-4">
            <InputField
              label="Registration Fees"
              field="registration"
              value={formData.registration}
              onChange={(section, field, value) =>
                handleInputChange(null, field, value)
              }
            />
          </div>

          {totalCost !== null && (
            <p className="mt-8 text-white text-lg font-semibold px-4">
              The true ownership cost is Rs.{" "}
              <span className="font-bold text-yellow-500">
                {totalCost.toLocaleString()}
              </span>
            </p>
          )}

        <button
          onClick={() => {
            const budget = roundToNearest(totalCost,250000); // Assuming totalCost is the budget you want to pass
            const city = selectedLocation; // The selected city
            // Construct the query parameters
            const params = new URLSearchParams();
            params.set("city", city);
            params.set("budgetMax", budget);
            console.log("Navigating to Properties...",city,budget);
            navigate(`/search-result?${params.toString()}`);
          }}
          className="inline-block mt-4 text-white text-lg font-semibold px-4 rounded "
        >
           {totalCost !== null && (
       <p><span className="text-yellow-500"> Click here </span> to view the properties in <span>{selectedLocation}</span> matching the above cost of owership  </p>
      )}
        </button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateDetails;
