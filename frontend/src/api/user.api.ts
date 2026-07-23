import api from './axios';
import { User, ApiResponse } from '../types';

export const getUsers = () =>
  api.get<ApiResponse<User[]>>('/users');

export const getUserStats = () =>
  api.get<ApiResponse<{
    totalUsers: number;
    totalCustomers: number;
    totalAdmins: number;
    totalOrders: number;
  }>>('/users/stats');