import React from "react";
import { ChevronUp as FiChevronUp, ChevronDown as FiChevronDown } from "lucide-react";

const ColorFilter = ({ 
  colors, 
  expanded, 
  toggleSection, 
  isFilterActive, 
  toggleArrayFilter 
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("colors")}
      >
        <h3 className="font-medium text-gray-900">Colors</h3>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {expanded && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => toggleArrayFilter("colors", color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  isFilterActive("colors", color)
                    ? "ring-2 ring-offset-1 ring-indigo-600"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorFilter;