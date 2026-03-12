import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { fetchAllCategories } from '../api/categories';
import type { Category } from '../types/categories';

export function CategoryTabs() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeSlug = searchParams.get('categorySlug');

  useEffect(() => {
    fetchAllCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  const tabClass = (isActive: boolean) =>
    `shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
      isActive
        ? 'text-blue-600 border-blue-600'
        : 'text-gray-700 border-transparent'
    }`;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[133.7px] z-10">
      <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2">
        <button
          className={tabClass(activeSlug === null)}
          onClick={() => navigate('/products')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={tabClass(activeSlug === category.slug)}
            onClick={() => navigate(`/products?categorySlug=${category.slug}`)}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
