import { useEffect, useState } from 'react';
import { fetchAllCategories } from '../api/categories';
import type { Category } from '../types/categories';

export function CategoryTabs() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchAllCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[133.7px] z-10">
      <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className="shrink-0 px-4 py-3 text-[13px] font-medium text-gray-700 hover:text-[#2874f0] border-b-2 border-transparent hover:border-[#2874f0] transition-colors cursor-pointer whitespace-nowrap"
          >
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
