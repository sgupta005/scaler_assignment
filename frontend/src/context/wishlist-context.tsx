import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { WishlistItem } from '../types/wishlist';
import {
  fetchWishlist,
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
} from '../api/wishlist';
import { useAuth } from './auth-context';

interface WishlistContextValue {
  items: WishlistItem[];
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    fetchWishlist()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items],
  );

  const addToWishlist = useCallback(async (productId: string) => {
    const updated = await apiAddToWishlist(productId);
    setItems(updated);
  }, []);

  const removeFromWishlist = useCallback(async (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    try {
      const updated = await apiRemoveFromWishlist(productId);
      setItems(updated);
    } catch (err) {
      const serverItems = await fetchWishlist().catch(() => null);
      if (serverItems) setItems(serverItems);
      console.error('Failed to remove from wishlist', err);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        itemCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
