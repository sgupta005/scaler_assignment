import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';

type AuthRequest = Request & { userId?: string };

const addAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
  alternatePhone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit alternate phone')
    .optional()
    .or(z.literal('')),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit pincode'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().min(1, 'Address line 2 is required'),
  landmark: z.string().optional().or(z.literal('')),
  isDefault: z.boolean().optional(),
  type: z.enum(['HOME', 'WORK']).optional(),
});

export const getAddresses = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    res.status(200).json(new ApiResponse(200, { addresses }));
  },
);

export const addAddress = asyncHandler(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const userId = req.userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const parsed = addAddressSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new CustomError(parsed.error.issues[0]?.message ?? 'Validation failed', 400);
    }

    const { alternatePhone, landmark, isDefault, type, ...rest } = parsed.data;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId,
        ...rest,
        alternatePhone: alternatePhone || null,
        landmark: landmark || null,
        isDefault: isDefault ?? false,
        type: type ?? 'HOME',
      },
    });

    res.status(201).json(new ApiResponse(201, { address }, 'Address added successfully'));
  },
);
