import type { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';

function getSessionId(req: Request): string {
  const raw = req.headers['x-session-id'];
  const sessionId = Array.isArray(raw) ? raw[0] : raw;
  if (!sessionId) throw new CustomError('Session ID is required', 400);
  return sessionId;
}

async function fetchCartWithItems(sessionId: string) {
  return prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
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
        orderBy: { addedAt: 'asc' },
      },
    },
  });
}

type CartWithItems = NonNullable<Awaited<ReturnType<typeof fetchCartWithItems>>>;

function formatCart(cart: CartWithItems) {
  return {
    id: cart.id,
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: Number(item.product.price),
        mrp: item.product.mrp ? Number(item.product.mrp) : null,
        image: item.product.images[0]?.imageUrl ?? '',
        stock: item.product.stock,
        brand: item.product.brand,
      },
    })),
  };
}

export const getCart = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const sessionId = getSessionId(req);

    let cart = await fetchCartWithItems(sessionId);

    if (!cart) {
      await prisma.cart.create({ data: { sessionId } });
      cart = (await fetchCartWithItems(sessionId))!;
    }

    res.status(200).json(new ApiResponse(200, formatCart(cart)));
  },
);

export const addToCart = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const sessionId = getSessionId(req);
    const { productId, quantity = 1 } = req.body;

    if (!productId || typeof productId !== 'string') {
      throw new CustomError('productId is required', 400);
    }
    if (typeof quantity !== 'number' || quantity < 1) {
      throw new CustomError('quantity must be a positive number', 400);
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new CustomError('Product not found', 404);
    if (product.stock < quantity) throw new CustomError('Insufficient stock', 400);

    let cart = await prisma.cart.findUnique({ where: { sessionId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { sessionId } });
    }

    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId: cart.id, productId, quantity },
    });

    const updated = (await fetchCartWithItems(sessionId))!;
    res.status(200).json(new ApiResponse(200, formatCart(updated)));
  },
);

export const updateCartItem = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const sessionId = getSessionId(req);
    const itemId = String(req.params['itemId']);
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      throw new CustomError('quantity must be a positive integer', 400);
    }

    // Verify item belongs to this session
    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cart: { sessionId } },
    });
    if (!item) throw new CustomError('Cart item not found', 404);

    // Verify stock
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || product.stock < quantity) {
      throw new CustomError('Insufficient stock', 400);
    }

    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });

    const updated = (await fetchCartWithItems(sessionId))!;
    res.status(200).json(new ApiResponse(200, formatCart(updated)));
  },
);

export const removeCartItem = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const sessionId = getSessionId(req);
    const itemId = String(req.params['itemId']);

    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cart: { sessionId } },
    });
    if (!item) throw new CustomError('Cart item not found', 404);

    await prisma.cartItem.delete({ where: { id: itemId } });

    const updated = (await fetchCartWithItems(sessionId))!;
    res.status(200).json(new ApiResponse(200, formatCart(updated)));
  },
);
