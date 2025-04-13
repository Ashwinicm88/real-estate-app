
// import React, { useState, useRef, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import BookConsultation from "./BookConsultation"; 
 
// const Header = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [menuLeft, setMenuLeft] = useState(0);
//   const [servicesOpen, setServicesOpen] = useState(false); // State for submenu
//   const [timeoutId, setTimeoutId] = useState(null); // State for timeout ID
//   const menuButtonRef = useRef(null);
//   const servicesRef = useRef(null); // Ref for the services button
//   const navigate = useNavigate(); // Use useNavigate here

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const isAdmin = user && user.role === "ADMIN";
//  // Initialize navigate function

//   useEffect(() => {
//     if (menuButtonRef.current) {
//       const rect = menuButtonRef.current.getBoundingClientRect();
//       setMenuLeft(rect.left);
//     }
//   }, [menuOpen]);

//   // ✅ Logout Function
//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Remove user session
//     setMenuOpen(false); // Close menu
//     navigate("/admin-login"); // Redirect to login page
//     window.location.reload(); // Refresh the page
//   };
  

//   // Handle mouse enter and leave for the services submenu
//   const handleMouseEnter = () => {
//     clearTimeout(timeoutId); // Clear any existing timeout
//     setServicesOpen(true);
//   };

//   const handleMouseLeave = () => {
//     // Set a timeout to close the submenu after a delay
//     const id = setTimeout(() => {
//       setServicesOpen(false);
//     }, 200); // Adjust the delay as needed (200ms here)
//     setTimeoutId(id); // Store the timeout ID
//   };

//   return (
//     <>
//     <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md w-full">
//       <div className="max-w-[86rem] mx-auto w-[92%] sm:w-[88%] lg:w-[94%] py-4 border-b border-zinc-50">
//         <div className="flex items-center justify-between relative w-full">
//           {/* Left: Hamburger Menu + App Name */}
//           <div className="flex items-center gap-4 relative w-full sm:w-auto" ref={menuButtonRef}>
//             <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//             <span className="text-lg sm:text-xl text-center font-semibold text-yellow-500">Casa</span>
//           </div>

//           {/* Center: Logo/Icon (Hidden on Small Screens) */}
//           <div className="hidden lg:block text-xl font-bold absolute left-1/2 transform -translate-x-1/2">ICON</div>

//           {/* Right: Book Consultation */}
//           {/* <button
//               onClick={() => setShowModal(true)}
//               className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-sm"
//             >
//               <IoCalendarOutline size={20} />
//               Book Consultation
//             </button> */}
//             <button
//   onClick={() => setShowModal(true)}
//   className="flex items-center whitespace-nowrap gap-2 text-yellow-400 hover:underline text-sm sm:text-sm"
// >
//   <IoCalendarOutline size={20} />
//   Book Consultation
// </button>

          
//         </div>
//       </div>

//       {/* Responsive Menu - Positioned Directly Below Menu Icon */}
//       {menuOpen && (
//         <div
//           className="absolute top-full bg-black bg-opacity-60 backdrop-blur-md p-4 flex flex-col gap-2 border border-[#334] shadow-lg text-sm sm:text-base md:text-lg lg:text-xl w-auto min-w-[150px] z-50 font-size:15px"
//           style={{ left: `${menuLeft}px`, right: "auto" }}
//         >
//           <a href="/Realestate-home" className="text-white hover:text-yellow-400  pb-2" onClick={() => setMenuOpen(false)}>Home</a>
//           {/* <Link to="/all-stagedata" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Add Property</Link> */}
//           {/* <a href="#admin" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Admin</a> */}
           
//           <div 
//               className="relative group inline-block"
//               onMouseEnter={handleMouseEnter} // Show submenu on hover
//               onMouseLeave={handleMouseLeave} // Hide submenu on mouse leave
//               ref={servicesRef}
//             >
//               <button
//                 className="text-white hover:text-yellow-400 pb-2 flex items-center gap-1"
//               >
//                 Our Services
//                 <span className={`text-xs transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}></span>
//               </button>

//               {/* Submenu Dropdown */}
//               {servicesOpen && (
//                 <div className="absolute top-0 left-full ml-4 bg-black bg-opacity-60 backdrop-blur-md p-3 flex flex-col gap-2 border border-[#334] shadow-lg text-sm sm:text-base md:text-lg lg:text-xl w-auto min-w-[150px] z-50">
//                   <Link to="/home-affordability-calculator" className="text-white hover:text-yellow-400 pb-1" onClick={() => setMenuOpen(false)}>Affordability Calculator</Link>
//                   <Link to="/cost-of-ownership" className="text-white hover:text-yellow-400 pb-1" onClick={() => setMenuOpen(false)}>Cost of Ownership</Link>
//                   <Link to="/search-result" className="text-white hover:text-yellow-400 pb-1" onClick={() => setMenuOpen(false)}>Discover Property Map</Link>
//                 </div>
//               )}
//             </div>

//           <a href="#about-us" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>About us</a>
                    

//            {/* Admin-Specific Links */}
//           {isAdmin ? (
//             <>
//               <Link to="/all-stagedata" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Add Property</Link>
//               <Link to="/admin-panel" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
//               <Link to ="/admin-consultation-list" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Consultation List</Link>
//               <Link to ="/update-appointment/:id" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Admin Appointment</Link>
//               <button className="text-red-500 hover:text-red-700 pb-2" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/admin-login" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Admin</Link>
//           )}
//         </div>
//       )}
//     </header>
//     {/* Show Modal if showModal is true */}
//     {showModal && <BookConsultation onClose={() => setShowModal(false)} />}
//     </>
//   );
// };
 
// export default Header;

import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import BookConsultation from "./BookConsultation"; 
import HomeAffordabilityCalculator from '../Components/HomeAffordibility';
 
const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false); // State for submenu
  const [timeoutId, setTimeoutId] = useState(null); // State for timeout ID
  const [showCalculator, setShowCalculator] = useState(false);
  const menuButtonRef = useRef(null);
  const servicesRef = useRef(null); // Ref for the services button
  const navigate = useNavigate(); // Use useNavigate here

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user && user.role === "ADMIN";
 // Initialize navigate function

  useEffect(() => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuLeft(rect.left);
    }
  }, [menuOpen]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user session
    setMenuOpen(false); // Close menu
    navigate("/admin-login"); // Redirect to login page
    window.location.reload(); // Refresh the page
  };
  

  // Handle mouse enter and leave for the services submenu
  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any existing timeout
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to close the submenu after a delay
    const id = setTimeout(() => {
      setServicesOpen(false);
    }, 200); // Adjust the delay as needed (200ms here)
    setTimeoutId(id); // Store the timeout ID
  };

  return (
    <>
     {/* Modal */}
     {showCalculator && (
      <HomeAffordabilityCalculator onClose={() => setShowCalculator(false)} />
    )}
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md w-full">
      <div className="max-w-[86rem] mx-auto w-[92%] sm:w-[88%] lg:w-[94%] py-4 border-b border-zinc-50">
        <div className="flex items-center justify-between relative w-full">
          {/* Left: Hamburger Menu + App Name */}
          <div className="flex items-center gap-4 relative w-full sm:w-auto" ref={menuButtonRef}>
            <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <span className="text-lg sm:text-xl text-center font-semibold text-yellow-500">Casa</span>
          </div>

          {/* Center: Logo/Icon (Hidden on Small Screens) */}
          <div className="hidden lg:block text-xl font-bold absolute left-1/2 transform -translate-x-1/2">ICON</div>

          {/* Right: Book Consultation */}
          {/* <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-sm"
            >
              <IoCalendarOutline size={20} />
              Book Consultation
            </button> */}
            <button
  onClick={() => setShowModal(true)}
  className="flex items-center whitespace-nowrap gap-2 text-yellow-400 hover:underline text-sm sm:text-sm"
>
  <IoCalendarOutline size={20} />
  Book Consultation
</button>

          
        </div>
      </div>

      {/* Responsive Menu - Positioned Directly Below Menu Icon */}
      {menuOpen && (
        <div
          className="absolute top-full bg-black bg-opacity-60 backdrop-blur-md p-4 flex flex-col gap-2 border border-[#334] shadow-lg text-sm sm:text-base md:text-lg lg:text-xl w-auto min-w-[150px] z-50 font-size:15px"
          style={{ left: `${menuLeft}px`, right: "auto" }}
        >
          <a href="/Realestate-home" className="text-white hover:text-yellow-400  pb-2" onClick={() => setMenuOpen(false)}>Home</a>
          {/* <Link to="/all-stagedata" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Add Property</Link> */}
          {/* <a href="#admin" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Admin</a> */}
           
          <div 
              className="relative group inline-block"
              onMouseEnter={handleMouseEnter} // Show submenu on hover
              onMouseLeave={handleMouseLeave} // Hide submenu on mouse leave
              ref={servicesRef}
            >
              <button
                className="text-white hover:text-yellow-400 pb-2 flex items-center gap-1"
              >
                Our Services
                <span className={`text-xs transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}></span>
              </button>

              {/* Submenu Dropdown */}
              {servicesOpen && (
                <div className="absolute top-0 left-full ml-4 bg-black bg-opacity-60 backdrop-blur-md p-3 flex flex-col gap-2 border border-[#334] shadow-lg text-sm sm:text-base md:text-lg lg:text-xl w-auto min-w-[150px] z-50">
                

                 <button
  className="text-white hover:text-yellow-400 pb-1 text-left"
  onClick={() => {
    setShowCalculator(true);
    setMenuOpen(false);
  }}
>
  Affordability Calculator
</button>

                  <Link to="/cost-of-ownership" className="text-white hover:text-yellow-400 pb-1" onClick={() => setMenuOpen(false)}>Cost of Ownership</Link>
                  <Link to="/search-result" className="text-white hover:text-yellow-400 pb-1" onClick={() => setMenuOpen(false)}>Discover Property Map</Link>
                </div>
              )}
            </div>

          <a href="#about-us" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>About us</a>
                    

           {/* Admin-Specific Links */}
          {isAdmin ? (
            <>
              <Link to="/all-stagedata" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Add Property</Link>
              <Link to="/admin-panel" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
              <Link to ="/admin-consultation-list" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Consultation List</Link>
              <Link to ="/update-appointment/:id" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Admin Appointment</Link>
              <button className="text-red-500 hover:text-red-700 pb-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin-login" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>Admin</Link>
          )}
        </div>
      )}
    </header>
    {/* Show Modal if showModal is true */}
    {showModal && <BookConsultation onClose={() => setShowModal(false)} />}
    </>
  );
};
 
export default Header;

