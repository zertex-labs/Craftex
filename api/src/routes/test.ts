import { Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";

export default (router: Router) => {
  router.get("/test", (ctx) => {
    ctx.response.body = "Hello World!";
  });
};
