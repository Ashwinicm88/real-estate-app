
import React, { useState } from 'react';
import { FaCalculator, FaHome, FaMap } from 'react-icons/fa'; // Import icons
// import FollowUp from './FollowUp';
import { useNavigate } from 'react-router-dom';
import HomeAffordabilityCalculator from '../Components/HomeAffordibility';
 
const Services = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/search-result');// Navigate to the search result page
  };
  const handleOwnershipClick = () => {
    navigate('/cost-of-ownership');
  };

  return (
    <>
     {/* Modal */}
     {showCalculator && (
      <HomeAffordabilityCalculator onClose={() => setShowCalculator(false)} />
    )}
    <div className="w-full bg-black text-white">
      {/* Header */}
      {/* <h2 className="text-lg text-yellow-500 font-semibold mb-1 sm:text-sm  md:pl-20 md:text-lg">Discover Our Services</h2> */}
      {/* <div className="pl-6 md:pl-20"> */}
      <div className="pl-2">
         <h2 className="text-lg text-yellow-500 font-semibold mb-1 sm:text-sm md:text-lg">
         Discover Our Services
       </h2>
      </div>

      {/* Services Sections */}
      <div className="max-w-8xl  flex justify-between items-center px-4 gap-x-2 md:gap-x-6 "> {/* Adjusted gap */}
        {/* Service Item 1 */}
        <div className="w-1/4 text-center p-4 rounded-lg relative " onClick={() => setShowCalculator(true)}>
          <div className="flex flex-col items-center">
            <FaCalculator className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
            <span className="hidden md:block hover:text-yellow-500 cursor-pointer">Home Affordability Calculator</span> {/* Show text on medium screens and larger */}
            <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
          </div>
        </div>
 
        {/* Service Item 2 */}
        <div className="w-1/4 text-center p-4 rounded-lg relative"  onClick={handleOwnershipClick}>
          <div className="flex flex-col items-center">
            <FaHome className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
            <span className="hidden md:block hover:text-yellow-500 cursor-pointer">True Cost of Ownership</span> {/* Show text on medium screens and larger */}
            <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
          </div>
        </div>
 
        {/* Service Item 3 */}
        <div className="w-1/4 text-center p-4 rounded-lg relative"  onClick={handleClick}>
          <div className="flex flex-col items-center">
            <FaMap className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
            <span className="hidden md:block hover:text-yellow-500 cursor-pointer">Discover Property Map</span> {/* Show text on medium screens and larger */}
            <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
          </div>
        </div>
 
        {/* Follow Up Section 
        <div className="w-1/4 text-center p-4 rounded-lg relative">
          <FollowUp />
        </div>*/}
      </div>
    
</div>
</>
  );
};
 
export default Services;

// import React, { useState } from 'react';
// import { FaCalculator, FaHome, FaMap } from 'react-icons/fa'; // Import icons
// import { useNavigate } from 'react-router-dom';
// import HomeAffordabilityCalculator from '../Components/HomeAffordibility';

// const Services = () => {
//   const [showCalculator, setShowCalculator] = useState(false);
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/search-result'); // Navigate to the search result page
//   };

//   const handleOwnershipClick = () => {
//     navigate('/cost-of-ownership');
//   };
//   const handleClose = () => {
//     console.log("Close button clicked");
//     setShowCalculator(false);
//   };

//   return (
//     <>
//       {/* Modal */}
//       {showCalculator && (
//         <HomeAffordabilityCalculator onClose={handleClose} />
//       )}
//       <div className="w-full bg-black text-white">
//         {/* Header */}
//         <div className="pl-6 md:pl-20">
//           <h2 className="text-lg text-yellow-500 font-semibold mb-1 sm:text-sm md:text-lg">
//             Discover Our Services
//           </h2>
//         </div>

//         {/* Services Sections */}
//         <div className="max-w-8xl flex justify-between items-center px-4 gap-x-2 md:gap-x-6 pl-6">
//           {/* Service Item 1 */}
//           <div className="w-1/4 text-center p-4 rounded-lg relative" onClick={() => setShowCalculator(true)}>
//             <div className="flex flex-col items-center">
//               <FaCalculator className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
//               <span className="hidden md:block">Home Affordability Calculator</span> {/* Show text on medium screens and larger */}
//               <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
//             </div>
//           </div>

//           {/* Service Item 2 */}
//           <div className="w-1/4 text-center p-4 rounded-lg relative" onClick={handleOwnershipClick}>
//             <div className="flex flex-col items-center">
//               <FaHome className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
//               <span className="hidden md:block">True Cost of Ownership</span> {/* Show text on medium screens and larger */}
//               <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
//             </div>
//           </div>

//           {/* Service Item 3 */}
//           <div className="w-1/4 text-center p-4 rounded-lg relative" onClick={handleClick}>
//             <div className="flex flex-col items-center">
//               <FaMap className="text-3xl mb-2 md:hidden" /> {/* Show icon on mobile */}
//               <span className="hidden md:block">Discover Property Map</span> {/* Show text on medium screens and larger */}
//               <p className='text-sm text-gray-400 mt-2 hidden md:block'>Your trusted partner in luxury real estate.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Services;
