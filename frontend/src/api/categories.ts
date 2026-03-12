import type { Category, CategorySectionsResponse } from '../types/categories';

export async function fetchCategorySections(
  cursor: number,
  limitCategories?: number,
  productsPerCategory?: number,
): Promise<CategorySectionsResponse> {
  const params = new URLSearchParams({
    cursor: String(cursor),
    ...(limitCategories && { limitCategories: String(limitCategories) }),
    ...(productsPerCategory && {
      productsPerCategory: String(productsPerCategory),
    }),
  });

  const res = await fetch(`/api/categories/sections?${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch category sections: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export async function fetchAllCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const json = await res.json();
  return json.data.categories;
}
