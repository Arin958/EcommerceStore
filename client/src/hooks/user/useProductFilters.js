// src/hooks/useProductFilters.js
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilteredProducts } from '../../services/productFilterService';


export const useProductFilters = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Convert URLSearchParams to plain object
        const params = Object.fromEntries(searchParams.entries());
        const { products, filters } = await getFilteredProducts(params);
        setProducts(products);
        setFilters(filters);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return { products, filters, loading, error };
};