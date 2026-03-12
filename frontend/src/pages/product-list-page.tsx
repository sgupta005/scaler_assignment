import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ProductRow } from '../features/product-list/product-row';
import { CategoryTabs } from '../components/category-tabs';
import { fetchCategorySections } from '../api/categories';
import type { CategorySection } from '../types/categories';

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('categorySlug') ?? undefined;

  const [sections, setSections] = useState<CategorySection[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset and load when category changes (including initial mount)
  useEffect(() => {
    let cancelled = false;

    setSections([]);
    setNextCursor(null);
    setLoading(true);
    setError(null);

    fetchCategorySections(0, undefined, undefined, categorySlug)
      .then((data) => {
        if (cancelled) return;
        setSections(data.sections);
        setNextCursor(categorySlug ? null : data.nextCursor);
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
  }, [categorySlug]);

  // Append next page of sections — only used by the infinite scroll in the "All" view
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
    const sentinel = sentinelRef.current;
    if (!sentinel || nextCursor === null || categorySlug) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, nextCursor, categorySlug]);

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

      {categorySlug && !loading && !error && sections.length === 0 && (
        <div className="flex justify-center py-16 text-gray-500 text-sm">
          No products found in this category.
        </div>
      )}

      {!categorySlug && nextCursor !== null && !loading && (
        <div ref={sentinelRef} className="h-1" />
      )}
    </>
  );
}
