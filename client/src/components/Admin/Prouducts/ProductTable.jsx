import React from "react";
import { Edit as FiEdit, Trash2 as FiTrash2, Box as FaBoxOpen } from "lucide-react";

const ProductTable = ({ 
  currentProducts, 
  openEditModal, 
  openConfirmModal,
  indexOfFirstProduct,
  indexOfLastProduct,
  filteredProducts
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                      {product.images?.[0] && (
                        <img 
                        loadng="lazy"
                          src={product.images[0].url} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">ID: {product._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      product.isActive
                        ? "bg-green-100 text-green-800"
                        : product.stock === 0
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {product.isActive
                      ? "Active"
                      : product.stock === 0
                      ? "Out of Stock"
                      : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-full hover:bg-indigo-50 transition-colors"
                      title="Edit"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openConfirmModal(product._id)}
                      className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <FaBoxOpen className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-sm">Try adjusting your search or add a new product</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;