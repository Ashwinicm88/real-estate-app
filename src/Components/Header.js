import React from "react";
import { FaBars } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
<<<<<<< HEAD
 
const Header = () => {
  return (
    // <header className="flex items-center justify-between p-4 border-b border-zinc-50 text-white bg-black">
    //   {/* Left: Always Visible Hamburger Menu */}
    //   <button className="text-white">
    //     <FaBars size={24} />
    //   </button>
 
    //   {/* Center: Logo/Icon */}
    //   <div className="text-xl font-bold">ICON</div>
 
    //   {/* Right: Book Consultation */}
    //   <button className="flex items-center gap-2 text-yellow-400 hover:underline">
    //     <IoCalendarOutline size={20} />
    //     Book Consultation
    //   </button>
    // </header>
    <header className="flex items-center justify-between p-4 border-b border-zinc-50 text-white bg-black">
  {/* Left: Hamburger Menu + App Name */}
  <div className="flex items-center gap-4">
    <button className="text-white">
      <FaBars size={24} />
    </button>
    <span className="text-lg sm:text-xl font-semibold text-yellow-500">Casa</span>
  </div>
 
  {/* Center: Logo/Icon (Hidden on Small Screens) */}
  <div className="hidden sm:block text-xl font-bold">ICON</div>
 
  {/* Right: Book Consultation */}
  <button className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-base">
    <IoCalendarOutline size={20} />
    Book Consultation
  </button>
</header>
 
  );
};
 
export default Header;
=======

const Header = () => {
  return (
    // <header className="flex items-center justify-between p-4 border-b border-zinc-50 text-white bg-black">
    //   {/* Left: Always Visible Hamburger Menu */}
    //   <button className="text-white">
    //     <FaBars size={24} />
    //   </button>

    //   {/* Center: Logo/Icon */}
    //   <div className="text-xl font-bold">ICON</div>

    //   {/* Right: Book Consultation */}
    //   <button className="flex items-center gap-2 text-yellow-400 hover:underline">
    //     <IoCalendarOutline size={20} />
    //     Book Consultation
    //   </button>
    // </header>
    <header className="flex items-center justify-between p-4 border-b border-zinc-50 text-white bg-black">
  {/* Left: Hamburger Menu + App Name */}
  <div className="flex items-center gap-4">
    <button className="text-white">
      <FaBars size={24} />
    </button>
    <span className="text-lg sm:text-xl font-semibold text-yellow-500">Casa</span>
  </div>

  {/* Center: Logo/Icon (Hidden on Small Screens) */}
  <div className="hidden sm:block text-xl font-bold">ICON</div>

  {/* Right: Book Consultation */}
  <button className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-base">
    <IoCalendarOutline size={20} />
    Book Consultation
  </button>
</header>

  );
};

export default Header;
>>>>>>> Gmap
