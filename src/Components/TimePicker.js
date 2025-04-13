// import React from "react";
 
// const TimePicker = ({ label, field, value, onChange }) => {
//   const timeSlots = [
//     { label: "9 AM - 12 PM", value: "9am-12pm" },
//     { label: "12 PM - 3 PM", value: "12pm-3pm" },
//     { label: "3 PM - 6 PM", value: "3pm-6pm" },
//   ];
 
//   const handleTimeChange = (e) => {
//     onChange(field, e.target.value);
//   };
 
//   return (
//     <div className="w-full mb-1 mobile-s:mx-3 mobile-m:mx-4
//     text-base mobile-s:text-sm mobile-m:text-md mobile-l:text-lg md:ml-10 md:w-3/4">
//       <label className="text-[#9CA3AF] block mb-1 mt-4" htmlFor={field}>{label}</label>
//       <select
//         id={field}
//         value={value}
//         onChange={handleTimeChange}
//         className="bg-[#111111] text-white w-full p-2 pr-12 focus:outline-none focus:border-white border-b border-[#FFFFF]">
//         <option value="" disabled>Select a time slot</option>
//         {timeSlots.map((slot) => (
//           <option key={slot.value} value={slot.value}>
//             {slot.label}
//           </option>
//         ))}
//       </select>
     
//     </div>
//   );
// };
 
// export default TimePicker;
 
 
import React from "react";

const TimePicker = ({ label, section = "", field, value, onChange }) => {
  const timeSlots = [
    { label: "9 AM - 12 PM", value: "9am-12pm" },
    { label: "12 PM - 3 PM", value: "12pm-3pm" },
    { label: "3 PM - 6 PM", value: "3pm-6pm" },
  ];

  const handleTimeChange = (e) => {
    onChange(section, field, e.target.value);
  };

  return (
    <div className="w-full mb-1 mobile-s:mx-3  mobile-m:mx-4 
    text-base mobile-s:text-sm mobile-m:text-md mobile-l:text-lg md:ml-10 md:w-3/4 mobile-s:w-3/4">
      <label className="text-[#9CA3AF] block mb-1 mt-4" htmlFor={field}>{label}</label>
      <select
        id={field}
        value={value}
        onChange={handleTimeChange}
        className="bg-black text-white w-full p-2 pr-12 focus:outline-none focus:border-white border-b border-[#FFFFF]">
        <option value="" disabled>Select a time slot</option>
        {timeSlots.map((slot) => (
          <option key={slot.value} value={slot.value}>
            {slot.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;