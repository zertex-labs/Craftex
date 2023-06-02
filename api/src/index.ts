import "https://deno.land/std@0.183.0/dotenv/load.ts";
import { Application } from "oak/mod.ts";
import { logger } from "$logger";
import appRouter from "./routes/app.ts";
import "./db/index.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  logger.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  ctx.response.headers.set("X-Response-Time", `${Date.now() - start}ms`);
});

// Router
app.use(appRouter.routes());
app.use(appRouter.allowedMethods());

logger.info("Routes:");
for (const { path, methods, paramNames } of appRouter) {
  logger.info(path, methods);
  if (paramNames.length > 0) {
    logger.info("  > Params: " + paramNames.join(", "));
  }
}

const PORT = Deno.env.get("PORT");
app.listen({ port: Number(PORT) || 8080 });

logger.info(`Server running on port ${PORT}`);
