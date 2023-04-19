import "https://deno.land/std@0.183.0/dotenv/load.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import { serve } from 'https://deno.land/std@0.140.0/http/server.ts'
import { PrismaClient } from '../generated/client/deno/edge.ts'
import {logger} from "./logger.ts";
const router = new Router();
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

// Import test routes
import { setupRoutes } from "./routes/setup.ts";
await setupRoutes(router);

// Start database
// import "./db/mongo.ts";

const PORT = Deno.env.get("PORT");
app.listen({ port: Number(PORT) || 8080 });

logger.info(`Server running on port ${PORT}`);

const prisma = new PrismaClient()

async function handler(request: Request) {
  const log = await prisma.log.create({
    data: {
      level: 'Info',
      message: `${request.method} ${request.url}`,
      meta: {
        headers: JSON.stringify(request.headers),
      },
    },
  })
  const body = JSON.stringify(log, null, 2)
  return new Response(body, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

serve(handler)