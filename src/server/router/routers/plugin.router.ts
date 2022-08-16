import { createRouter } from "@context";
import type { SessionUser } from "next-auth";
import { z } from "zod";
import { createProtectedRouter } from "../protected-router";
import { UserDto } from "./user.router";

const Author: z.ZodType<SessionUser> = z.lazy(() =>
  z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string().email(),
    image: z.string(),
  })
);

export const PluginCreateDto = z.object({
  title: z.string(),
  author: Author,
  developers: UserDto.array().nullish(),
  id: z.string().cuid().optional()
});

const protectedPluginRouter = createProtectedRouter().mutation("create", {
  input: PluginCreateDto,
  resolve: async ({
    input: {
      id,
      title,
      author,
      developers,
    },
    ctx: { prisma: db },
  }) => {
    var validDevelopers: { email?: string; id: string }[] = [];
    if (developers && developers.length > 0) {
      validDevelopers = await db.user.findMany({
        where: {
          email: { in: developers.map((d) => d.email), not: author.email },
        },
        select: {
          id: true,
        },
      });
    }

    return db.plugin.create({
      data: {
        id,
        title,
        developers: {
          connect: [{ id: author.id }, ...validDevelopers],
        },
      },
      select: {
        id: true,
      },
    });
  },
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
