import type { Address } from './address';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null;
  productName: string;
  productImage: string | null;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  addressId: string | null;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  totalAmount: number;
  placedAt: string;
  updatedAt: string;
  items: OrderItem[];
  address: Address | null;
}
