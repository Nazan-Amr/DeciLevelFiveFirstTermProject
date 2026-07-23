import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { getMe } from '../api/auth.api';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await getMe();
          setUser(data.data);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [setUser, setLoading, logout]);

  return { user, isAuthenticated, isLoading, isAdmin: user?.role === 'ADMIN', logout };
};