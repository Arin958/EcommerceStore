import React, { useState, useEffect } from "react";
import {
  ChevronUp as FiChevronUp,
  ChevronDown as FiChevronDown,
} from "lucide-react";

const PriceFilter = ({
  expanded,
  toggleSection,
  priceInputs,
  handleFilterChange,
  minPrice = 0,
  maxPrice = 1000,
}) => {
  const [range, setRange] = useState([
    priceInputs.minPrice || minPrice,
    priceInputs.maxPrice || maxPrice,
  ]);
  const [activeThumb, setActiveThumb] = useState(null);

  // Sync with parent component's state
  useEffect(() => {
    setRange([
      priceInputs.minPrice || minPrice,
      priceInputs.maxPrice || maxPrice,
    ]);
  }, [priceInputs.minPrice, priceInputs.maxPrice, minPrice, maxPrice]);

  const handleSliderChange = (e, thumb) => {
    const value = parseInt(e.target.value);
    
    if (thumb === "min") {
      const newMin = Math.min(value, range[1]);
      setRange([newMin, range[1]]);
      handleFilterChange("minPrice", newMin);
    } else {
      const newMax = Math.max(value, range[0]);
      setRange([range[0], newMax]);
      handleFilterChange("maxPrice", newMax);
    }
  };

  const handleInputChange = (type, value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    if (type === "min") {
      const newMin = Math.min(numValue, range[1]);
      setRange([newMin, range[1]]);
      handleFilterChange("minPrice", newMin);
    } else {
      const newMax = Math.max(numValue, range[0]);
      setRange([range[0], newMax]);
      handleFilterChange("maxPrice", newMax);
    }
  };

  const calculateLeftPosition = (value) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("price")}
      >
        <h3 className="font-medium text-gray-900">Price Range</h3>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {expanded && (
        <div className="mt-3 space-y-3">
          {/* Custom Range Slider */}
          <div className="relative h-10 px-2">
            {/* Track */}
            <div className="absolute top-1/2 h-1 w-full bg-gray-200 rounded-full -translate-y-1/2"></div>
            
            {/* Active Range */}
            <div
              className="absolute top-1/2 h-1 bg-indigo-500 rounded-full -translate-y-1/2"
              style={{
                left: `${calculateLeftPosition(range[0])}%`,
                right: `${100 - calculateLeftPosition(range[1])}%`,
              }}
            ></div>
            
            {/* Thumb for Min Price */}
            <div
              className="absolute top-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full -translate-y-1/2 -translate-x-1/2 cursor-pointer"
              style={{ left: `${calculateLeftPosition(range[0])}%` }}
              onMouseDown={() => setActiveThumb("min")}
              onTouchStart={() => setActiveThumb("min")}
            ></div>
            
            {/* Thumb for Max Price */}
            <div
              className="absolute top-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full -translate-y-1/2 -translate-x-1/2 cursor-pointer"
              style={{ left: `${calculateLeftPosition(range[1])}%` }}
              onMouseDown={() => setActiveThumb("max")}
              onTouchStart={() => setActiveThumb("max")}
            ></div>
            
            {/* Hidden Input Range for better accessibility */}
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={range[0]}
              onChange={(e) => handleSliderChange(e, "min")}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={range[1]}
              onChange={(e) => handleSliderChange(e, "max")}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Input Fields */}
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              min={minPrice}
              max={maxPrice}
              value={range[0]}
              onChange={(e) => handleInputChange("min", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              min={minPrice}
              max={maxPrice}
              value={range[1]}
              onChange={(e) => handleInputChange("max", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Price Indicators */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;