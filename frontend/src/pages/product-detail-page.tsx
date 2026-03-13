import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchProductById, fetchProducts } from '../api/products';
import { Breadcrumb } from '../components/breadcrumb';
import type { BreadcrumbItem } from '../components/breadcrumb';
import { ImageGrid } from '../features/product-detail/image-grid';
import { ProductInfo } from '../features/product-detail/product-info';
import { ProductRow } from '../features/product-list/product-row';
import type { ProductDetail } from '../types/products';
import type { Product } from '../features/product-list/product-card';

function buildBreadcrumbs(product: ProductDetail): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  if (product.category?.parent) {
    crumbs.push({
      label: product.category.parent.name,
      href: `/products?categorySlug=${product.category.parent.slug}`,
    });
  }

  if (product.category) {
    crumbs.push({
      label: product.category.name,
      href: `/products?categorySlug=${product.category.slug}`,
    });
  }

  crumbs.push({ label: product.name, href: '#' });
  return crumbs;
}

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProductById(productId)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);

        if (data.category?.id) {
          fetchProducts({ categoryId: data.category.id, pageSize: 12 })
            .then((res) => {
              if (cancelled) return;
              const mapped: Product[] = res.items
                .filter((p) => p.id !== data.id)
                .slice(0, 10)
                .map((p) => ({
                  id: p.id,
                  name: p.name,
                  image: p.image,
                  rating: 4.3,
                  originalPrice: p.originalPrice,
                  discountedPrice: p.discountedPrice,
                }));
              setSimilarProducts(mapped);
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-gray-500">
        <p>{error ?? 'Product not found'}</p>
        <Link to="/" className="text-blue-600 text-sm hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumb items={buildBreadcrumbs(product)} />

      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-1/2 md:sticky md:top-[145px] md:self-start p-4 md:p-6">
          <ImageGrid images={product.images} name={product.name} />
        </div>

        <div
          ref={rightColRef}
          className="w-full md:w-1/2 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-100"
        >
          <ProductInfo product={product} />
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="border-t border-gray-100 mt-4 px-2">
          <ProductRow
            title="Similar Products"
            categorySlug={product.category?.slug}
            products={similarProducts}
          />
        </div>
      )}
    </div>
  );
}
