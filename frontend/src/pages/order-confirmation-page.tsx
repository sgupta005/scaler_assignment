import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { CheckCircle, Loader2, Package, MapPin } from 'lucide-react';
import { fetchOrder } from '../api/orders';
import type { Order } from '../types/order';

export function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;
    fetchOrder(orderId)
      .then(setOrder)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Could not load order'),
      )
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-red-600 font-medium">{error || 'Order not found'}</p>
        <Link to="/products" className="text-blue-600 hover:underline text-sm">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalSaved = Number(order.discount);

  return (
    <div className="py-4 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {/* Success banner */}
        <div className="bg-white border border-gray-200 rounded-sm px-6 py-6 flex flex-col items-center text-center gap-3">
          <CheckCircle size={56} className="text-green-500" strokeWidth={1.5} />
          <h1 className="text-xl font-bold text-gray-800">
            Order Placed Successfully!
          </h1>
          <p className="text-sm text-gray-600">
            Your order has been confirmed and will be delivered soon.
          </p>
          <div className="mt-1 bg-gray-50 border border-gray-200 rounded px-5 py-3 w-full">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              Order ID
            </p>
            <p className="text-base font-mono font-semibold text-gray-800 break-all">
              {order.id}
            </p>
          </div>
          {totalSaved > 0 && (
            <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded w-full text-center">
              You saved ₹{totalSaved.toLocaleString('en-IN')} on this order!
            </div>
          )}
        </div>

        {/* Delivery address */}
        {order.address && (
          <div className="bg-white border border-gray-200 rounded-sm px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-blue-600" />
              <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                Delivering to
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800">
                {order.address.fullName}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium uppercase tracking-wide">
                {order.address.type}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              {order.address.line1}, {order.address.line2}
              {order.address.landmark
                ? `, ${order.address.landmark}`
                : ''}, {order.address.city}, {order.address.state}{' '}
              {order.address.pincode}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              {order.address.phone}
            </p>
          </div>
        )}

        {/* Order items */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Package size={16} className="text-gray-500" />
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Items Ordered
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 px-6 py-4 items-center">
                {item.productImage && (
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-14 h-14 object-contain shrink-0 border border-gray-100 rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.productName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-800 shrink-0">
                  ₹{Number(item.subtotal).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="px-6 py-3 border-t border-gray-200 flex justify-between font-bold text-gray-900">
            <span>Total Amount Paid</span>
            <span>
              ₹{(Number(order.totalAmount) + 7).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to="/orders"
            className="flex-1 text-center bg-white border border-blue-500 text-blue-600 font-semibold py-3 rounded-sm hover:bg-blue-50 transition-colors text-sm"
          >
            View All Orders
          </Link>
          <Link
            to="/products"
            className="flex-1 text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
