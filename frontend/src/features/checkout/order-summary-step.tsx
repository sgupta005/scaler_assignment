import { MapPin } from 'lucide-react';
import type { Address } from '../../types/address';
import type { Cart } from '../../types/cart';

interface OrderSummaryStepProps {
  address: Address;
  cart: Cart;
  orderError: string;
  onChangeAddress: () => void;
}

export function OrderSummaryStep({
  address,
  cart,
  orderError,
  onChangeAddress,
}: OrderSummaryStepProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Address summary */}
      <div className="bg-white border border-gray-200 rounded-sm px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={15} className="text-blue-600 shrink-0" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Deliver to:
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap ml-5">
              <span className="font-semibold text-gray-800">{address.fullName}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium uppercase tracking-wide">
                {address.type}
              </span>
            </div>
            <p className="text-sm text-gray-700 ml-5 mt-0.5">
              {address.line1}, {address.line2}
              {address.landmark ? `, ${address.landmark}` : ''}, {address.city},{' '}
              {address.state} {address.pincode}
            </p>
            <p className="text-sm text-gray-600 ml-5">{address.phone}</p>
          </div>
          <button
            onClick={onChangeAddress}
            className="text-sm text-blue-600 font-medium hover:underline shrink-0 ml-4"
          >
            Change
          </button>
        </div>
      </div>

      {/* Cart items */}
      <div className="bg-white border border-gray-200 rounded-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Order Summary</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {cart.items.map((item) => {
            const mrp = item.product.mrp ?? item.product.price;
            const discountPct =
              mrp > item.product.price
                ? Math.round(((mrp - item.product.price) / mrp) * 100)
                : 0;
            return (
              <div key={item.id} className="flex gap-4 px-6 py-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain shrink-0 border border-gray-100 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.product.name}
                  </p>
                  {item.product.brand && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.product.brand}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {discountPct > 0 && (
                      <span className="text-xs text-green-600 font-medium">↓{discountPct}%</span>
                    )}
                    {mrp > item.product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-gray-800">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {orderError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3">
          {orderError}
        </div>
      )}
    </div>
  );
}
