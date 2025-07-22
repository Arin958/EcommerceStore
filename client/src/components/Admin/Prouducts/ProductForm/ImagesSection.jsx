import React from "react";
import { Upload as FiUpload, X as FiX } from "lucide-react";

const ImagesSection = ({ previewImages, setPreviewImages, handleChange }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
      <div className="relative">
        <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-purple-50 transition-colors">
          <div className="p-3 rounded-full bg-purple-100 mb-3">
            <FiUpload className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          <input 
            type="file" 
            name="images" 
            multiple 
            onChange={handleChange} 
            className="hidden" 
            accept="image/*"
          />
        </label>
      </div>
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {previewImages.map((src, i) => (
            <div key={i} className="relative group">
              <img 
                src={src} 
                alt={`Preview ${i}`} 
                className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm" 
              />
              <button 
                type="button" 
                onClick={() => {
                  const newPreviews = [...previewImages];
                  newPreviews.splice(i, 1);
                  setPreviewImages(newPreviews);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesSection;