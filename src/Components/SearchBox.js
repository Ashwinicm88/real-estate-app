import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import Search Icon
 
const SearchBox = () => {
  const placeholderText = "Enter your real estate query";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
 
  // Typewriter Effect
  useEffect(() => {
    if (index < placeholderText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(placeholderText.slice(0, index + 1));
        setIndex(index + 1);
      }, 100); // Adjust speed here
      return () => clearTimeout(timeout);
    }
  }, [index]);
 
  return (
    <div className="flex items-center gap-3 bg-black px-4 py-2 border-b border-gray-300 w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder={displayText}
        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
      />
      <button>
       {/* Search Icon Instead of Button */}
      <FaSearch className="text-white text-xl cursor-pointer hover:text-yellow-400 transition" />
 
      </button>
    </div>
  );
};
 
export default SearchBox;