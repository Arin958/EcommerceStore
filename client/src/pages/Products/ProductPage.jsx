// src/pages/ProductsPage.js
import { useSearchParams } from 'react-router-dom';
import { useProductFilters } from '../../hooks/user/useProductFilters';
import ProductFilters from '../../components/ProductFilter/ProductFilter';
import ProductCard from '../../components/Product/ProductCard';
import { Search as FiSearch } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-64 w-full"></div>
    <div className="mt-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

const ProductsPage = () => {
  const { products, filters, error, loading } = useProductFilters(); // Make sure your hook returns loading state
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Get current search and sort values from URL
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'newest';

  // Initialize search input from URL
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Track initial load completion
  useEffect(() => {
    if (!loading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loading, isInitialLoad]);

  // Debounce function for live search
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((searchValue) => {
      const newParams = new URLSearchParams(searchParams);
      if (searchValue) {
        newParams.set('search', searchValue);
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams);
    }, 500),
    [searchParams, setSearchParams]
  );

  // Handle input change with debounced search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearch(value);
  };

  // Sort products based on the sortBy parameter
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.salesCount - a.salesCount;
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Filter products by search query if it exists
  const filteredProducts = sortedProducts.filter(product => 
    searchQuery === '' || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', value);
    setSearchParams(newParams);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - takes 1/4 of the space on desktop */}
        <div className="md:w-1/4">
          <ProductFilters filters={filters} />
        </div>
        
        {/* Product list - takes 3/4 of the space on desktop */}
        <div className="md:w-3/4">
          <div className="mb-6">
            {/* Search Bar with live search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput('');
                    handleSearch('');
                  }}
                  className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {searchQuery 
                    ? `Search results for "${searchQuery}"` 
                    : 'All Products'}
                </h1>
                {!loading ? (
                  <p className="text-gray-600">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                ) : (
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>
                )}
              </div>
              
              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="block p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading && isInitialLoad ? (
              // Show skeleton loaders for initial load
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              // Show actual products when loaded
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          {/* Empty state */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No products available in this category'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;