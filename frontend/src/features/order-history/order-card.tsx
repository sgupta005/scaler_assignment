import { Package } from 'lucide-react';
import type { Order, OrderStatus } from '../../types/order';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; dot: string }
> = {
  PENDING: { label: 'Order Pending', color: 'text-yellow-600', dot: 'bg-yellow-500' },
  CONFIRMED: { label: 'Order Confirmed', color: 'text-blue-600', dot: 'bg-blue-500' },
  PROCESSING: { label: 'Processing', color: 'text-blue-600', dot: 'bg-blue-500' },
  SHIPPED: { label: 'Shipped', color: 'text-blue-600', dot: 'bg-blue-500' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'text-blue-600', dot: 'bg-blue-500' },
  DELIVERED: { label: 'Delivered', color: 'text-green-600', dot: 'bg-green-500' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-500', dot: 'bg-red-500' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function OrderCard({ order }: { order: Order }) {
  const status = STATUS_CONFIG[order.status];

  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
      {/* Order header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 gap-4 flex-wrap">
        <div className="flex gap-6">
          <div>
            <p className="uppercase font-semibold tracking-wide mb-0.5">Order Placed</p>
            <p className="text-gray-700 font-medium">{formatDate(order.placedAt)}</p>
          </div>
          <div>
            <p className="uppercase font-semibold tracking-wide mb-0.5">Total</p>
            <p className="text-gray-700 font-medium">
              ₹{Number(order.totalAmount).toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="uppercase font-semibold tracking-wide mb-0.5">Items</p>
            <p className="text-gray-700 font-medium">{order.items.length}</p>
          </div>
        </div>
        <div className="text-right text-gray-400 font-mono text-[11px] hidden sm:block">
          #{order.id.slice(0, 8).toUpperCase()}
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center border border-gray-100 rounded bg-white">
              {item.productImage ? (
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Package size={24} className="text-gray-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                {item.productName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                ₹{Number(item.unitPrice).toLocaleString('en-IN')}
                {item.quantity > 1 && (
                  <span className="ml-1">× {item.quantity}</span>
                )}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className={`flex items-center gap-1 sm:gap-1.5 justify-end ${status.color}`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} />
                <span className="text-xs sm:text-sm font-semibold">{status.label}</span>
              </div>
              {order.status === 'DELIVERED' && (
                <p className="text-xs text-gray-500 mt-0.5">Your item has been delivered</p>
              )}
              {order.status === 'CANCELLED' && (
                <p className="text-xs text-gray-500 mt-0.5">Order was cancelled</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
