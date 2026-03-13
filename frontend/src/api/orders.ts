import { apiFetch, authHeaders } from './client';
import type { Order } from '../types/order';
import { getSessionId } from './cart';

export async function placeOrder(addressId: string): Promise<Order> {
  const json = await apiFetch<{ data: { order: Order } }>('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': getSessionId(),
      ...authHeaders(),
    },
    body: JSON.stringify({ addressId }),
  });
  return json.data.order;
}

export async function fetchOrders(): Promise<Order[]> {
  const json = await apiFetch<{ data: { orders: Order[] } }>('/api/orders', {
    headers: authHeaders(),
  });
  return json.data.orders;
}

export async function fetchOrder(orderId: string): Promise<Order> {
  const json = await apiFetch<{ data: { order: Order } }>(`/api/orders/${orderId}`, {
    headers: authHeaders(),
  });
  return json.data.order;
}
