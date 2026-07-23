import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

export const useCart = () => {
  const { isAuthenticated } = useAuthStore();
  const { cart, isLoading, fetchCart, addToCart, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return { cart, isLoading, itemCount, addToCart, updateQuantity, removeItem, fetchCart };
};