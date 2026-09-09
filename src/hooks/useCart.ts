import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '@/types';

const CART_STORAGE_KEY = 'hb_cart_v1';

function readCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

function writeCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage may be unavailable (private browsing, quota) — fail silently.
  }
}

const cartLineKey = (productId: string, weight: string) => `${productId}__${weight}`;

/**
 * Core cart state, backed by localStorage. Exposed to the app through
 * CartContext so any component can read/update the cart without prop drilling.
 */
export function useCartState() {
  const [items, setItems] = useState<CartItem[]>(() => readCartFromStorage());

  useEffect(() => {
    writeCartToStorage(items);
  }, [items]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((prev) => {
      const key = cartLineKey(item.productId, item.weight);
      const existingIndex = prev.findIndex((i) => cartLineKey(i.productId, i.weight) === key);

      if (existingIndex !== -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, weight: string) => {
    setItems((prev) => prev.filter((i) => cartLineKey(i.productId, i.weight) !== cartLineKey(productId, weight)));
  }, []);

  const updateQuantity = useCallback((productId: string, weight: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => cartLineKey(i.productId, i.weight) !== cartLineKey(productId, weight));
      }
      return prev.map((i) =>
        cartLineKey(i.productId, i.weight) === cartLineKey(productId, weight) ? { ...i, quantity } : i
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const getCartItemCount = useCallback(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(() => getCartTotal(), [getCartTotal]);
  const cartItemCount = useMemo(() => getCartItemCount(), [getCartItemCount]);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    cartTotal,
    cartItemCount,
  };
}

export type CartState = ReturnType<typeof useCartState>;
