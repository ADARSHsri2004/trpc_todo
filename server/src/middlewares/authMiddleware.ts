import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { middleware } from '../trpc.js';

// Simple context type
export interface AuthContext {
  user?: {
    userId: string;
    email: string;
  };
}

// Simple context function
export const createContext = async (opts: any): Promise<AuthContext> => {
  const { req } = opts;
  
  // Get token from header
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) return {};
  
  try {
    // Verify token
    const decoded = jwt.verify(token, 'SECRET') as { userId: string; email: string };
    return { user: decoded };
  } catch {
    return {};
  }
};

// Simple auth middleware
export const authMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Please login first',
    });
  }
  return next({ ctx });
});
