import api from './axios';
import { Category, ApiResponse } from '../types';

export const getCategories = () =>
  api.get<ApiResponse<Category[]>>('/categories');

export const createCategory = (data: { name: string; slug: string }) =>
  api.post<ApiResponse<Category>>('/categories', data);