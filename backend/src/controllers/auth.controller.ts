import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import CustomError from '../utils/custom-error.js';
import { prisma } from '../../prisma/db.js';
import { signupSchema, loginSchema } from '../schemas/auth.schema.js';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function sanitizeUser(user: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}) {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone };
}

export const signup = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new CustomError(
        parsed.error.issues[0]?.message ?? 'Validation failed',
        400,
      );
    }

    const { name, email, phone, password } = parsed.data;

    const conflictConditions: { email: string } | { phone: string } | { OR: object[] } = phone
      ? { OR: [{ email }, { phone }] }
      : { email };

    const existing = await prisma.user.findFirst({ where: conflictConditions });
    if (existing) {
      const field = existing.email === email ? 'email' : 'phone number';
      throw new CustomError(`An account with this ${field} already exists`, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, phone: phone ?? null, password: hashedPassword },
    });

    const token = generateToken(user.id);

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { token, user: sanitizeUser(user) },
          'Account created successfully',
        ),
      );
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new CustomError(
        parsed.error.issues[0]?.message ?? 'Validation failed',
        400,
      );
    }

    const { identifier, password } = parsed.data;

    const isEmail = identifier.includes('@');
    const user = await prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { phone: identifier },
    });

    if (!user) throw new CustomError('Invalid email/phone or password', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError('Invalid email/phone or password', 401);

    const token = generateToken(user.id);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { token, user: sanitizeUser(user) },
          'Login successful',
        ),
      );
  },
);

export const getMe = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req as Request & { userId?: string }).userId;
    if (!userId) throw new CustomError('Unauthorized', 401);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError('User not found', 404);

    res.status(200).json(new ApiResponse(200, { user: sanitizeUser(user) }));
  },
);
