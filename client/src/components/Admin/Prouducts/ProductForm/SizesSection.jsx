import React from "react";
import { sizeOptions } from "../../../../utils/admin/constants";


const SizesSection = ({ formData, handleSizeChange }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-3">Available Sizes</label>
      <div className="flex flex-wrap gap-2">
        {sizeOptions.map(size => (
          <button
            type="button"
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              formData.sizes.includes(size) 
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-md" 
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizesSection;