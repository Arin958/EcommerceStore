import React from "react";
import { ChevronUp as FiChevronUp, ChevronDown as FiChevronDown } from "lucide-react";

const SortFilter = ({ 
  expanded, 
  toggleSection, 
  activeFilters, 
  handleFilterChange 
}) => {
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("sort")}
      >
        <h3 className="font-medium text-gray-900">Sort By</h3>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {expanded && (
        <select
          value={activeFilters.sortBy || "newest"}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="mt-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
          <option value="popular">Most Popular</option>
        </select>
      )}
    </div>
  );
};

export default SortFilter;