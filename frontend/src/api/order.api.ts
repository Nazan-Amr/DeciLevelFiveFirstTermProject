import api from './axios';
import { Order, ApiResponse } from '../types';

export const createOrder = () =>
  api.post<ApiResponse<Order>>('/orders');

export const getOrders = () =>
  api.get<ApiResponse<Order[]>>('/orders');

export const getOrder = (id: string) =>
  api.get<ApiResponse<Order>>(`/orders/${id}`);

export const updateOrderStatus = (id: string, status: string) =>
  api.put<ApiResponse<Order>>(`/orders/${id}/status`, { status });