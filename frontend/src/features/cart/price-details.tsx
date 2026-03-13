import { ChevronUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Cart } from '../../types/cart';

interface PriceDetailsProps {
  cart: Cart;
}

export function PriceDetails({ cart }: PriceDetailsProps) {
  const navigate = useNavigate();

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const originalTotal = cart.items.reduce((sum, i) => {
    const mrp = i.product.mrp ?? i.product.price;
    return sum + mrp * i.quantity;
  }, 0);

  const discountedTotal = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const discount = originalTotal - discountedTotal;
  const totalAmount = discountedTotal;
  const savings = discount;

  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden md:sticky md:top-20">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Price Details
        </span>
        <ChevronUp size={18} className="text-gray-400" />
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        {/* Price */}
        <div className="flex justify-between text-sm text-gray-700">
          <span>
            Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
          <span>₹{originalTotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Discount</span>
            <span className="text-green-600 font-medium">
              − ₹{discount.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        <hr className="border-gray-100" />

        {/* Total */}
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total Amount</span>
          <span>₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>

        {/* Savings banner */}
        {savings > 0 && (
          <div className="bg-green-50 text-green-700 text-sm text-center font-medium py-2 rounded">
            You will save ₹{savings.toLocaleString('en-IN')} on this order
          </div>
        )}
      </div>

      {/* Safe payments */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-gray-100">
        <ShieldCheck size={18} className="text-gray-400 shrink-0" />
        <p className="text-xs text-gray-500">
          Safe and secure payments. Easy returns. 100% Authentic products.
        </p>
      </div>

      {/* Place Order button */}
      <div className="px-5 pb-4">
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
