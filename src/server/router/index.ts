// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import {appRouter as generatedRouter} from '../../../prisma/generated/routers/index'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(generatedRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
