import React, { useState, useEffect } from "react";

// Sample images - replace with your own images
const images = [
  "/carouselimage1.jpg",
  "/carouselimage2.png",
  "/carouselimage3.jpg",
  "/carouselimage4.jpg",
  "/carouselimage5.jpg",
  "/carouselimage6.jpg",
  "/carouselimage7.jpg",
  "/carouselimage9.jpg"
];

const FullScreenCarousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto slide change every 3000ms
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Change every 3000ms
      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [currentIndex, isPaused]);

  // Pause the carousel on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Resume the carousel on mouse leave
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2  text-white p-3 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 z-20"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2  text-white p-3 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 z-20"
      >
        &#10095;
      </button>

      {/* Overlay Content (Children) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
};

export default FullScreenCarousel;
