import { Link } from 'react-router';
import { Star } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
}

export function ProductCard({ product }: { product: Product }) {
  // Mock 'Buy at' price for demonstration purposes
  const buyAtPrice =
    product.discountedPrice > 2000
      ? product.discountedPrice - 2000
      : product.discountedPrice;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col w-[170px] shrink-0 bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-[280px] bg-zinc-100 flex items-center justify-center overflow-hidden p-2 rounded-t-md">
        <img
          src={product.image || '/image.png'}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
        />
        <div className="text-[10px] absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded font-bold text-gray-800 flex items-center gap-[2px] shadow-sm  border border-black/5">
          {product.rating}
          <Star className="size-2.5 text-green-700" fill="currentColor" />
        </div>
      </div>

      <div className="py-2 flex flex-col gap-1 text-left bg-white ">
        <p className="text-md font-semibold text-gray-800 line-clamp-1 leading-tight">
          {product.name}
        </p>

        <div className="flex items-center gap-1.5">
          <span className="text-md text-gray-500 line-through">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-md font-bold text-gray-900">
            ₹{product.discountedPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <p className="tracking-tight  text-blue-700 font-semibold">
          Buy at ₹{buyAtPrice.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
}
