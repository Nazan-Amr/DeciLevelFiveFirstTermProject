import api from './axios';
import { Product, ApiResponse, Pagination } from '../types';

interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export const getProducts = (params?: Record<string, string | number>) =>
  api.get<ApiResponse<ProductsResponse>>('/products', { params });

export const getProduct = (id: string) =>
  api.get<ApiResponse<Product>>(`/products/${id}`);

export const createProduct = (data: FormData) =>
  api.post<ApiResponse<Product>>('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateProduct = (id: string, data: FormData) =>
  api.put<ApiResponse<Product>>(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteProduct = (id: string) =>
  api.delete<ApiResponse<void>>(`/products/${id}`);