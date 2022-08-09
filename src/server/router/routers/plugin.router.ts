import { PluginModel, RelatedPluginModel } from "../../../../prisma/models";
import { createRouter } from "../context";
import { createProtectedRouter } from "../protected-router";

export const protectedPluginRouter = createProtectedRouter().mutation(
  "create",
  {
    input: PluginModel,
    resolve: ({ input, ctx: { prisma: db } }) =>
      db.plugin.create({
        data: input,
        select: {
          id: true,
        },
      }),
  }
);

export const unprotectedPluginRouter = createRouter().query("all", {
  resolve: ({ ctx: { prisma: db } }) => db.plugin.findMany(),
});
