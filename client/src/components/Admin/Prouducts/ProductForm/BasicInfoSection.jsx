import React from "react";
import { genderOptions } from "../../../../utils/admin/constants";


const BasicInfoSection = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
        <input 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Price*</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
            required 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
          <input 
            type="number" 
            name="discountPrice" 
            value={formData.discountPrice} 
            onChange={handleChange} 
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
          required
        >
          {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
    </div>
  );
};

export default BasicInfoSection;