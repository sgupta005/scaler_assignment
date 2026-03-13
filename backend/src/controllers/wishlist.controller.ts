import type { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';

type AuthRequest = Request & { userId?: string };

async function fetchWishlistItems(userId: string) {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: {
            where: { isPrimary: true },
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
        },
      },
    },
    orderBy: { addedAt: 'desc' },
  });
}

type WishlistItems = Awaited<ReturnType<typeof fetchWishlistItems>>;

function formatWishlist(items: WishlistItems) {
  return items.map((item) => ({
    id: item.id,
    addedAt: item.addedAt,
    product: {
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      mrp: item.product.mrp ? Number(item.product.mrp) : null,
      image: item.product.images[0]?.imageUrl ?? '',
      stock: item.product.stock,
      brand: item.product.brand,
    },
  }));
}

export const getWishlist = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const items = await fetchWishlistItems(userId);
    res.status(200).json(new ApiResponse(200, { items: formatWishlist(items) }));
  },
);

export const addToWishlist = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const { productId } = req.body;
    if (!productId || typeof productId !== 'string') {
      throw new CustomError('productId is required', 400);
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new CustomError('Product not found', 404);

    await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: {},
      create: { userId, productId },
    });

    const items = await fetchWishlistItems(userId);
    res.status(200).json(new ApiResponse(200, { items: formatWishlist(items) }, 'Added to wishlist'));
  },
);

export const removeFromWishlist = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const productId = String(req.params['productId']);

    const item = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!item) throw new CustomError('Wishlist item not found', 404);

    await prisma.wishlistItem.delete({
      where: { userId_productId: { userId, productId } },
    });

    const items = await fetchWishlistItems(userId);
    res.status(200).json(new ApiResponse(200, { items: formatWishlist(items) }, 'Removed from wishlist'));
  },
);
