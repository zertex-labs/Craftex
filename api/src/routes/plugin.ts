import { RouteHandler, RouteMeta } from "./setup.ts";

const handler: RouteHandler = (router) => {
  router.post("/plugin/create", (ctx) => {
    ctx.response.body = "Hello World!";
    ctx.assert(ctx.request.hasBody, 400, "No body provided");
  });
};

const meta: RouteMeta[] = [
  {
    endpoint: "/plugin/create",
    method: "POST",
  },
];

export default {
  handler,
  meta,
};
