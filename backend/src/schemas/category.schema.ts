import { z } from 'zod';

export const categorySectionsQuerySchema = z.object({
  cursor: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !Number.isNaN(v) && v >= 0, {
      message: 'cursor must be a non-negative number',
    })
    .optional(),
  limitCategories: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !Number.isNaN(v) && v > 0 && v <= 10, {
      message: 'limitCategories must be between 1 and 10',
    })
    .optional(),
  productsPerCategory: z
    .string()
    .transform((v) => Number.parseInt(v, 10))
    .refine((v) => !Number.isNaN(v) && v > 0 && v <= 40, {
      message: 'productsPerCategory must be between 1 and 40',
    })
    .optional(),
});
