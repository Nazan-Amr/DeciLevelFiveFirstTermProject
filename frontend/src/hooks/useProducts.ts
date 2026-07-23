import { useEffect } from 'react';
import { useProductStore } from '../stores/productStore';

export const useProducts = () => {
  const { products, pagination, isLoading, filters, setFilters, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [filters.search, filters.category, filters.minPrice, filters.maxPrice, filters.sortBy, filters.sortOrder, filters.page]);

  return { products, pagination, isLoading, filters, setFilters, fetchProducts };
};