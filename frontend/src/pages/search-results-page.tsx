import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { fetchProducts } from '../api/products';
import type { ProductListItem } from '../types/products';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setProducts([]);

    fetchProducts({ search: query, pageSize: 40 })
      .then((data) => {
        if (cancelled) return;
        setProducts(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="px-4 py-6">
      {query && (
        <h1 className="text-lg font-semibold text-gray-700 mb-4">
          {loading
            ? `Searching for "${query}"…`
            : `${total.toLocaleString('en-IN')} results for "${query}"`}
        </h1>
      )}

      {loading && (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        </div>
      )}

      {error && (
        <div className="flex justify-center py-16 text-red-500">{error}</div>
      )}

      {!loading && !error && products.length === 0 && query && (
        <div className="flex flex-col items-center py-16 gap-2 text-gray-500">
          <p className="text-base">No results found for &quot;{query}&quot;</p>
          <p className="text-sm">
            Try checking your spelling or using more general terms.
          </p>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group flex flex-col bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="w-full aspect-square bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={product.image || '/image.png'}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200 mix-blend-multiply"
                />
              </div>
              <div className="p-3 flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                  {product.name}
                </p>
                {product.brand && (
                  <p className="text-xs text-gray-500">{product.brand}</p>
                )}
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{product.discountedPrice.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.discountedPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {product.originalPrice > product.discountedPrice && (
                  <p className="text-xs text-green-600 font-medium">
                    {Math.round(
                      ((product.originalPrice - product.discountedPrice) /
                        product.originalPrice) *
                        100,
                    )}
                    % off
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
