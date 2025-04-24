import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImagePreviewModal = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 z-50 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={showPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={showNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            <FaChevronRight size={20} />
          </button>
        )}

        {/* Image Display */}
        <img
          src={images[currentIndex]}
          alt="Preview"
          className="w-full h-auto object-contain rounded-md max-h-[90vh] z-40 transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
