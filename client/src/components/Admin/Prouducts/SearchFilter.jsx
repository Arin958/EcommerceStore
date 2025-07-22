import React from "react";
import { Search as FiSearch, Filter as FiFilter } from "lucide-react";

const SearchFilter = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products by name or category..."
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <FiFilter />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;