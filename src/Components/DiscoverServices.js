import React from 'react';
import { FaCalculator, FaHome, FaMap } from 'react-icons/fa'; // Import icons
import FollowUp from './FollowUp';
 
const Services = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black text-white shadow-lg">
      {/* Header */}
      <h2 className="text-lg text-yellow-500 font-semibold mb-1 pl-5">Discover Our Services</h2>
 
      {/* Services Sections */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 gap-x-4 md:gap-x-6"> {/* Adjusted gap */}
        {/* Service Item 1 */}
        <div className="w-1/4 text-center p-4 rounded-lg relative">
          <div className="flex flex-col items-center">
            <FaCalculator className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
            <span className="hidden md:block">Home Affordability Calculator</span> {/* Show text on medium screens and larger */}
            <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
          </div>
        </div>
 
        {/* Service Item 2 */}
        <div className="w-1/4 text-center p-4 rounded-lg relative">
          <div className="flex flex-col items-center">
            <FaHome className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
            <span className="hidden md:block">True Cost of Ownership</span> {/* Show text on medium screens and larger */}
            <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
          </div>
        </div>
 
        {/* Service Item 3 */}
        <div className="w-1/4 text-center p-4 rounded-lg relative">
          <div className="flex flex-col items-center">
            <FaMap className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
            <span className="hidden md:block">Discover Property Map</span> {/* Show text on medium screens and larger */}
            <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
          </div>
        </div>
 
        {/* Follow Up Section */}
        <div className="w-1/4 text-center p-4 rounded-lg relative">
          <FollowUp />
        </div>
      </div>
    </div>
  );
};
 
export default Services;