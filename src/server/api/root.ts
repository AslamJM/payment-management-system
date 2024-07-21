import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { regionRouter } from "./routers/region";
import { shopRouter } from "./routers/shop";
import { companyRouter } from "./routers/company";
import { collectorRouter } from "./routers/collector";
import { paymentRouter } from "./routers/payment";
import { historyRouter } from "./routers/history";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  users: userRouter,
  regions: regionRouter,
  shops: shopRouter,
  company: companyRouter,
  collector: collectorRouter,
  payment: paymentRouter,
  history: historyRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
