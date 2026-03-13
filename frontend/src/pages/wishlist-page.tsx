import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, ShoppingCart, Zap, Trash2, Package } from 'lucide-react';
import { useWishlist } from '../context/wishlist-context';
import { useCart } from '../context/cart-context';
import { useAuth } from '../context/auth-context';

export function WishlistPage() {
  const { user } = useAuth();
  const { items, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [actionLoading, setActionLoading] = useState<Record<string, string>>({});

  function setLoading(productId: string, action: string | null) {
    setActionLoading((prev) => {
      if (action === null) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: action };
    });
  }

  async function handleRemove(productId: string) {
    setLoading(productId, 'remove');
    try {
      await removeFromWishlist(productId);
    } finally {
      setLoading(productId, null);
    }
  }

  async function handleAddToCart(productId: string) {
    setLoading(productId, 'cart');
    try {
      await addToCart(productId, 1);
      navigate('/cart');
    } finally {
      setLoading(productId, null);
    }
  }

  async function handleBuyNow(productId: string) {
    setLoading(productId, 'buy');
    try {
      await addToCart(productId, 1);
      navigate('/checkout');
    } finally {
      setLoading(productId, null);
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
        <Heart size={56} className="text-gray-300" strokeWidth={1.5} />
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Please log in to view your wishlist</h2>
          <p className="text-sm text-gray-500 mt-1">
            Save items you love and come back to them anytime.
          </p>
        </div>
        <Link
          to="/login"
          className="bg-[#2874f0] hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
        <Heart size={56} className="text-gray-300" strokeWidth={1.5} />
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mt-1">
            Save your favourite items here and shop them later.
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
    <div className="py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          My Wishlist{' '}
          <span className="text-base font-normal text-gray-500">({items.length} item{items.length !== 1 ? 's' : ''})</span>
        </h1>

        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const { product } = item;
            const currentAction = actionLoading[product.id];
            const discount =
              product.mrp && product.mrp > product.price
                ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                : null;

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Product image — click to go to detail page */}
                <Link
                  to={`/products/${product.id}`}
                  className="shrink-0 flex items-center justify-center w-full sm:w-40 h-40 border-b sm:border-b-0 sm:border-r border-gray-100 bg-white hover:bg-gray-50 transition-colors"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-3"
                    />
                  ) : (
                    <Package size={40} className="text-gray-300" />
                  )}
                </Link>

                {/* Product details */}
                <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                  <div>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2 leading-snug transition-colors"
                    >
                      {product.name}
                    </Link>
                    {product.brand && (
                      <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mt-1">
                        {product.brand}
                      </p>
                    )}

                    <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            {discount}% off
                          </span>
                        </>
                      )}
                    </div>

                    <p className={`text-xs font-medium mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0 || !!currentAction}
                      className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded text-sm transition-colors"
                    >
                      <ShoppingCart size={15} />
                      {currentAction === 'cart' ? 'Adding…' : 'Add to Cart'}
                    </button>

                    <button
                      onClick={() => handleBuyNow(product.id)}
                      disabled={product.stock === 0 || !!currentAction}
                      className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-semibold px-4 py-2 rounded text-sm transition-colors"
                    >
                      <Zap size={15} />
                      {currentAction === 'buy' ? 'Processing…' : 'Buy Now'}
                    </button>

                    <button
                      onClick={() => handleRemove(product.id)}
                      disabled={!!currentAction}
                      className="flex items-center gap-1.5 border border-gray-300 hover:border-red-300 hover:text-red-500 text-gray-500 font-medium px-4 py-2 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={15} />
                      {currentAction === 'remove' ? 'Removing…' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
