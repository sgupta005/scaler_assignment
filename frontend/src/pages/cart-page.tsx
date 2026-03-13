import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/cart-context';
import { CartItemRow } from '../features/cart/cart-item-row';
import { PriceDetails } from '../features/cart/price-details';

export function CartPage() {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 py-16">
        <ShoppingCart size={80} className="text-gray-200" strokeWidth={1} />
        <h2 className="text-xl font-semibold text-gray-700">Your cart is empty!</h2>
        <p className="text-sm text-gray-500">Add items to it now.</p>
        <Link
          to="/products"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2.5 rounded transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 px-3">
      <div className="flex gap-4 items-start">
        {/* Cart items */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {cart.items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Price details sidebar */}
        <div className="w-72 shrink-0">
          <PriceDetails cart={cart} />
        </div>
      </div>
    </div>
  );
}
