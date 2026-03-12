import { Response, NextFunction, Request } from 'express';
import CustomError from '../utils/custom-error.js';

export default function globalErrorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err.statusCode || 500;
  console.log(err.stack);
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '',
  });
}
