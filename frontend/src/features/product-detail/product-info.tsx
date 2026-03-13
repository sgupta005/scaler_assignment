import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import type { ProductDetail } from '../../types/products';
import { SpecificationsTable } from './specifications-table';

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <div className="flex flex-col gap-5">
      {product.brand && (
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          {product.brand}
        </p>
      )}

      <h1 className="text-2xl font-bold text-gray-900 leading-snug">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl font-bold text-gray-900">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        {product.mrp && product.mrp > product.price && (
          <>
            <span className="text-lg text-gray-400 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
            <span className="text-base font-semibold text-green-600">
              {discount}% off
            </span>
          </>
        )}
      </div>

      <p
        className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}
      >
        {product.stock > 0
          ? `In Stock (${product.stock} left)`
          : 'Out of Stock'}
      </p>

      <div className="flex gap-3 pt-1">
        <button
          disabled={product.stock === 0}
          className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors"
        >
          Add to Cart
        </button>
        <button
          disabled={product.stock === 0}
          className="flex-1 rounded-xl bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 transition-colors"
        >
          Buy Now
        </button>
      </div>

      <div className="flex gap-4 pt-2 flex-wrap text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <Truck size={15} className="text-blue-500" />
          <span>Free Delivery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <RotateCcw size={15} className="text-blue-500" />
          <span>7-Day Returns</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={15} className="text-blue-500" />
          <span>1 Year Warranty</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {product.description && (
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            Description
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      <SpecificationsTable specs={product.specifications} />
    </div>
  );
}
