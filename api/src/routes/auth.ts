import { Router } from "oak/router.ts";
import { logger } from "$logger";
import { AUTH_CLIENTS, SUPPORTED_CLIENTS } from "../auth/strategies/index.ts";

function getClientCode(key: keyof typeof AUTH_CLIENTS){
  return AUTH_CLIENTS[key].code;
}

const router = new Router();

router.get("/callback/:type", async (ctx) => {
  const type = ctx.params.type.toLowerCase();
  logger.info("Callback route hit for", type);
  if (!SUPPORTED_CLIENTS.includes(type)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid strategy type" };
    return;
  }

  const authResponse = await getClientCode(type as any).processAuth(
    ctx.request.url
  );

  logger.info(authResponse, "auth response");
});

router.get("/login/:type", (ctx) => {
  const type = ctx.params.type.toLowerCase();
  logger.info("Login route hit for", type);
  if (!SUPPORTED_CLIENTS.includes(type)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid strategy type" };
    return;
  }

  ctx.response.body = {
    message: "success",
    data: getClientCode(type as any).createLink(),
  };
});

export default router;
