import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronLeft as FiChevronLeft,
  ChevronRight as FiChevronRight,
} from "lucide-react";

// Move slides data outside the component to prevent recreation
const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Summer Collection",
    subtitle: "50% Off Everything",
    cta: "Shop Now",
    textColor: "text-white",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "New Arrivals",
    subtitle: "Discover Our Latest Styles",
    cta: "Explore",
    textColor: "text-gray-900",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Limited Time Offer",
    subtitle: "Free Shipping on Orders Over $50",
    cta: "View Collection",
    textColor: "text-white",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoize slide content to prevent unnecessary re-renders
  const currentSlideData = useMemo(() => SLIDES[currentSlide], [currentSlide]);

  // Use useCallback to memoize the slide handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Background Slides */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            {/* Preload the next image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              loading={index === currentSlide ? "eager" : "lazy"}
              // Add width and height attributes for CLS improvement
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Content - Memoize this part if possible */}
      <div
        className={`relative z-10 h-full flex items-center px-6 sm:px-12 lg:px-24 ${currentSlideData.textColor}`}
      >
        <div className="max-w-2xl space-y-6">
          <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            Limited Time Offer
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            {currentSlideData.title}
          </h1>
          <p className="text-xl sm:text-2xl opacity-90">
            {currentSlideData.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              {currentSlideData.cta}
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 p-3 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 p-3 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white mt-2 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);