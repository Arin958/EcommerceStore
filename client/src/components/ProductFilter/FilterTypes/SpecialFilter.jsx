import React from "react";
import { ChevronUp as FiChevronUp, ChevronDown as FiChevronDown } from "lucide-react";

const SpecialFilter = ({ 
  expanded, 
  toggleSection, 
  activeFilters, 
  handleFilterChange 
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("special")}
      >
        <h3 className="font-medium text-gray-900">Special</h3>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {expanded && (
        <div className="mt-3 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={activeFilters.isFeatured === "true"}
              onChange={(e) =>
                handleFilterChange("isFeatured", e.target.checked ? "true" : "")
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-gray-700">Featured Products</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={activeFilters.newArrivals === "true"}
              onChange={(e) =>
                handleFilterChange("newArrivals", e.target.checked ? "true" : "")
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-gray-700">New Arrivals</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={activeFilters.bestSellers === "true"}
              onChange={(e) =>
                handleFilterChange("bestSellers", e.target.checked ? "true" : "")
              }
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-gray-700">Best Sellers</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default SpecialFilter;