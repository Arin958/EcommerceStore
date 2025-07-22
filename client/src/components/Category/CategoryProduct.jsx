import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryProducts } from "../../store/User/productUser";
import ProductCard from "../Product/ProductCard";
import { ArrowLeft as FiArrowLeft, ChevronDown as FiChevronDown } from "lucide-react";

const CategoryProduct = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryProducts } = useSelector((state) => state.productUser);
  const [sortOption, setSortOption] = useState("default");
  const [sortedProducts, setSortedProducts] = useState([]);

  const products = categoryProducts?.products || [];

  useEffect(() => {
    dispatch(fetchCategoryProducts(category));
  }, [category, dispatch]);

  useEffect(() => {
    // Apply sorting whenever products or sortOption changes
    let result = [...products];
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "default":
      default:
        // Keep original order
        break;
    }
    setSortedProducts(result);
  }, [products, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with back button */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Categories
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {category.replace(/-/g, " ")}
            </h1>
            <p className="text-gray-500 mt-2">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              available
            </p>
          </div>

          {/* Sorting dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white cursor-pointer"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                className="transform transition-all hover:scale-[1.02] hover:shadow-lg"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center py-16">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-700 mb-3">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any products in this category.
            </p>
            <button
              onClick={() => navigate("/categories")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Categories
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
