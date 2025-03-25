import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuLeft(rect.left);
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md w-full">
      <div className="max-w-[86rem] mx-auto w-[92%] sm:w-[88%] lg:w-[94%] py-4 border-b border-zinc-50">
        <div className="flex items-center justify-between relative w-full">
          {/* Left: Hamburger Menu + App Name */}
          <div className="flex items-center gap-4 relative w-full sm:w-auto" ref={menuButtonRef}>
            <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <span className="text-lg sm:text-xl font-semibold text-yellow-500">Casa</span>
          </div>

          {/* Center: Logo/Icon (Hidden on Small Screens) */}
          <div className="hidden lg:block text-xl font-bold">ICON</div>

          {/* Right: Book Consultation */}
          <button className="flex items-center gap-2 text-yellow-400 hover:underline text-sm sm:text-base">
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
          <a href="#home" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#add-property" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Add Property</a>
          <a href="#services" className="text-white hover:text-yellow-400 border-b border-[#333] pb-2" onClick={() => setMenuOpen(false)}>Our Services</a>
          <a href="#rera" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>RERA Link</a>
          <a href="#about-us" className="text-white hover:text-yellow-400 pb-2" onClick={() => setMenuOpen(false)}>About us</a>
        </div>
      )}
    </header>
  );
};

export default Header;
