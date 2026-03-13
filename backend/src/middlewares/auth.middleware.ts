import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/custom-error.js';

interface JwtPayload {
  userId: string;
}

export function protect(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new CustomError('Unauthorized', 401));
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as Request & { userId?: string }).userId = decoded.userId;
    next();
  } catch {
    next(new CustomError('Invalid or expired token', 401));
  }
}
