import "https://deno.land/std@0.183.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import { logger } from "./logger.ts";
import { setupRoutes } from "./routes/setup.ts";
import {} from "npm:arktype@^1.0.14-alpha/src/main.ts"

const router = new Router({
  prefix: "/api",
});
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

app.use(router.routes());
app.use(router.allowedMethods());

await setupRoutes(router);

const PORT = Deno.env.get("PORT");
app.listen({ port: Number(PORT) || 8080 });

logger.info(`Server running on port ${PORT}`);
