import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Cart } from '../types/cart';
import {
  fetchCart,
  addItemToCart,
  updateCartItemQty,
  removeCartItem,
} from '../api/cart';

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQty: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart()
      .then(setCart)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    const updated = await addItemToCart(productId, quantity);
    setCart(updated);
  }, []);

  const updateQty = useCallback(async (itemId: string, quantity: number) => {
    // Optimistic update — apply immediately so the UI feels instant
    setCart((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i,
        ),
      };
    });

    try {
      const updated = await updateCartItemQty(itemId, quantity);
      setCart(updated);
    } catch (err) {
      // Roll back to server state on failure
      const serverCart = await fetchCart().catch(() => null);
      if (serverCart) setCart(serverCart);
      console.error('Failed to update quantity', err);
    }
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    // Optimistic update — remove immediately
    setCart((prev) => {
      if (!prev) return prev;
      return { ...prev, items: prev.items.filter((i) => i.id !== itemId) };
    });

    try {
      const updated = await removeCartItem(itemId);
      setCart(updated);
    } catch (err) {
      const serverCart = await fetchCart().catch(() => null);
      if (serverCart) setCart(serverCart);
      console.error('Failed to remove item', err);
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart((prev) => (prev ? { ...prev, items: [] } : prev));
  }, []);

  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQty, removeItem, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
