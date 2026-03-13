import { Trash2, BookmarkPlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { CartItem } from '../../types/cart';
import { useCart } from '../../context/cart-context';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQty, removeItem } = useCart();
  const navigate = useNavigate();
  const { product } = item;

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  const maxQty = Math.min(product.stock, 10);
  const qtyOptions = Array.from({ length: maxQty }, (_, i) => i + 1);

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="shrink-0"
        >
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            className="w-24 h-24 object-contain rounded border border-gray-100"
          />
        </button>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="text-left"
          >
            <p className="text-sm text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </p>
          </button>

          {product.brand && (
            <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              ₹{(product.price * item.quantity).toLocaleString('en-IN')}
            </span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{(product.mrp * item.quantity).toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {discount}% off
                </span>
              </>
            )}
          </div>
          {item.quantity > 1 && (
            <p className="text-xs text-gray-400 mt-0.5">
              ₹{product.price.toLocaleString('en-IN')} × {item.quantity}
            </p>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-3">
            <label className="text-sm text-gray-600">Qty:</label>
            <select
              value={item.quantity}
              onChange={(e) => updateQty(item.id, Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-blue-400"
            >
              {qtyOptions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center border-t border-gray-100 mt-4 pt-3 gap-1">
        <button
          onClick={() => removeItem(item.id)}
          className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 size={15} />
          <span>Remove</span>
        </button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
          <BookmarkPlus size={15} />
          <span>Save for later</span>
        </button>
      </div>
    </div>
  );
}
