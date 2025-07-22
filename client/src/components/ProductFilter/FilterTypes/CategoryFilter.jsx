import React from "react";
import { ChevronUp as FiChevronUp, ChevronDown as FiChevronDown } from "lucide-react";

const CategoryFilter = ({ 
  categories, 
  expanded, 
  toggleSection, 
  isFilterActive, 
  toggleArrayFilter 
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("categories")}
      >
        <h3 className="font-medium text-gray-900">Categories</h3>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {expanded && (
        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={isFilterActive("category", category)}
                onChange={() => toggleArrayFilter("category", category)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;