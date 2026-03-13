import type { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';
import { categorySectionsQuerySchema } from '../schemas/category.schema.js';
import { DEFAULT_CATEGORY_SECTIONS_QUERY_PARAMS } from '../lib/constants.js';

export const getCategorySections = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // validate query params
    const parsed = categorySectionsQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new CustomError(parsed.error.message, 400);
    }
    // extract query params
    const {
      cursor = DEFAULT_CATEGORY_SECTIONS_QUERY_PARAMS.cursor,
      limitCategories = DEFAULT_CATEGORY_SECTIONS_QUERY_PARAMS.limitCategories,
      productsPerCategory = DEFAULT_CATEGORY_SECTIONS_QUERY_PARAMS.productsPerCategory,
      parentSlug,
    } = parsed.data;

    let parentId: string | undefined;
    let parentCategory: { id: string; name: string; slug: string } | undefined;

    if (parentSlug) {
      const parent = await prisma.category.findUnique({
        where: { slug: parentSlug },
        select: { id: true, name: true, slug: true },
      });
      if (!parent) {
        throw new CustomError('Parent category not found', 404);
      }
      parentId = parent.id;
      parentCategory = parent;
    }

    const baseWhere = {
      ...(parentId ? { parentId } : {}),
      products: {
        some: {
          isActive: true,
        },
      },
    };

    const totalCategories = await prisma.category.count({
      where: baseWhere,
    });

    // Leaf category: parentSlug was given but the category has no children with
    // active products. Return the category itself as a single section.
    if (parentSlug && parentCategory && totalCategories === 0) {
      const products = await prisma.product.findMany({
        where: {
          categoryId: parentCategory.id,
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
        take: productsPerCategory,
        include: {
          images: {
            where: { isPrimary: true },
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
        },
      });

      const mappedProducts = products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images[0]?.imageUrl ?? '',
        originalPrice: Number(p.mrp ?? p.price),
        discountedPrice: Number(p.price),
        rating: 4.3,
      }));

      const response = new ApiResponse(200, {
        sections: [{ category: parentCategory, products: mappedProducts }],
        nextCursor: null,
        totalCategories: 1,
      });
      res.status(200).json(response);
      return;
    }

    if (cursor >= totalCategories && totalCategories !== 0) {
      throw new CustomError('Cursor out of range', 400);
    }

    const categories = await prisma.category.findMany({
      where: baseWhere,
      orderBy: {
        name: 'asc',
      },
      skip: cursor,
      take: limitCategories,
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const sections = [];

    for (const category of categories) {
      const products = await prisma.product.findMany({
        where: {
          categoryId: category.id,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: productsPerCategory,
        include: {
          images: {
            where: {
              isPrimary: true,
            },
            orderBy: {
              sortOrder: 'asc',
            },
            take: 1,
          },
        },
      });

      const mappedProducts = products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images[0]?.imageUrl ?? '',
        originalPrice: Number(p.mrp ?? p.price),
        discountedPrice: Number(p.price),
        rating: 4.3,
      }));

      sections.push({
        category,
        products: mappedProducts,
      });
    }

    const nextCursor =
      cursor + categories.length < totalCategories
        ? cursor + categories.length
        : null;

    const response = new ApiResponse(200, {
      sections,
      nextCursor,
      totalCategories,
    });

    res.status(200).json(response);
  },
);

export const getAllCategories = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const response = new ApiResponse(200, { categories });
    res.status(200).json(response);
  },
);

export const getCategoryTree = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        children: {
          orderBy: {
            name: 'asc',
          },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    const response = new ApiResponse(200, { categories });
    res.status(200).json(response);
  },
);
