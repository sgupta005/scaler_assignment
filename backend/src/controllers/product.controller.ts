import type { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';
import {
  productListQuerySchema,
  productSearchQuerySchema,
} from '../schemas/product.schema.js';
import { Prisma } from '../../prisma/generated/prisma/client.js';

export const getProducts = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    // validate query params
    const parsed = productListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new CustomError(parsed.error.message, 400);
    }

    // extract query params
    const {
      categoryId,
      categorySlug,
      search,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      pageSize = 20,
    } = parsed.data;

    let resolvedCategoryId = categoryId;

    if (!resolvedCategoryId && categorySlug) {
      const category = await prisma.category.findUnique({
        where: {
          slug: categorySlug,
        },
        select: {
          id: true,
        },
      });

      if (!category) {
        throw new CustomError('Category not found', 404);
      }

      resolvedCategoryId = category.id;
    }

    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    if (resolvedCategoryId) {
      where.categoryId = resolvedCategoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (typeof minPrice === 'number' || typeof maxPrice === 'number') {
      where.price = {};
      if (typeof minPrice === 'number') {
        where.price.gte = minPrice;
      }
      if (typeof maxPrice === 'number') {
        where.price.lte = maxPrice;
      }
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price_desc') {
      orderBy = { price: 'desc' };
    }

    const skip = (page - 1) * pageSize;

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
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
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
    ]);

    const items = products.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.images[0]?.imageUrl ?? '',
      originalPrice: Number(p.mrp ?? p.price),
      discountedPrice: Number(p.price),
      stock: p.stock,
      brand: p.brand,
      category: p.category,
    }));

    const response = new ApiResponse(200, {
      items,
      total,
      page,
      pageSize,
    });

    res.status(200).json(response);
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const id = String(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            parent: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    const response = new ApiResponse(200, {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      mrp: product.mrp ? Number(product.mrp) : null,
      stock: product.stock,
      brand: product.brand,
      specifications: product.specifications,
      category: product.category,
      images: product.images.map((img) => ({
        id: img.id,
        url: img.imageUrl,
        isPrimary: img.isPrimary,
      })),
    });

    res.status(200).json(response);
  },
);

export const searchProducts = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = productSearchQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      throw new CustomError(parsed.error.message, 400);
    }

    const { q, limit = 10 } = parsed.data;

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
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

    const items = products.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.images[0]?.imageUrl ?? '',
      price: Number(p.price),
    }));

    const response = new ApiResponse(200, { items });
    res.status(200).json(response);
  },
);
