import React from "react";
import { X as FiX } from "lucide-react";

const OptionsSection = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-wrap gap-6 bg-gray-50 p-5 rounded-lg border border-gray-100">
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input 
            type="checkbox" 
            name="isFeatured" 
            checked={formData.isFeatured} 
            onChange={handleChange} 
            className="sr-only" 
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            formData.isFeatured 
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent" 
              : "border-gray-300 bg-white"
          }`}>
            {formData.isFeatured && <FiX className="text-white text-xs" />}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700">Featured Product</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input 
            type="checkbox" 
            name="isActive" 
            checked={formData.isActive} 
            onChange={handleChange} 
            className="sr-only" 
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            formData.isActive 
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent" 
              : "border-gray-300 bg-white"
          }`}>
            {formData.isActive && <FiX className="text-white text-xs" />}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700">Active</span>
      </label>
    </div>
  );
};

export default OptionsSection;