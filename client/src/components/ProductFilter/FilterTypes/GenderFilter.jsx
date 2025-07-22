import React from "react";
import { ChevronUp as FiChevronUp, ChevronDown as FiChevronDown } from "lucide-react";

const GenderFilter = ({ 
  genders, 
  expanded, 
  toggleSection, 
  isFilterActive, 
  toggleArrayFilter 
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("gender")}
      >
        <h3 className="font-medium text-gray-900">Gender</h3>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {expanded && (
        <div className="mt-3 space-y-2">
          {genders.map((gender) => (
            <label key={gender} className="flex items-center">
              <input
                type="checkbox"
                checked={isFilterActive("gender", gender)}
                onChange={() => toggleArrayFilter("gender", gender)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderFilter;