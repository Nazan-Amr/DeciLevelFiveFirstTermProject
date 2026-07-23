import { create } from 'zustand';
import { Product, Pagination } from '../types';
import * as productApi from '../api/product.api';

interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

interface ProductState {
  products: Product[];
  pagination: Pagination | null;
  currentProduct: Product | null;
  isLoading: boolean;
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  createProduct: (data: FormData) => Promise<void>;
  updateProduct: (id: string, data: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  pagination: null,
  currentProduct: null,
  isLoading: false,
  filters: { page: 1, limit: 12 },
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters, page: newFilters.page || 1 } 
  })),
  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const { data } = await productApi.getProducts(get().filters as Record<string, string | number>);
      set({ products: data.data.products, pagination: data.data.pagination });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProduct: async (id) => {
    try {
      set({ isLoading: true });
      const { data } = await productApi.getProduct(id);
      set({ currentProduct: data.data });
    } finally {
      set({ isLoading: false });
    }
  },
  createProduct: async (formData) => {
    await productApi.createProduct(formData);
    await get().fetchProducts();
  },
  updateProduct: async (id, formData) => {
    await productApi.updateProduct(id, formData);
    await get().fetchProducts();
  },
  deleteProduct: async (id) => {
    await productApi.deleteProduct(id);
    await get().fetchProducts();
  }
}));