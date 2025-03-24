import React from "react";
import { FaBars } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
 
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md">
      {/* <div className="max-w-7xl mx-auto w-[90%] sm:w-[85%] lg:w-[90%] py-4 border-b border-zinc-50"> */}
      <div className="max-w-[85rem] mx-auto w-[92%] sm:w-[88%] lg:w-[92%] py-4 border-b border-zinc-50">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger Menu + App Name */}
          <div className="flex items-center gap-4">
            <button className="text-white">
              <FaBars size={24} />
            </button>
            <span className="text-lg sm:text-xl font-semibold text-yellow-500">
              Casa
            </span>
          </div>
 
          {/* Center: Logo/Icon (Hidden on Small Screens) */}
          <div className="hidden sm:block text-xl font-bold">ICON</div>
 
          {/* Right: Book Consultation */}
          <button className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-base">
            <IoCalendarOutline size={20} />
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
};
 
export default Header;
