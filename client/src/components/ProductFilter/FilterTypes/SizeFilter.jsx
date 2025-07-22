import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";


const SizeFilter = ({
  sizes,
  expanded,
  toggleSection,
  isFilterActive,
  toggleArrayFilter,
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("sizes")}
      >
        <h3 className="font-medium text-gray-900">Sizes</h3>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      {expanded && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleArrayFilter("sizes", size)}
                className={`w-10 h-10 flex items-center justify-center border rounded-lg ${
                  isFilterActive("sizes", size)
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
