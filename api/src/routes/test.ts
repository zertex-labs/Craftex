import { RouteHandler, RouteMeta } from "./setup.ts";

const handler: RouteHandler = (router) => {
  router.get("/test", (ctx) => {
    ctx.response.body = "Hello World!";
  });
};

const meta: RouteMeta[] = [
  {
    endpoint: "/test",
    method: "GET",
  },
];

export default { handler, meta };
