import React from "react";
import {
  ChevronUp as FiChevronUp,
  ChevronDown as FiChevronDown,
} from "lucide-react";

const PriceFilter = ({
  expanded,
  toggleSection,
  priceInputs,
  handleFilterChange,
}) => {
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
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceInputs.minPrice}
              onChange={(e) => {
                handleFilterChange("minPrice", e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceInputs.maxPrice}
              onChange={(e) => {
                handleFilterChange("maxPrice", e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
