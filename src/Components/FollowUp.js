import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 text-black p-4 shadow-lg border-yellow-500"
        style={{
          zIndex: 1000, // Ensure it's above other elements
          opacity: 0.9, // Make it slightly transparent
        }}
      >
        <FaArrowUp size={40} className="text-white" />
      </button>
    )
  );
};

export default ScrollToTopButton;
