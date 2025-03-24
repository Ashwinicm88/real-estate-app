import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa'; // Import the phone icon
 
const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 w-full pb-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Company Info */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-xl font-bold text-white">Company Logo & Company Name</h2>
          <p className="text-gray-400">Company Motto</p>
        </div>
 
        {/* Footer Links Section - Evenly Spaced Columns */}
        <div className="flex flex-col sm:flex-row justify-between">
          {/* About ABC */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="text-lg font-bold text-white">About ABC</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><a href="/" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/" className="hover:text-gray-400">Career</a></li>
              <li><a href="/" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>
 
          {/* Partners */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="text-lg font-bold text-white">Partners</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><a href="/" className="hover:text-gray-400">Home Loan</a></li>
              <li><a href="/" className="hover:text-gray-400">Home Interiors</a></li>
              <li><a href="/" className="hover:text-gray-400">Builders</a></li>
            </ul>
          </div>
 
          {/* Resources */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="text-lg font-bold text-white">Resources</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><a href="/" className="hover:text-gray-400">Home Buying Guides</a></li>
              <li><a href="/" className="hover:text-gray-400">Blogs</a></li>
              <li><a href="/" className="hover:text-gray-400">RERA</a></li>
            </ul>
          </div>
        </div>
      </div>
 
      {/* Book Consultation - Centered */}
      <div className="flex justify-center items-center py-6 border-b border-gray-700">
        <FaPhoneAlt className="text-red-500 text-lg mr-2" /> {/* Phone icon */}
        <span className="text-white text-lg font-semibold">Book Consultation</span>
      </div>
    </footer>
  );
};
 
export default Footer;