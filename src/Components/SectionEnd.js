import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa'; // Import the phone icon
 
const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 w-full pb-20">
    <div className="max-w-8xl mx-auto px-0"> {/* Remove px-5 to eliminate extra left space */}
      {/* Company Info */}
      <div className="mb-4 w-full sm:flex sm:flex-col sm:justify-center md:justify-start md:ml-[35px] text-center sm:text-center md:text-left">
  <h2 className="text-xl font-bold text-yellow-500">Company Logo & Company Name</h2>
  <p className="text-gray-400">Company Motto</p>
</div>

 
        {/* Footer Links Section - Evenly Spaced Columns */}
        {/* Footer Links Section - Always Centered */}
   {/* Footer Links Section - Centered Columns */}
<div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-10 ml-0 lg:ml-28">
  {/* About ABC */}
  <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-start sm:text-left">
    <h3 className="text-lg font-bold text-white">About ABC</h3>
    <ul className="mt-2 space-y-1 list-disc list-inside">
      <li><a href="/" className="hover:text-gray-400">About Us</a></li>
      <li><a href="/" className="hover:text-gray-400">Career</a></li>
      <li><a href="/" className="hover:text-gray-400">Privacy Policy</a></li>
    </ul>
  </div>

  {/* Partners */}
  <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-start  sm:text-left">
    <h3 className="text-lg font-bold text-white">Partners</h3>
    <ul className="mt-2 space-y-1 list-disc list-inside">
      <li><a href="/" className="hover:text-gray-400">Home Loan</a></li>
      <li><a href="/" className="hover:text-gray-400">Home Interiors</a></li>
      <li><a href="/" className="hover:text-gray-400">Builders</a></li>
    </ul>
  </div>

  {/* Resources */}
  <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-start sm:text-left">
    <h3 className="text-lg font-bold text-white">Resources</h3>
    <ul className="mt-2 space-y-1 list-disc list-inside">
      <li><a href="/" className="hover:text-gray-400">Home Buying Guides</a></li>
      <li><a href="/" className="hover:text-gray-400">Blogs</a></li>
      <li><a href="/" className="hover:text-gray-400">RERA</a></li>
    </ul>
  </div>
</div>

      </div>
 
      {/* Book Consultation - Centered */}
      <div className="flex justify-center items-center py-6 border-b border-gray-400 xl:mb-10 lg:mb-10 md:border-b pb-2md:border-gray-700 md:mb:10 mb-10">
        <FaPhoneAlt className="text-red-500 text-lg mr-2 lg:-ml-10" /> {/* Phone icon */}
        <span className="text-white text-lg font-semibold ">Book Consultation</span>
      </div>
    </footer>
  );
};
 
export default Footer;