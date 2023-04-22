import { Router } from "https://deno.land/x/oak@v12.2.0/router.ts";
import pluginRouter from "./plugin.ts";

const appRouter = new Router();

appRouter.use("/plugin", pluginRouter.routes(), pluginRouter.allowedMethods());

export default appRouter;