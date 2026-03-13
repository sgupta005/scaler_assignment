import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Loader2, ShoppingBag } from 'lucide-react';
import { fetchOrders } from '../api/orders';
import type { Order } from '../types/order';
import { OrderCard } from '../features/order-history/order-card';

export function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Could not load orders'),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <p className="text-red-600 font-medium">{error}</p>
        <Link to="/products" className="text-blue-600 hover:underline text-sm">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
        <ShoppingBag size={56} className="text-gray-300" strokeWidth={1.5} />
        <div>
          <h2 className="text-lg font-semibold text-gray-700">No orders yet</h2>
          <p className="text-sm text-gray-500 mt-1">
            Looks like you haven't placed any orders.
          </p>
        </div>
        <Link
          to="/products"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded text-sm transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-4">My Orders</h1>
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
