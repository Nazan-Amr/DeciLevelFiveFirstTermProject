import api from './axios';
import { User, ApiResponse } from '../types';

export const register = (email: string, password: string, name: string) =>
  api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', { email, password, name });

export const login = (email: string, password: string) =>
  api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', { email, password });

export const getMe = () =>
  api.get<ApiResponse<User>>('/auth/me');

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};