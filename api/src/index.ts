import { Application, Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import "https://deno.land/std@0.183.0/dotenv/load.ts";

const router = new Router();
const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  ctx.response.headers.set("X-Response-Time", `${Date.now() - start}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

// Import test routes
import setupTestRoute from "./routes/test.ts";
setupTestRoute(router);

// Start database
import "./db/mongo.ts";

const PORT = Deno.env.get("PORT");
app.listen({ port: Number(PORT) || 8080 });

console.log(`Server running on port ${PORT}`);
