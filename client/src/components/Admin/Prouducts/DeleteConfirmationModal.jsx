import { X } from "lucide-react";
import React from "react";

const DeleteConfirmationModal = ({
  showConfirmModal,
  closeConfirmModal,
  confirmDelete,
}) => {
  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
          <button
            onClick={closeConfirmModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeConfirmModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow hover:from-red-700 hover:to-red-800 transition-all"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
