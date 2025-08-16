import { router } from './trpc.js';
import { UserRouter } from './routers/UserRouter.js';
import { TodoRouter } from './routers/TodoRouter.js';

export const appRouter = router({
  user: UserRouter,
  todo:TodoRouter
});

export type AppRouter = typeof appRouter;
