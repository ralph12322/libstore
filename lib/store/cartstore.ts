"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setUserKey: (key: string) => void;
}

let userStorageKey = "cart-storage-default";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existing = get().cart.find((b) => b.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((b) =>
              b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, quantity: 1 }] });
        }
      },

      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),

      clearCart: () => set({ cart: [] }),

      // Dynamically change which key is used for storage
      setUserKey: (key) => {
        userStorageKey = `cart-storage-${key}`;
      },
    }),
    {
      name: userStorageKey,
      storage: createJSONStorage(() => localStorage), // ✅ correct usage
    }
  )
);
