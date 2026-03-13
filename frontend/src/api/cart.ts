import { apiFetch } from './client';
import type { Cart } from '../types/cart';

const SESSION_KEY = 'fk_session_id';

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function cartHeaders(): HeadersInit {
  return { 'x-session-id': getSessionId() };
}

export async function fetchCart(): Promise<Cart> {
  const json = await apiFetch<{ data: Cart }>('/api/cart', {
    headers: cartHeaders(),
  });
  return json.data;
}

export async function addItemToCart(productId: string, quantity = 1): Promise<Cart> {
  const json = await apiFetch<{ data: Cart }>('/api/cart/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...cartHeaders() },
    body: JSON.stringify({ productId, quantity }),
  });
  return json.data;
}

export async function updateCartItemQty(itemId: string, quantity: number): Promise<Cart> {
  const json = await apiFetch<{ data: Cart }>(`/api/cart/items/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...cartHeaders() },
    body: JSON.stringify({ quantity }),
  });
  return json.data;
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  const json = await apiFetch<{ data: Cart }>(`/api/cart/items/${itemId}`, {
    method: 'DELETE',
    headers: cartHeaders(),
  });
  return json.data;
}
