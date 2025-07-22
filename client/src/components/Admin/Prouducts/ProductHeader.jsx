import React from "react";

import { Link } from "react-router-dom";

import { Plus as FiPlus, Box as FaBoxOpen } from "lucide-react";

const ProductHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center">
        <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md mr-4">
          <FaBoxOpen className="text-white text-2xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products inventory and listings
          </p>
        </div>
      </div>

      <Link
        to="addproduct"
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all"
      >
        <FiPlus className="text-lg" />
        <span>Add Product</span>
      </Link>
    </div>
  );
};

export default ProductHeader;
