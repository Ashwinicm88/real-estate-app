import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa'; // Import the phone icon

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 w-full min-h-[500px]">
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Company Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-yellow-400">Company Logo & Company Name</h2>
          <p className="text-gray-400">Company Motto</p>
        </div>

        {/* Footer Links Section - Evenly Spaced Columns */}
        <div className="flex flex-wrap justify-between">
          {/* About ABC */}
          <div className="w-full sm:w-auto">
            <h3 className="text-lg font-bold text-yellow-400">About ABC</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5">  {/* Added list-disc and pl-5 */}
              <li><a href="/" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/" className="hover:text-gray-400">Career</a></li>
              <li><a href="/" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Partners */}
          <div className="w-full sm:w-auto">
            <h3 className="text-lg font-bold text-yellow-400">Partners</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5">  {/* Added list-disc and pl-5 */}
              <li><a href="/" className="hover:text-gray-400">Home Loan</a></li>
              <li><a href="/" className="hover:text-gray-400">Home Interiors</a></li>
              <li><a href="/" className="hover:text-gray-400">Builders</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-full sm:w-auto">
            <h3 className="text-lg font-bold text-yellow-400">Resources</h3>
            <ul className="mt-2 space-y-1 list-disc pl-5">  {/* Added list-disc and pl-5 */}
              <li><a href="/" className="hover:text-gray-400">Home Buying Guides</a></li>
              <li><a href="/" className="hover:text-gray-400">Blogs</a></li>
              <li><a href="/" className="hover:text-gray-400">RERA</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Book Consultation - Centered */}
      <div className="flex justify-center items-center py-6 border-t border-gray-700">
        <FaPhoneAlt className="text-red-500 text-lg mr-2" /> {/* Phone icon */}
        <span className="text-white text-lg font-semibold">Book Consultation</span>
      </div>
    </footer>
  );
};

export default Footer;
