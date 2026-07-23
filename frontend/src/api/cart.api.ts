import api from './axios';
import { Cart, CartItem, ApiResponse } from '../types';

export const getCart = () =>
  api.get<ApiResponse<Cart>>('/cart');

export const addToCart = (productId: string, quantity: number) =>
  api.post<ApiResponse<CartItem>>('/cart', { productId, quantity });

export const updateCartItem = (id: string, quantity: number) =>
  api.put<ApiResponse<CartItem>>(`/cart/${id}`, { quantity });

export const removeFromCart = (id: string) =>
  api.delete<ApiResponse<void>>(`/cart/${id}`);