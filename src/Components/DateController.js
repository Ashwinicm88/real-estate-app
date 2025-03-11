// import React, { useState } from 'react';

// const DatePicker = ({ label, onChange }) => {
//   const [selectedDate, setSelectedDate] = useState('');

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//     if (onChange) onChange(date); // Call the onChange prop if provided
//   };

//   return (
//     <div className="flex flex-col mb-4">
//       <label className="text-gray-700 mb-2">{label}</label>
//       <input
//         type="date"
//         value={selectedDate}
//         onChange={handleDateChange}
//         className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default DatePicker;

// src/components/DatePicker.jsx
import React from "react";

const DatePicker = ({ label, section,placeholder, field, value, onChange, error}) => {
 
    const handleDateChange = (e) => {
        const formattedDate = e.target.value; // Already in yyyy-mm-dd format
        onChange(section, field, formattedDate);
      };

  return (
    <div className="relative w-3/4 mb-1">
      {/* Label */}
      {label && <label className="text-gray-500 block mb-2">{label}</label>}

      {/* Date Input */}
      <input
        type={value ? "date" : "text"}
        value={value || ""}
        onChange={handleDateChange}
        placeholder={placeholder || "Select Date"}
        onMouseEnter={(e) => (e.target.type = "date")}
        className="bg-black text-white w-full p-2 pr-12 focus:outline-none focus:border-white  border-b border-[#FFFFF] appearance-none
        [&::-webkit-calendar-picker-indicator]:absolute
        [&::-webkit-calendar-picker-indicator]:right-0
        [&::-webkit-calendar-picker-indicator]:mr-2
        [&::-webkit-calendar-picker-indicator]:h-6
        [&::-webkit-calendar-picker-indicator]:w-6
        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:filter
        [&::-webkit-calendar-picker-indicator]:invert" />


      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;

