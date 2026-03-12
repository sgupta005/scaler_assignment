import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductRow } from '../features/product-list/product-row';
import { CategoryTabs } from '../components/category-tabs';
import { fetchCategorySections } from '../api/categories';
import type { CategorySection } from '../types/categories';

export function ProductListPage() {
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || nextCursor === null) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCategorySections(nextCursor);
      setSections((prev) => [...prev, ...data.sections]);
      setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [loading, nextCursor]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || nextCursor === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, nextCursor]);

  return (
    <>
      <CategoryTabs />

      {sections.map((section) => (
        <ProductRow
          key={section.category.id}
          title={section.category.name}
          categorySlug={section.category.slug}
          products={section.products}
        />
      ))}

      {loading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-2 py-8 text-red-600">
          <p>{error}</p>
          <button
            onClick={loadMore}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {nextCursor !== null && !loading && (
        <div ref={sentinelRef} className="h-1" />
      )}
    </>
  );
}
