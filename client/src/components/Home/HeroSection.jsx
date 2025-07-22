import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronLeft as FiChevronLeft,
  ChevronRight as FiChevronRight,
} from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    title: "Summer Collection",
    subtitle: "50% Off Everything",
    cta: "Shop Now",
    overlay: "bg-gradient-to-r from-indigo-900/70 to-purple-900/70",
    textColor: "text-white",
    buttonPrimary: "bg-white text-indigo-600 hover:bg-gray-100",
    buttonSecondary: "border-white text-white hover:bg-white/10"
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    title: "New Arrivals",
    subtitle: "Discover Our Latest Styles",
    cta: "Explore",
    overlay: "bg-gradient-to-r from-indigo-600/70 to-purple-600/70",
    textColor: "text-white",
    buttonPrimary: "bg-white text-indigo-600 hover:bg-gray-100",
    buttonSecondary: "border-white text-white hover:bg-white/10"
  },
  {
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d",
    title: "Limited Time Offer",
    subtitle: "Free Shipping on Orders Over $50",
    cta: "View Collection",
    overlay: "bg-gradient-to-r from-indigo-800/70 to-purple-800/70",
    textColor: "text-white",
    buttonPrimary: "bg-white text-indigo-600 hover:bg-gray-100",
    buttonSecondary: "border-white text-white hover:bg-white/10"
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideData = useMemo(() => SLIDES[currentSlide], [currentSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
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
            className={`absolute top-0 left-0 w-full h-full ${slide.overlay}`}
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              loading={index === currentSlide ? "eager" : "lazy"}
              width="1920"
              height="1080"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex items-center px-6 sm:px-12 lg:px-24 ${currentSlideData.textColor}`}>
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
            <button className={`px-8 py-3 font-bold rounded-full transition-all transform hover:scale-105 shadow-lg ${currentSlideData.buttonPrimary}`}>
              {currentSlideData.cta}
            </button>
            <button className={`px-8 py-3 border-2 font-bold rounded-full transition-all transform hover:scale-105 ${currentSlideData.buttonSecondary}`}>
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
        <FiChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 p-3 bg-white/30 backdrop-blur-sm rounded-full hover:bg-white/50 transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} className="text-white" />
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
    </section>
  );
};

export default React.memo(HeroSection);