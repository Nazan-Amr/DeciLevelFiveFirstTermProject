import { create } from 'zustand';
import { Cart, CartItem } from '../types';
import * as cartApi from '../api/cart.api';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const { data } = await cartApi.getCart();
      set({ cart: data.data });
    } finally {
      set({ isLoading: false });
    }
  },
  addToCart: async (productId, quantity) => {
    await cartApi.addToCart(productId, quantity);
    await get().fetchCart();
  },
  updateQuantity: async (id, quantity) => {
    if (quantity <= 0) {
      await cartApi.removeFromCart(id);
    } else {
      await cartApi.updateCartItem(id, quantity);
    }
    await get().fetchCart();
  },
  removeItem: async (id) => {
    await cartApi.removeFromCart(id);
    await get().fetchCart();
  }
}));