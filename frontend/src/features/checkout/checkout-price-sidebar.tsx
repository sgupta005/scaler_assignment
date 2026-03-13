import { ChevronDown, ChevronUp, Loader2, ShieldCheck } from 'lucide-react';

interface CheckoutPriceSidebarProps {
  originalTotal: number;
  discount: number;
  totalAmount: number;
  onAction: () => void;
  actionLabel: string;
  actionLoading?: boolean;
}

export function CheckoutPriceSidebar({
  originalTotal,
  discount,
  totalAmount,
  onAction,
  actionLabel,
  actionLoading,
}: CheckoutPriceSidebarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden sticky top-20">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Price Details
        </span>
        <ChevronUp size={18} className="text-gray-400" />
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        <div className="flex justify-between text-sm text-gray-700">
          <span>MRP</span>
          <span>₹{originalTotal.toLocaleString('en-IN')}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Discounts</span>
            <span className="text-green-600 font-medium flex items-center gap-1">
              <ChevronDown size={14} />₹{discount.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-700">
          <span>Fees</span>
          <span>₹7</span>
        </div>

        <hr className="border-gray-100" />

        <div className="flex justify-between font-bold text-gray-900">
          <span>Total Amount</span>
          <span>₹{(totalAmount + 7).toLocaleString('en-IN')}</span>
        </div>

        {discount > 0 && (
          <div className="bg-green-50 text-green-700 text-sm text-center font-medium py-2 rounded">
            You'll save ₹{discount.toLocaleString('en-IN')} on this order!
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-5 py-3 border-t border-gray-100">
        <ShieldCheck size={18} className="text-gray-400 shrink-0" />
        <p className="text-xs text-gray-500">
          Safe and Secure Payments. Easy returns. 100% Authentic products.
        </p>
      </div>

      <div className="px-5 pb-4">
        <button
          onClick={onAction}
          disabled={actionLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {actionLoading && <Loader2 size={16} className="animate-spin" />}
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
