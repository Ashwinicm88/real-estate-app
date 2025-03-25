import React from 'react';
import { FaCalculator, FaHome, FaMap } from 'react-icons/fa'; // Import icons
import FollowUp from './FollowUp';
 
const Services = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black text-white shadow-lg lg:mt-10">
      {/* Header */}
      <h2 className="text-lg text-yellow-500 font-semibold mb-1 pl-9 am:pl-0 xl:ml-14">Discover Our Services</h2>
 
      {/* Services Sections */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center px-0 lg:gap-x-14 lg:-ml-8 xl:gap-x-40 gap-y-0 sm:ml-10 md:-ml-10 md:mr-10 md:gap-x-4 xl:ml-20 xl:ml-16 ">
      {/* Mobile View Icons Row */}
  <div className="w-full flex justify-center gap-6 sm:hidden sm:ml-4">
    <FaCalculator className="text-3xl" />
    <FaHome className="text-3xl" />
    <FaMap className="text-3xl" />
  </div>

  {/* Service Item 1 */}
  <div className="w-full sm:w-1/4 text-center p-4 rounded-lg hidden sm:block">
    <div className="flex flex-col items-center">
      <span className="hidden md:block">Home Affordability Calculator</span>
      <p className="text-sm text-gray-400 mt-2 hidden md:block">
        Your trusted partner in luxury real estate.
      </p>
    </div>
  </div>

  {/* Service Item 2 */}
  <div className="w-full sm:w-1/4 text-center p-4 rounded-lg hidden sm:block ">
    <div className="flex flex-col items-center">
      <span className="hidden md:block">True Cost of Ownership</span>
      <p className="text-sm text-gray-400 mt-2 hidden md:block">
        Your trusted partner in luxury real estate.
      </p>
    </div>
  </div>

  {/* Service Item 3 */}
  <div className="w-full sm:w-1/4 text-center p-4 rounded-lg hidden sm:block">
    <div className="flex flex-col items-center">
      <span className="hidden md:block">Discover Property Map</span>
      <p className="text-sm text-gray-400 mt-2 hidden md:block">
        Your trusted partner in luxury real estate.
      </p>
    </div>
  </div>

  {/* Follow Up Section */}
  <div className="w-full sm:w-1/4 text-center p-4 rounded-lg">
    <FollowUp />
  </div>
</div>

</div>
  );
};
 
export default Services;