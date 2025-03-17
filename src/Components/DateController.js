<<<<<<< HEAD
import React from "react";
 
const DateController = ({ label, section,placeholder, field, value, onChange, error}) => {
 
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
    </div>
  );
};
 
export default DateController;
=======
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

// // src/components/DatePicker.jsx
// import React from "react";

// const DatePicker = ({ label, section,placeholder, field, value, onChange, error}) => {
 
//     const handleDateChange = (e) => {
//         const formattedDate = e.target.value; // Already in yyyy-mm-dd format
//         onChange(section, field, formattedDate);
//       };

//   return (
//     <div className="relative w-3/4 mb-1">
//       {/* Label */}
//       {label && <label className="text-[#9CA3AF] block mb-1">{label}</label>}

//       {/* Date Input */}
//       <input
//         type={value ? "date" : "text"}
//         value={value || ""}
//         onChange={handleDateChange}
//         placeholder={placeholder || "Select Date"}
//        onMouseEnter={(e) => (e.target.type = "date")}
//         className="bg-black text-white w-full p-2 pr-12 focus:outline-none focus:border-white  border-b border-[#FFFFF] appearance-none
//         [&::-webkit-calendar-picker-indicator]:absolute
//         [&::-webkit-calendar-picker-indicator]:right-0
//         [&::-webkit-calendar-picker-indicator]:mr-2
//         [&::-webkit-calendar-picker-indicator]:h-6
//         [&::-webkit-calendar-picker-indicator]:w-6
//         [&::-webkit-calendar-picker-indicator]:cursor-pointer
//         [&::-webkit-calendar-picker-indicator]:filter
//         [&::-webkit-calendar-picker-indicator]:invert" />


//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// };

// export default DatePicker;

import React from "react";

const DatePicker = ({ label, section, placeholder, field, value, onChange, error }) => {
  // Handle Date Change
  const handleDateChange = (e) => {
    const formattedDate = e.target.value; // Already in yyyy-mm-dd format
    onChange(section, field, formattedDate);
  };

  return (
    <div className="w-full mb-1 mobile-s:mx-3 mobile-m:mx-4 
    text-base mobile-s:text-sm mobile-m:text-md mobile-l:text-lg md:ml-10 md:w-3/4">
      {/* Label */}
      {label && <label className="text-[#9CA3AF] block mb-1 mt-4">{label}</label>}

      {/* Date Input (Always Visible) */}
      <input
        type="date" // Always shows the date input
        value={value || ""}
        onChange={handleDateChange}
        placeholder={placeholder || "Select Date"}
        className="bg-black text-white w-full p-2 pr-12 focus:outline-none focus:border-white border-b border-[#FFFFF] appearance-none
          relative
          [&::-webkit-calendar-picker-indicator]:absolute
          [&::-webkit-calendar-picker-indicator]:right-2
          [&::-webkit-calendar-picker-indicator]:top-1/2
          [&::-webkit-calendar-picker-indicator]:-translate-y-1/2
          [&::-webkit-calendar-picker-indicator]:h-6
          [&::-webkit-calendar-picker-indicator]:w-6
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-calendar-picker-indicator]:filter
          [&::-webkit-calendar-picker-indicator]:invert"
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;
>>>>>>> Gmap
