import { Router } from "https://deno.land/x/oak@v12.2.0/router.ts";
import pluginRouter from "./plugin.ts";
import authRouter from "./auth.ts";

const appRouter = new Router({ prefix: "/api" });

appRouter.use("/plugin", pluginRouter.routes(), pluginRouter.allowedMethods());
appRouter.use("/auth", authRouter.routes(), authRouter.allowedMethods());

export default appRouter;
