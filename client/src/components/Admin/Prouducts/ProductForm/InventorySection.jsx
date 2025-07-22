import React from "react";

const InventorySection = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stock*</label>
        <input 
          type="number" 
          name="stock" 
          value={formData.stock} 
          onChange={handleChange} 
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">SKU*</label>
        <input 
          name="sku" 
          value={formData.sku} 
          onChange={handleChange} 
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
        <input 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
        <input 
          name="brand" 
          value={formData.brand} 
          onChange={handleChange} 
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
        />
      </div>
    </div>
  );
};

export default InventorySection;