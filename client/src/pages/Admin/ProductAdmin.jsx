import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { FixedSizeList as List } from 'react-window';
import { useProductManagement } from "../../hooks/admin/userProductManagement";
import SearchFilter from "../../components/Admin/Prouducts/SearchFilter";
import Pagination from "../../components/Admin/Prouducts/Pagination";
import ProductHeader from "../../components/Admin/Prouducts/ProductHeader";

// Lazy load heavy modal components
const ProductModal = lazy(() => import("../../components/Admin/Prouducts/model/ProductModal"));
const DeleteConfirmationModal = lazy(() => import("../../components/Admin/Prouducts/DeleteConfirmationModal"));

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

  // Debounce search term to reduce filtering during typing
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Memoized filtered products
  const memoizedFilteredProducts = useMemo(() => {
    return filteredProducts;
  }, [filteredProducts]);

  // Optimize scrolling performance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add('scrolling');
      } else {
        document.body.classList.remove('scrolling');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Virtualized row renderer with image support
  const Row = useCallback(({ index, style }) => {
    const product = currentProducts[index];
   
    
    return (
      <div 
        style={style}
        className={`flex items-center border-b border-gray-100 hover:bg-gray-50 transition-colors ${
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
        }`}
      >
        <div className="w-1/12 px-4 py-3 text-sm text-gray-600">{index + 1}</div>
        
        <div className="w-3/12 px-4 py-3 flex items-center">
          {/* Optimized image with lazy loading */}
          <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden mr-3">
            <img
              src={product.images[0].url|| '/placeholder-product.jpg'}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder-product.jpg';
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 truncate">
            {product.name}
          </span>
        </div>
        
        <div className="w-2/12 px-4 py-3 text-sm text-gray-600">${product.price}</div>
        <div className="w-2/12 px-4 py-3 text-sm text-gray-600">{product.stock}</div>
        <div className="w-2/12 px-4 py-3 text-sm text-gray-600 truncate">
          {product.category}
        </div>
        <div className="w-2/12 px-4 py-3 text-sm text-gray-600 flex space-x-2">
          <button
            onClick={() => openEditModal(product)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => openConfirmModal(product.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }, [currentProducts, openEditModal, openConfirmModal]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <ProductHeader />
        
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Table Header - Adjusted for image column */}
          <div className="flex bg-gray-100 border-b border-gray-200">
            <div className="w-1/12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">#</div>
            <div className="w-3/12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">Product</div>
            <div className="w-2/12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">Price</div>
            <div className="w-2/12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stock</div>
            <div className="w-2/12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">Category</div>
            <div className="w-2/12 px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</div>
          </div>

          {/* Virtualized Table Body */}
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading products...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <List
              height={600}
              itemCount={currentProducts.length}
              itemSize={70} // Increased row height for images
              width="100%"
              className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {Row}
            </List>
          )}
        </div>

        {/* Pagination */}
        {memoizedFilteredProducts.length > productsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            indexOfFirstProduct={indexOfFirstProduct}
            indexOfLastProduct={indexOfLastProduct}
            filteredProducts={memoizedFilteredProducts}
          />
        )}

        {/* Edit Product Modal */}
        <Suspense fallback={null}>
          {showEditModal && selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={closeEditModal}
              onSubmit={handleUpdateProduct}
            />
          )}
        </Suspense>

        {/* Delete Confirmation Modal */}
        <Suspense fallback={null}>
          <DeleteConfirmationModal
            showConfirmModal={showConfirmModal}
            closeConfirmModal={closeConfirmModal}
            confirmDelete={confirmDelete}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(AdminProductPage);