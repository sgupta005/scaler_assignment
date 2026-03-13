import { apiFetch, authHeaders } from './client';
import type { WishlistItem } from '../types/wishlist';

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const json = await apiFetch<{ data: { items: WishlistItem[] } }>('/api/wishlist', {
    headers: authHeaders(),
  });
  return json.data.items;
}

export async function addToWishlist(productId: string): Promise<WishlistItem[]> {
  const json = await apiFetch<{ data: { items: WishlistItem[] } }>('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ productId }),
  });
  return json.data.items;
}

export async function removeFromWishlist(productId: string): Promise<WishlistItem[]> {
  const json = await apiFetch<{ data: { items: WishlistItem[] } }>(`/api/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return json.data.items;
}
