import React from "react";
import { useProductManagement } from "../../hooks/admin/userProductManagement";
import SearchFilter from "../../components/Admin/Prouducts/SearchFilter";
import ProductTable from "../../components/Admin/Prouducts/ProductTable";
import Pagination from "../../components/Admin/Prouducts/Pagination";
import ProductModal from "../../components/Admin/Prouducts/model/ProductModal";
import DeleteConfirmationModal from "../../components/Admin/Prouducts/DeleteConfirmationModal";
import ProductHeader from "../../components/Admin/Prouducts/ProductHeader";

const AdminProductPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    showConfirmModal,
    showEditModal,
    setShowEditModal,
    selectedProduct,
    currentProducts,
    filteredProducts,
    productsPerPage,
    indexOfFirstProduct,
    indexOfLastProduct,
    totalPages,
    loading,
    error,
    openEditModal,
    handleUpdateProduct,
    paginate,
    openConfirmModal,
    closeConfirmModal,
    confirmDelete,
    closeEditModal,
  } = useProductManagement();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <ProductHeader />
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <ProductTable
            currentProducts={currentProducts}
            openEditModal={openEditModal}
            openConfirmModal={openConfirmModal}
            indexOfFirstProduct={indexOfFirstProduct}
            indexOfLastProduct={indexOfLastProduct}
            filteredProducts={filteredProducts}
          />

          {filteredProducts.length > productsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              indexOfFirstProduct={indexOfFirstProduct}
              indexOfLastProduct={indexOfLastProduct}
              filteredProducts={filteredProducts}
            />
          )}
        </div>

        {/* Edit Product Modal */}
        {showEditModal && selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeEditModal}
            onSubmit={handleUpdateProduct}
          />
        )}

        <DeleteConfirmationModal
          showConfirmModal={showConfirmModal}
          closeConfirmModal={closeConfirmModal}
          confirmDelete={confirmDelete}
        />
      </div>
    </div>
  );
};

export default AdminProductPage;
