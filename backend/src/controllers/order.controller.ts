import type { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';

type AuthRequest = Request & { userId?: string };

function getSessionId(req: Request): string | null {
  const raw = req.headers['x-session-id'];
  const sessionId = Array.isArray(raw) ? raw[0] : raw;
  return sessionId ?? null;
}

export const placeOrder = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const { addressId } = req.body;
    if (!addressId || typeof addressId !== 'string') {
      throw new CustomError('addressId is required', 400);
    }

    // Verify address belongs to user
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });
    if (!address) throw new CustomError('Address not found', 404);

    // Find cart — prefer userId-linked cart, fallback to sessionId
    const sessionId = getSessionId(req);
    const cart = await prisma.cart.findFirst({
      where: sessionId ? { OR: [{ userId }, { sessionId }] } : { userId },
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
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    if (!cart || cart.items.length === 0) {
      throw new CustomError('Your cart is empty', 400);
    }

    // Compute totals
    let subtotal = 0;
    let mrpTotal = 0;
    for (const item of cart.items) {
      const price = Number(item.product.price);
      const mrp = item.product.mrp ? Number(item.product.mrp) : price;
      subtotal += price * item.quantity;
      mrpTotal += mrp * item.quantity;
    }
    const discount = mrpTotal - subtotal;
    const totalAmount = subtotal;

    // Create order in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          addressId,
          subtotal,
          discount,
          totalAmount,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              productName: item.product.name,
              productImage: item.product.images[0]?.imageUrl ?? null,
              unitPrice: Number(item.product.price),
              quantity: item.quantity,
              subtotal: Number(item.product.price) * item.quantity,
            })),
          },
        },
        include: {
          items: true,
          address: true,
        },
      });

      // Clear the cart items after order is placed
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    res.status(201).json(new ApiResponse(201, { order }, 'Order placed successfully'));
  },
);

export const getOrder = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const orderId = String(req.params['orderId']);

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: true,
        address: true,
      },
    });

    if (!order) throw new CustomError('Order not found', 404);

    res.status(200).json(new ApiResponse(200, { order }));
  },
);
