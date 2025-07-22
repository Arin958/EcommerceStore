import React from "react";
import { Plus as FiPlus, X as FiX } from "lucide-react";

const ColorsSection = ({ 
  formData, 
  colorInput, 
  setColorInput, 
  handleAddColor, 
  removeColor 
}) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-3">Colors</label>
      <div className="flex gap-3 mb-3">
        <input 
          value={colorInput} 
          onChange={(e) => setColorInput(e.target.value)} 
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          placeholder="Enter color name" 
        />
        <button 
          type="button" 
          onClick={handleAddColor} 
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-md"
        >
          <FiPlus /> Add
        </button>
      </div>
      {formData.colors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formData.colors.map(color => (
            <div 
              key={color} 
              className="px-3 py-1.5 rounded-full bg-white border border-gray-200 flex items-center gap-2 shadow-sm"
            >
              <span className="text-sm">{color}</span>
              <button 
                type="button" 
                onClick={() => removeColor(color)} 
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorsSection;