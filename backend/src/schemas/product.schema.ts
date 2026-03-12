import { z } from 'zod';

export const productListQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  categorySlug: z.string().optional(),
  search: z.string().optional(),
  minPrice: z
    .string()
    .transform((v) => Number.parseFloat(v))
    .refine((v) => !Number.isNaN(v) && v >= 0, {
      message: 'minPrice must be >= 0',
    })
    .optional(),
  maxPrice: z
    .string()
    .transform((v) => Number.parseFloat(v))
    .refine((v) => !Number.isNaN(v) && v >= 0, {
      message: 'maxPrice must be >= 0',
    })
    .optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'newest']).optional(),
  page: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !Number.isNaN(v) && v > 0, { message: 'page must be > 0' })
    .optional(),
  pageSize: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !Number.isNaN(v) && v > 0 && v <= 40, {
      message: 'pageSize must be between 1 and 40',
    })
    .optional(),
});

export const productSearchQuerySchema = z.object({
  q: z.string().min(1),
  limit: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !Number.isNaN(v) && v > 0 && v <= 20, {
      message: 'limit must be between 1 and 20',
    })
    .optional(),
});
