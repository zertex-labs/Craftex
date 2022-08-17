import { createRouter, createContext } from "@context";
import { listRouter } from "@routers/list.router";
import { pluginRouter } from "@routers/plugin.router";
import { createSSGHelpers } from "@trpc/react/ssg";
import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("plugin.", pluginRouter)
  .merge("list.", listRouter);

export const createSSG = async () =>
  createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

// export type definition of API
export type AppRouter = typeof appRouter;
