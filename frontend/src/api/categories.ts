import { apiFetch } from './client';
import type { Category, CategorySectionsResponse } from '../types/categories';

export async function fetchCategorySections(
  cursor: number,
  limitCategories?: number,
  productsPerCategory?: number,
  parentSlug?: string,
): Promise<CategorySectionsResponse> {
  const params = new URLSearchParams({
    cursor: String(cursor),
    ...(limitCategories && { limitCategories: String(limitCategories) }),
    ...(productsPerCategory && {
      productsPerCategory: String(productsPerCategory),
    }),
    ...(parentSlug && { parentSlug }),
  });

  const json = await apiFetch<{ data: CategorySectionsResponse }>(
    `/api/categories/sections?${params}`,
  );
  return json.data;
}

export async function fetchAllCategories(): Promise<Category[]> {
  const json = await apiFetch<{ data: { categories: Category[] } }>(
    '/api/categories',
  );
  return json.data.categories;
}
