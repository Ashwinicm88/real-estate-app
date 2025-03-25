import React, { useState, useEffect } from "react";
 
const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  // Show popup when the page loads
  useEffect(() => {
    setIsOpen(true);
  }, []);
 
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          {/* Popup Box */}
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[400px] max-w-[90%] min-h-[250px] flex flex-col items-center justify-center relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-black text-lg font-bold hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
 
            {/* Popup Content */}
            <h2 className="text-2xl font-bold mb-2">Welcome to Casa</h2>
            <p className="text-center text-gray-600">Your trusted partner in luxury real estate.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePopup;
