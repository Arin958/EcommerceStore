import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAllProductsAdmin, updateProduct } from "../../store/Admin/productAdmin";


export const useProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsPerPage = 8;
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productAdmin);

  useEffect(() => {
    dispatch(fetchAllProductsAdmin());
  }, [dispatch]);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = (formData) => {
    dispatch(updateProduct({ id: selectedProduct._id, formData }))
      .unwrap()
      .then(() => {
        dispatch(fetchAllProductsAdmin());
        setShowEditModal(false);
      });
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    : []
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openConfirmModal = (productId) => {
    setSelectedProductId(productId);
    setShowConfirmModal(true);
  };

  const closeEditModal = () => {
  setShowEditModal(false);
  setSelectedProduct(null);
};


  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedProductId(null);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      dispatch(deleteProduct(selectedProductId)).then(() => {
        dispatch(fetchAllProductsAdmin());
      });
    }
    closeConfirmModal();
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    showConfirmModal,
    showEditModal,
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
    closeEditModal
  };
};