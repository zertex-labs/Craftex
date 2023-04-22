import "https://deno.land/std@0.183.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import { logger } from "./logger.ts";
import appRouter from "./routes/app.ts";

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

for (const r of appRouter) {
  console.log(r);
}

const PORT = Deno.env.get("PORT");
app.listen({ port: Number(PORT) || 8080 });

logger.info(`Server running on port ${PORT}`);
