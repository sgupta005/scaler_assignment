import { Link } from 'react-router';
import { ProductCard } from './product-card';
import type { Product } from './product-card';
import { MoveRight } from 'lucide-react';

interface ProductRowProps {
  title: string;
  categorySlug?: string;
  products: Product[];
}

export function ProductRow({ title, categorySlug, products }: ProductRowProps) {
  return (
    <section className="bg-white px-2">
      <div className="flex items-center justify-between pr-4 pt-4 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link
          to={categorySlug ? `/products?categorySlug=${categorySlug}` : '#'}
          className="rounded-xl bg-gray-900  flex items-center justify-center text-white px-2 py-[0.5]"
          aria-label="View all"
        >
          <MoveRight />
        </Link>
      </div>

      <div className="relative group/row">
        <div className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-4 scrollbar-hide snap-x">
          {products.map((product, index) => (
            <div key={`${product.id}-${index}`} className="snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
