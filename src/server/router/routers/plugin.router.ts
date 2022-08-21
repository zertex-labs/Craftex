import { createRouter } from "@context";
import { Prisma } from "@prisma/client";
import type { SessionUser } from "next-auth";
import { string, object, ZodType, lazy, number } from "zod";
import { createProtectedRouter } from "../protected-router";
import { UserDto } from "./user.router";

const Author: ZodType<SessionUser> = lazy(() =>
  object({
    id: string().cuid(),
    name: string(),
    email: string().email(),
    image: string(),
  })
);

export const PluginCreateDto = object({
  title: string(),
  author: Author,
  developers: UserDto.array().nullish(),
  id: string().cuid().optional(),
});

function makePluginSelect<T extends Prisma.PluginSelect>(
  select: Prisma.Subset<T, Prisma.PluginSelect>
): T {
  return select;
}

const defaultPluginSelect = makePluginSelect({
  id: true,
  title: true,
  developers: true,
  stars: true,
});

const protectedPluginRouter = createProtectedRouter().mutation("create", {
  input: PluginCreateDto,
  resolve: async ({
    input: { id, title, author, developers },
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

const unprotectedPluginRouter = createRouter()
  .query("all", {
    resolve: ({ ctx: { prisma: db } }) =>
      db.plugin.findMany({
        select: defaultPluginSelect,
      }),
  })
  .query("filtered", {
    input: object({
      filter: string().min(2),
      limit: number().default(10),
    }),
    resolve: ({ input: { filter, limit }, ctx: { prisma: db } }) =>
      db.plugin.findMany({
        where: {
          title: { startsWith: filter },
        },
        orderBy: {
          stars: "desc",
        },
        select: defaultPluginSelect,
        take: limit,
      }),
  })
  .query("byId", {
    input: object({
      id: string().cuid(),
    }),
    resolve: ({ input: { id }, ctx: { prisma: db } }) =>
      db.plugin.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
        select: defaultPluginSelect,
      }),
  })
  .query("byUser", {
    input: object({
      userId: string().cuid().length(25),
    }),
    resolve: ({ input: { userId }, ctx: { prisma: db } }) =>
      db.plugin.findMany({
        where: {
          developers: {
            some: {
              id: { equals: userId },
            },
          },
        },
        orderBy: { stars: "desc" },
        select: defaultPluginSelect,
      }),
  });

export const pluginRouter = createRouter()
  .merge(protectedPluginRouter)
  .merge("unprotected.", unprotectedPluginRouter);
