import { Router } from "oak/mod.ts";

const pluginRouter = new Router({});

pluginRouter.get("/", (ctx) => {
  ctx.response.body = "Hello from plugin";
});

// with param
pluginRouter.get("/:id/:id2", (ctx) => {
  ctx.response.body = `Hello from plugin with id ${ctx.params.id}`;
});

export default pluginRouter;
