// src/server/router/index.ts
import { createRouter } from "@context";
import superjson from "superjson";
import { pluginRouter } from "@routers/plugin.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("plugin.", pluginRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
