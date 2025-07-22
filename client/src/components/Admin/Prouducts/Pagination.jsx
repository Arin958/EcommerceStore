import React from "react";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  paginate, 
  indexOfFirstProduct, 
  indexOfLastProduct, 
  filteredProducts 
}) => {
  return (
    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-500">
        Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(indexOfLastProduct, filteredProducts.length)}
        </span>{" "}
        of <span className="font-medium">{filteredProducts.length}</span> products
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded-md mx-1 ${
              currentPage === number
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;