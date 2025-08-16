import { initTRPC } from '@trpc/server';
import type { AuthContext } from './middlewares/authMiddleware.js';

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<AuthContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;