import React from 'react';
import FollowUp from './FollowUp';

const Services = () => {
  return (
    <div className="fixed bottom-0  w-full bg-black text-white shadow-lg ">
      {/* Header */}
      <h2 className="text-lg text-yellow-500 font-semibold mb-2">Discover Our Services</h2>

      {/* Services Sections */}
      <div className="max-w-7xl mx-auto flex justify-start items-center px-6 gap-x-10 pl-16">
        <div className="w-1/3 text-center p-4 rounded-lg">Home Affordibility Calculator
        <p className='text-sm text-gray-400 mt-2'>Your trusted partner in luxury real estate. Find your dream property with ease.</p>
        </div>
        <div className="w-1/3 text-center p-4  rounded-lg">True Cost of Ownership
        <p className='text-sm text-gray-400 mt-2'>Your trusted partner in luxury real estate. Find your dream property with ease.</p>
        </div>
        <div className="w-1/3 text-center p-4 rounded-lg">Discover Property Map
        <p className='text-sm text-gray-400 mt-2'>Your trusted partner in luxury real estate. Find your dream property with ease.</p>
        </div>
        <div className="text-center p-4 rounded-lg"><FollowUp/></div>
      </div>
    </div>
  );
};

export default Services;
