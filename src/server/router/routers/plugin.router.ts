import { z } from "zod";
import { createRouter } from "../context";

export const PluginDto = z.object({
  title: z.string(),
});

const protectedPluginRouter = createRouter().mutation("create", {
  input: PluginDto,
  resolve: ({ input, ctx: { prisma: db } }) =>
    db.plugin.create({
      data: input,
      select: {
        id: true,
      },
    }),
});

const unprotectedPluginRouter = createRouter().query("all", {
  resolve: ({ ctx: { prisma: db } }) =>
    db.plugin.findMany({
      select: {
        id: true,
        title: true,
        developers: true,
      },
    }),
});

export const pluginRouter = createRouter()
  .merge(protectedPluginRouter)
  .merge("unprotected.", unprotectedPluginRouter);
